import validator from 'validator';

import client from '../models/database';

class UserRequests {
  /**
   * @description Method to check for non-numbers
   *
   * @param {Object} request - HTTP Request
   * @param {Object} response - HTTP Response
   *
   * @returns {object} response JSON Object
   */
  static checkNaN(request, response) {
    const reqId = parseInt(request.params.requestId, 10);
    if (Number.isNaN(reqId)) {
      return response.status(400).json({
        success: false,
        message: 'Your request ID is invalid. Please enter a number',
      });
    }
    return null;
  }

  /**
   * @description Query to select a request
   *
   * @param {Object} request - HTTP Request
   * @param {Object} response - HTTP Response
   *
   * @returns {object} response JSON Object
   */
  static selectARequest(request, response) {
    const reqId = parseInt(request.params.requestId, 10);
    UserRequests.checkNaN(request, response);
    const { userid: userId } = request.user;
    return client.query('select * from requests where userId = $1 and requestId = $2', [userId, reqId])
      .then((data) => {
        if (data.rows.length === 0) {
          return response.status(404).json({
            success: false,
            message: 'You have no request with this ID',
          });
        }
        return response.status(200)
          .json({
            success: true,
            message: 'Retrieved ONE request',
            data: data.rows,
          });
      })
      .catch(error => response.status(500).json({ message: error.message }));
  }

  /**
   * @description Query to check for duplicates and update an existing request
   *
   * @param {Object} request - HTTP Request
   * @param {Object} response - HTTP Response
   *
   * @returns {object} response JSON Object
   */
  static updateRequestQuery(request, response, data) {
    const reqId = parseInt(request.params.requestId, 10);
    const { userid: userId } = request.user;

    const updatedRequest = {
      product: request.body.product ? request.body.product.toLowerCase()
        : data.rows[0].product,
      requestType: request.body.requestType ? request.body.requestType.toLowerCase()
        : data.rows[0].requesttype,
      issue: request.body.issue || data.rows[0].issue,
      imageUrl: request.body.imageUrl ? validator.trim(String(request.body.imageUrl))
        : data.rows[0].imageurl,
    };
    client.query(
      'select * from requests where userId = $1 AND product = $2 AND requestType = $3 AND requestStatus = $4 AND issue = $5 AND imageUrl = $6',
      [userId, updatedRequest.product, updatedRequest.requestType, 'pending', updatedRequest.issue, updatedRequest.imageUrl],
    )
      .then((prod) => {
        if (prod.rowCount > 0) {
          return response.status(409).json({
            success: false,
            message: 'You have a similar request that has not been processed',
          });
        }
        return client.query({
          text: 'UPDATE requests SET product=$1, requestType=$2, issue=$3 WHERE requestId=$4',
          values: [
            updatedRequest.product,
            updatedRequest.requestType,
            updatedRequest.issue,
            reqId],
        }).then(() => response.status(201).json({
          success: true,
          message: 'Request successfully updated',
          updatedRequest,
        })).catch(error => response.status(500).json({ message: error.message }));
      }).catch(error => response.status(500).json({ message: error.message }));
  }

  static deleteQuery(request, response) {
    const reqId = parseInt(request.params.requestId, 10);
    const { userid: userId } = request.user;

    return client.query('DELETE FROM requests where userId = $1 AND requestId = $2', [userId, reqId])
      .then(() => response.status(200)
        .json({
          success: true,
          message: 'Request successfully cancelled',
        })).catch(error => response.status(500).json({ message: error.message }));
  }
}

export default UserRequests;
