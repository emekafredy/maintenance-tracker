import validator from 'validator';

class RequestMiddleware {
  static checkRequest(request, response) {
    const { issue, product, requestType } = request.body;

    if (!validator.trim(String(product)) || !product) {
      return response.status(400).json({
        message: 'The product is required',
      });
    }
    if (validator.trim(String(product)) &&
      validator.trim(String(product.toLowerCase())) !== 'laptop' &&
      validator.trim(String(product.toLowerCase())) !== 'monitor' &&
      validator.trim(String(product.toLowerCase())) !== 'chair' &&
      validator.trim(String(product.toLowerCase())) !== 'desk' &&
      validator.trim(String(product.toLowerCase())) !== 'charger' &&
      validator.trim(String(product.toLowerCase())) !== 'headphone') {
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
      validator.trim(String(requestType.toLowerCase())) !== 'repair' &&
      validator.trim(String(requestType.toLowerCase())) !== 'maintenance' &&
      validator.trim(String(requestType.toLowerCase())) !== 'replace') {
      return response.status(400).json({
        message: 'Request type should be either repair, maintenance or replace',
      });
    }
    if (!validator.trim(String(issue)) || !(issue)) {
      return response.status(400).json({
        message: 'Please describe the issue with your product',
      });
    }
    return null;
  }

  static checkUpdate(request, response) {
    const { product, requestType } = request.body;

    if (product &&
      product !== 'laptop' &&
      product !== 'monitor' &&
      product !== 'chair' &&
      product !== 'desk' &&
      product !== 'charger' &&
      product !== 'headphone' &&
      product !== 'socket') {
      return response.status(400).json({
        message: 'Invalid entry. Select one out of this list of products: laptop, monitor, chair, desk, charger and headphone',
      });
    }
    if (requestType &&
      requestType !== 'repair' &&
      requestType !== 'maintenance' &&
      requestType !== 'replace') {
      return response.status(400).json({
        message: 'Request type should be either repair, maintenance or replace',
      });
    }
    return null;
  }
}

export default RequestMiddleware;
