import requests from '../data/requests';
import RequestMiddleware from '../middleware/requests';

/**
 * Represents the Requests Controller
 * @class
 */
class Request {
  /**
   * @method {getRequests} - GET method to get maintenace/repair requests from the database
   * @method {getARequest}  GET method to get a maintenance/repair
   * @method {createRequest}  POST method to create new maintenance/repair requests
   * request from the database with its id
   * @param {object} request
   * @param {object} response
   */
  static getRequests(request, response) {
    if (requests.length === 0) {
      response.status(204).json({
        message: 'No request has been made',
      });
    }
    response.status(200).json({
      message: 'Requests retrieved successfully',
      requests,
    });
  }

  static getARequest(request, response) {
    const id = parseInt(request.params.requestId, 10);
    requests.map((myRequest, index) => {
      if (myRequest.id === id) {
        return response.status(200).json({
          message: 'Request successfully retrieved',
          myRequest,
        });
      }
      return null;
    });

    return response.status(404).json({
      message: 'Request does not exist',
    });
  }

  static createRequest(request, response) {
    const newRequest = {
      id: requests.length + 1,
      userId: request.body.userId,
      name: request.body.name,
      product: request.body.product,
      requestType: request.body.requestType,
      receiptDate: request.body.receiptDate,
      lastCheck: request.body.lastCheck,
      issueDescription: request.body.issueDescription,
      requestStatus: 'Pending',
      imgUrl: request.body.imgUrl,
    };

    if (RequestMiddleware.checkRequest(request, response)) {
      return null;
    }
    requests.push(newRequest);
    return response.status(201).send({
      message: 'Request successfully added',
      newRequest,
    });
  }
}

export default Request;
