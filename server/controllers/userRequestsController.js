import client from '../models/database';
import RequestValidator from '../validation/requests';

class UserRequestsController {
  static getLoggedUsersRequests(request, response, next) {
    const { userid: userId } = request.user;
    client.query('SELECT * FROM requests WHERE userId = $1', [userId]).then((data) => {
      if (data.rows.length > 0) {
        return response.status(200).json({
          message: 'Requests successfully retrieved',
          data: data.rows,
        });
      }
      return response.status(204).json({
        message: 'You have no requests record',
      });
    }).catch(error => next(error));
  }

  static getSingleRequest(request, response, next) {
    const reqId = parseInt(request.params.requestId, 10);
    const { userid: userId } = request.user;
    client.query('select * from requests where userId = $1 and requestId = $2', [userId, reqId])
      .then((data) => {
        if (data.rows.length === 0) {
          response.status(400).json({
            message: 'You have no request with this ID',
          });
        }
        return response.status(200)
          .json({
            message: 'Retrieved ONE request',
            data: data.rows,
          });
      })
      .catch(err => next(err));
    if (Number.isNaN(reqId)) {
      return response.status(400).json({
        message: 'Your request is invalid. Please enter a number',
      });
    }
    return null;
  }

  static createRequest(request, response, next) {
    const { userid: userId } = request.user;
    const newRequest = {
      product: request.body.product,
      requestType: request.body.requestType,
      issue: request.body.issue,
    };
    const query = {
      text: 'INSERT INTO requests(userId, product, requestType, issue) VALUES($1, $2, $3, $4)',
      values: [userId,
        newRequest.product,
        newRequest.requestType,
        newRequest.issue],
    };

    if (RequestValidator.checkRequest(request, response)) {
      return null;
    }

    client.query(query).then(myRequest => response.status(201).json({
      message: 'Request Successfully created',
      newRequest,
    })).catch(error => next(error));

    return null;
  }
}

export default UserRequestsController;
