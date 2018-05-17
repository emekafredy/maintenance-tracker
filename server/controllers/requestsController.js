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
   * request from the database with its id
   * @param {object} request
   * @param {object} response
   */
  static getRequests(request, response) {
    if (requests.length === 0) {
      response.status(404).json({
        message: 'No request has been made',
      });
    }
    response.status(200).json({
      message: 'Requests retrieved successfully',
      requests,
    });
  }
}

export default Request;
