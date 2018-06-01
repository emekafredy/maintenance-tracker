class RequestMiddleware {
  static checkRequest(request, response) {
    if (!request.body.product) {
      return response.status(400).json({
        message: 'The product is required',
      });
    }
    if (request.body.product &&
      request.body.product !== 'laptop' &&
        request.body.product !== 'monitor' &&
          request.body.product !== 'chair' &&
            request.body.product !== 'desk' &&
              request.body.product !== 'charger' &&
                request.body.product !== 'headphone') {
      return response.status(400).json({
        message: 'Invalid entry. Select one out of this list of products: laptop, monitor, chair, desk, charger and headphone',
      });
    }
    if (!request.body.requestType) {
      return response.status(400).json({
        message: 'Request type is required',
      });
    }
    if (request.body.requestType &&
          request.body.requestType !== 'repair'.toLowerCase() &&
            request.body.requestType !== 'maintenance'.toLowerCase() &&
              request.body.requestType !== 'replace'.toLowerCase()) {
      return response.status(400).json({
        message: 'Request type should be either repair, maintenance or replace',
      });
    }
    if (!request.body.issue) {
      return response.status(400).json({
        message: 'Please describe the issue with your product',
      });
    }
    return null;
  }

  static checkUpdate(request, response) {
    const re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    const num = /\D/g;

    if (request.body.product &&
      request.body.product !== 'laptop' &&
        request.body.product !== 'monitor' &&
          request.body.product !== 'chair' &&
            request.body.product !== 'desk' &&
              request.body.product !== 'charger' &&
                request.body.product !== 'headphone' &&
                  request.body.product !== 'socket') {
      return response.status(400).json({
        message: 'Invalid entry. Select one out of this list of products: laptop, monitor, chair, desk, charger and headphone',
      });
    }
    if (request.body.requestType &&
          request.body.requestType !== 'repair' &&
            request.body.requestType !== 'maintenance' &&
              request.body.requestType !== 'replace') {
      return response.status(400).json({
        message: 'Request type should be either repair, maintenance or replace',
      });
    }
    return null;
  }
}

export default RequestMiddleware;
