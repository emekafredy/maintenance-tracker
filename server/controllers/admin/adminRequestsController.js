import client from '../../models/database';
import AdminRequests from '../request_queries/adminRequestqueries';
import UserRequests from '../request_queries/userRequestqueries';

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
  static processARequest(request, response) {
    UserRequests.checkNaN(request, response);
    if (request.params.status === 'approve') {
      return AdminRequests.selectionQuery(request, response, 'approvedAt', 'approved');
    }
    if (request.params.status === 'disapprove') {
      return AdminRequests.selectionQuery(request, response, 'disapprovedAt', 'disapproved');
    }
    if (request.params.status === 'resolve') {
      return AdminRequests.resolveSelectionQuery(request, response, 'resolvedAt', 'resolved');
    }
    return response.status(400).json({
      success: false,
      message: 'Your request is not valid',
    });
  }
}

export default AdminRequestsController;
