import requests from '../data/requests';
import RequestMiddleware from '../middleware/requests';

/**
 * Represents the Requests Controller
 * @class
 */
class Request {
  /**
   * @method {getRequests} - GET method to get maintenace/repair requests from the database
   * @param {object} request
   * @param {object} response
   */
  static getRequests(request, response, next) {
    if (requests.length === 0) {
      return response.status(204).json({
        message: 'No request found',
      });
    }
    return response.status(200).json({
      message: 'Requests retrieved successfully',
      requests,
    });
  }


  /**
   * @method {getARequest}  GET method to get a maintenance/repair
   * request from the database with its id
   * @param  {object} request
   * @param  {object} response
   */
  static getARequest(request, response, next) {
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


  /**
   * @method {createRequest}  POST method to create new maintenance/repair requests
   * @param  {object} request
   * @param  {object} response
   */
  static createRequest(request, response, next) {
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


  /**
   * @method {updateRequest}  PUT method to update existing maintenance/repair requests
   * @param  {object} request
   * @param  {object} response
   */
  static updateRequest(request, response, next) {
    const id = parseInt(request.params.requestId, 10);
    let requestFound;
    let requestIndex;

    requests.map((myRequest, index) => {
      if (myRequest.id === id) {
        requestFound = myRequest;
        requestIndex = index;

        const updatedRequest = {
          id: requestFound.id,
          userId: requestFound.userId,
          name: requestFound.name,
          product: request.body.product || requestFound.product,
          requestType: request.body.requestType || requestFound.requestType,
          receiptDate: request.body.receiptDate || requestFound.receiptDate,
          lastCheck: request.body.lastCheck || requestFound.lastCheck,
          issueDescription: request.body.issueDescription || requestFound.issueDescription,
          requestStatus: request.body.requestStatus,
          imgUrl: request.body.imgUrl || requestFound.imgUrl,
        };

        if (RequestMiddleware.checkUpdate(request, response)) {
          return null;
        }

        requests.splice(requestIndex, 1, updatedRequest);

        return response.status(201).send({
          message: 'Request updated successfully',
          updatedRequest,
        });
      }
      return null;
    });
    return response.status(404).json({
      message: 'Request does not exist',
    });
  }
}

export default Request;
