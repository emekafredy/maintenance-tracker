class AdminValidation {
  static checkStatus(request, response, next, statusAction, statusType) {
    const { requestStatus } = request.body;
    let isValid = true;
    const errors = {};

    if (!requestStatus) {
      isValid = false;
      errors.requestStatus = `Enter ${statusAction} to ${statusType} request`;
    }

    if (requestStatus && requestStatus.toLowerCase() !== `${statusAction}`) {
      isValid = false;
      errors.requestStatus = `Enter ${statusAction} to ${statusType} request`;
    }
    if (isValid) {
      return next();
    }
    return response.status(400).json(errors);
  }

  static checkApproval(request, response, next) {
    AdminValidation.checkStatus(request, response, next, 'approved', 'approve');
  }

  static checkRejection(request, response, next) {
    AdminValidation.checkStatus(request, response, next, 'disapproved', 'disapprove');
  }

  static checkResolution(request, response, next) {
    AdminValidation.checkStatus(request, response, next, 'resolved', 'resolve');
  }
}

export default AdminValidation;
