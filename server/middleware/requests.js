class RequestMiddleware {
  static checkRequest(request, response) {
    const re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    const num = /\D/g;

    if (!request.body.userId) {
      return response.status(400).json({
        message: 'Your user ID is required',
      });
    }
    // if (request.body.userId && request.body.userId.trim() === '') {
    //   return response.status(400).json({
    //     message: 'There should be no blank space on your user ID',
    //   });
    // }
    // if (request.body.userId && request.body.userId.match(num)) {
    //   return response.status(400).json({
    //     message: 'user ID should be a number',
    //   });
    // }
    if (!request.body.name) {
      return response.status(400).json({
        message: 'Your name is required',
      });
    }
    // if (request.body.name && request.body.name.trim() === '') {
    //   return response.status(400).json({
    //     message: 'There should be no blank space on your name input',
    //   });
    // }
    if (!request.body.product) {
      return response.status(400).json({
        message: 'The product is required',
      });
    }
    if (request.body.product &&
      request.body.product !== 'Laptop' &&
        request.body.product !== 'Monitor' &&
          request.body.product !== 'Office Chair' &&
            request.body.product !== 'Office Desk' &&
              request.body.product !== 'Laptop Charger' &&
                request.body.product !== 'Headphone' &&
                  request.body.product !== 'Socket') {
      return response.status(400).json({
        message: 'Invalid entry. The list of products you can enter are: Laptop, Monitor, Office Chair, Office Desk, Laptop Charger, Headphone and Socket',
      });
    }
    if (!request.body.requestType) {
      return response.status(400).json({
        message: 'Request type is required',
      });
    }
    if (request.body.requestType &&
          request.body.requestType !== 'Repair' &&
            request.body.requestType !== 'Maintenance' &&
              request.body.requestType !== 'Replace') {
      return response.status(400).json({
        message: 'Request type should be either Repair, Maintenance or Replace',
      });
    }
    if (!request.body.receiptDate) {
      return response.status(400).json({
        message: 'Please enter the date you recieved this product',
      });
    }
    // if (request.body.receiptDate && !request.body.receiptDate.match(re)) {
    //   return response.status(400).json({
    //     message: 'Your date should be in numbers and in this format: dd/mm/yyyy',
    //   });
    // }
    // if (request.body.lastCheck && !request.body.lastCheck.match(re)) {
    //   return response.status(400).json({
    //     message: 'Your date should be in numbers and in this format: dd/mm/yyyy',
    //   });
    // }
    if (!request.body.issueDescription || request.body.issueDescription === '') {
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
      request.body.product !== 'Laptop' &&
        request.body.product !== 'Monitor' &&
          request.body.product !== 'Office Chair' &&
            request.body.product !== 'Office Desk' &&
              request.body.product !== 'Laptop Charger' &&
                request.body.product !== 'Headphone' &&
                  request.body.product !== 'Socket') {
      return response.status(400).json({
        message: 'Invalid entry. The list of products you can enter are: Laptop, Monitor, Office Chair, Office Desk, Laptop Charger, Headphone and Socket',
      });
    }
    if (request.body.requestType &&
          request.body.requestType !== 'Repair' &&
            request.body.requestType !== 'Maintenance' &&
              request.body.requestType !== 'Replace') {
      return response.status(400).json({
        message: 'Request type should be either Repair, Maintenance or Replace',
      });
    }
    if (request.body.receiptDate && !request.body.receiptDate.match(re)) {
      return response.status(400).json({
        message: 'Your date should be in numbers and in this format: dd/mm/yyyy',
      });
    }
    if (request.body.lastCheck && !request.body.lastCheck.match(re)) {
      return response.status(400).json({
        message: 'Your date should be in numbers and in this format: dd/mm/yyyy',
      });
    }
    return null;
  }
}

export default RequestMiddleware;
