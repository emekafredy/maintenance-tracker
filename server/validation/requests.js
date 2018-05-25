class RequestMiddleware {
  static checkRequest(request, response) {
    const product = String(request.body.product.toLowerCase());
    const requestType = String(request.body.requestType.toLowerCase());
    const { issue } = request.body;

    if (!product) {
      return response.status(400).json({
        message: 'The product is required',
      });
    }
    if (product &&
      product !== 'laptop' &&
        product !== 'monitor' &&
          product !== 'chair' &&
            product !== 'desk' &&
              product !== 'charger' &&
                product !== 'headphone') {
      return response.status(400).json({
        message: 'Invalid entry. Select one out of this list of products: laptop, monitor, chair, desk, charger and headphone',
      });
    }
    if (!requestType) {
      return response.status(400).json({
        message: 'Request type is required',
      });
    }
    if (requestType &&
          requestType !== 'repair'.toLowerCase() &&
            requestType !== 'maintenance'.toLowerCase() &&
              requestType !== 'replace'.toLowerCase()) {
      return response.status(400).json({
        message: 'Request type should be either repair, maintenance or replace',
      });
    }
    if (!issue || issue === ' ') {
      return response.status(400).json({
        message: 'Please describe the issue with your product',
      });
    }
    return null;
  }

  static checkUpdate(request, response) {
    const re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    const num = /\D/g;
    if (!request.body.requestType) {
      return response.status(400).json({
        message: 'Please update the request type',
      });
    }
    if (!request.body.product) {
      return response.status(400).json({
        message: 'Please Update the product',
      });
    }
    if (!request.body.issue) {
      return response.status(400).json({
        message: 'Please update the issue with your product',
      });
    }
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
