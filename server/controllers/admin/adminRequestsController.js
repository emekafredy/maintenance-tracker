import client from '../../models/database';
import AdminRequests from '../request queries/adminRequestqueries';
import UserRequests from '../request queries/userRequestqueries';

class AdminRequestsController {
  /**
   * @description Get every request made in the app
   *
   * @param {Object} request - HTTP Request
   * @param {Object} response - HTTP Response
   *
   * @returns {object} response JSON Object
   */
  static getAllRequests(request, response) {
    client.query('SELECT users.userId, users.firstName, users.lastName, requests.requestId, requests.product, requests.requestType, requests.issue, requests.requestStatus FROM requests INNER JOIN users on requests.userId = users.userId')
      .then(data => response.status(200).json({
        success: true,
        message: 'Requests retrieved successfully',
        data: data.rows,
      })).catch(error => response.status(500).json({ message: error.message }));
  }

  /**
   * @description Get a request made in the app
   *
   * @param {Object} request - HTTP Request
   * @param {Object} response - HTTP Response
   *
   * @returns {object} response JSON Object
   */
  static getRequest(request, response) {
    const reqId = parseInt(request.params.requestId, 10);
    UserRequests.checkNaN(request, response);
    return client.query('SELECT * FROM requests INNER JOIN users on requests.userId = users.userId where requestId = $1', [reqId])
      .then((data) => {
        UserRequests.noContent(request, response, data, 'There is no request with this ID');
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
   * @description Check for non-integers in the parameter when updating a request
   *
   * @param {Object} request - HTTP Request
   * @param {Object} response - HTTP Response
   *
   * @returns {object} response JSON Object
   */
  static processARequest(request, response, proccesdAt, processedField) {
    UserRequests.checkNaN(request, response);
    return AdminRequests.selectionQuery(request, response, proccesdAt, processedField);
  }

  /**
   * @description Function call for request approval
   *
   * @param {Object} request - HTTP Request
   * @param {Object} response - HTTP Response
   *
   * @returns {object} response JSON Object
   */
  static approveARequest(request, response) {
    AdminRequestsController.processARequest(request, response, 'approvedAt', 'approved');
  }

  /**
   * @description Function call for request disapproval
   *
   * @param {Object} request - HTTP Request
   * @param {Object} response - HTTP Response
   *
   * @returns {object} response JSON Object
   */
  static disapproveARequest(request, response) {
    AdminRequestsController.processARequest(request, response, 'disapprovedAt', 'disapproved');
  }

  /**
   * @description Function call for request resolution
   *
   * @param {Object} request - HTTP Request
   * @param {Object} response - HTTP Response
   *
   * @returns {object} response JSON Object
   */
  static resolveARequest(request, response) {
    UserRequests.checkNaN(request, response);
    return AdminRequests.resolveSelectionQuery(request, response, 'resolvedAt', 'resolved');
  }
}

export default AdminRequestsController;
