import validator from 'validator';

import client from '../models/database';

class RequestMiddleware {
  /**
   * @description Middleware to validate content updates
   *
   * @param {Object} request - HTTP Request
   * @param {Object} response - HTTP Response
   *
   * @returns {object} response JSON Object
   */
  static checkUpdateContent(request, response, next) {
    const { product, requestType } = request.body;
    let isValid = true;
    const errors = {};
    const products = ['laptop', 'monitor', 'chair', 'desk', 'charger', 'headphone'];
    const requestTypes = ['repair', 'maintenance', 'replace'];

    if (product && !products.includes(validator.trim(String(product.toLowerCase())))) {
      isValid = false;
      errors.product = 'Invalid entry. Select one out of this list of products: laptop, monitor, chair, desk, charger and headphone';
    }
    if (requestType && !requestTypes.includes(validator.trim(String(requestType.toLowerCase())))) {
      isValid = false;
      errors.requestType = 'Request type should be either repair, maintenance or replace';
    }
    if (isValid) {
      return next();
    }
    if (isValid) {
      return next();
    }
    return response.status(400).json({
      success: false,
      errors,
    });
  }

  /**
   * @description Middleware for new requests validation
   *
   * @param {Object} request - HTTP Request
   * @param {Object} response - HTTP Response
   *
   * @returns {object} response JSON Object
   */
  static checkRequest(request, response, next) {
    const { issue, product, requestType } = request.body;
    let isValid = true;
    const errors = {};

    if (!product) {
      isValid = false;
      errors.product = 'The product is required';
    }
    if (!requestType) {
      isValid = false;
      errors.requestType = 'Request type is required';
    }
    if (!issue) {
      isValid = false;
      errors.Issue = 'Please describe the issue with your product';
    }
    if (isValid) {
      return next();
    }
    return response.status(400).json({
      success: false,
      errors,
    });
  }

  static checkUpdate(request, response, next) {
    RequestMiddleware.checkUpdateContent(request, response, next);
  }

  /**
   * @description Middleware Query to check for unprocessed duplicate requests
   *
   * @param {Object} request - HTTP Request
   * @param {Object} response - HTTP Response
   *
   * @returns {object} response JSON Object
   */
  static checkDuplicateQuery(request, response, next) {
    const { userid: userId } = request.user;

    const product = validator.trim(String(request.body.product.toLowerCase()));
    const requestType = validator.trim(String(request.body.requestType.toLowerCase()));
    const issue = validator.trim(String(request.body.issue.toLowerCase()));

    client.query(
      'select * from requests where userId = $1 AND product = $2 AND requestType = $3 AND issue = $4 AND requestStatus = $5',
      [userId, product, requestType, issue, 'pending'],
    )
      .then((data) => {
        if (data.rowCount > 0) {
          return response.status(409).json({
            success: false,
            message: 'You cannot make duplicate requests until the previous has been processed',
          });
        }
        return next();
      }).catch(error => response.status(500).json({ message: error.message }));
  }
}

export default RequestMiddleware;
