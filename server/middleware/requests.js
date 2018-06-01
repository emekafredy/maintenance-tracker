import validator from 'validator';

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
}

export default RequestMiddleware;
