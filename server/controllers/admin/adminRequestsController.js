import client from '../../models/database';
import AdminRequests from '../../utils/adminRequests';

class AdminRequestsController {
  static getAllRequests(request, response) {
    client.query('SELECT * FROM requests').then(data => response.status(200).json({
      success: true,
      message: 'Requests retrieved successfully',
      data: data.rows,
    })).catch(error => response.status(404).json({ message: error.message }));
  }

  static processARequest(request, response, proccesdAt, processedField) {
    const reqId = parseInt(request.params.requestId, 10);
    if (Number.isNaN(reqId)) {
      return response.status(404).json({
        success: false,
        message: 'Your request ID is invalid. Please enter a number',
      });
    }
    return AdminRequests.selectionQuery(request, response, proccesdAt, processedField);
  }

  static approveARequest(request, response) {
    AdminRequestsController.processARequest(request, response, 'approvedAt', 'approved');
  }

  static disapproveARequest(request, response) {
    AdminRequestsController.processARequest(request, response, 'disapprovedAt', 'disapproved');
  }

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
