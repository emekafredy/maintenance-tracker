class AdminValidation {
  static checkApproval(request, response) {
    const { requestStatus } = request.body;

    if (!requestStatus) {
      return response.status(409).json({
        message: 'Enter \'approved\' to approve request',
      });
    }

    if (requestStatus && requestStatus.toLowerCase() !== 'approved') {
      return response.status(409).json({
        message: 'Enter \'approved\' to approve request',
      });
    }
    return null;
  }

  static checkRejection(request, response) {
    const { requestStatus } = request.body;

    if (!requestStatus) {
      return response.status(409).json({
        message: 'Enter \'disapproved\' to disapprove request',
      });
    }

    if (requestStatus && requestStatus.toLowerCase() !== 'disapproved') {
      return response.status(409).json({
        message: 'Enter \'disapproved\' to disapprove request',
      });
    }
    return null;
  }

  static checkResolution(request, response) {
    const { requestStatus } = request.body;

    if (!requestStatus) {
      return response.status(409).json({
        message: 'Enter \'resolved\' to resolve request',
      });
    }

    if (requestStatus && requestStatus.toLowerCase() !== 'resolved') {
      return response.status(409).json({
        message: 'Enter \'resolved\' to resolve request',
      });
    }
    return null;
  }
}

export default AdminValidation;
