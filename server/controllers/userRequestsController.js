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
    }).catch(err => next(err.message));
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
      .catch(err => next(err.message));
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
    })).catch(err => next(err.message));

    return null;
  }

  static updateRequest(request, response, next) {
    const reqId = parseInt(request.params.requestId, 10);
    const { userid: userId } = request.user;
    const updatedRequest = {
      product: request.body.product || response.req.body.product,
      requestType: request.body.requestType || response.req.body.requestType,
      issue: request.body.issue || response.req.body.issue,
    };
    const query = {
      text: 'UPDATE requests SET product=$1, requestType=$2, issue=$3 WHERE requestId=$4',
      values: [
        updatedRequest.product,
        updatedRequest.requestType,
        updatedRequest.issue,
        reqId],
    };
    if (RequestValidator.checkUpdate(request, response)) {
      return null;
    }
    client.query('select * from requests where userId = $1 and requestId = $2', [userId, reqId])
      .then((data) => {
        if (data.rows.length === 0) {
          response.status(400).json({
            message: 'You have no request with this ID',
          });
        } else if (data.rows[0].requeststatus !== 'pending') {
          response.status(401).json({
            message: 'You can no longer update this request',
          });
        }
        return client.query(query).then(myRequest => response.status(200).json({
          message: 'Request successfully updated',
          updatedRequest,
        })).catch(err => next(err.message));
      }).catch(err => next(err.message));

    if (Number.isNaN(reqId)) {
      return response.status(400).json({
        message: 'Your request is invalid. Please enter a number',
      });
    }
    return null;
  }
}

export default UserRequestsController;
