import client from '../../models/database';
import AdminRequests from '../../utils/adminRequests';

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
    client.query('SELECT * FROM requests').then(data => response.status(200).json({
      success: true,
      message: 'Requests retrieved successfully',
      data: data.rows,
    })).catch(error => response.status(500).json({ message: error.message }));
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
    const reqId = parseInt(request.params.requestId, 10);
    if (Number.isNaN(reqId)) {
      return response.status(400).json({
        success: false,
        message: 'Your request ID is invalid. Please enter a number',
      });
    }
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
    const reqId = parseInt(request.params.requestId, 10);

    if (Number.isNaN(reqId)) {
      return response.status(404).json({
        success: false,
        message: 'Your request ID is invalid. Please enter a number',
      });
    }
    return AdminRequests.resolveSelectionQuery(request, response, 'resolvedAt', 'resolved');
  }
}

export default AdminRequestsController;
