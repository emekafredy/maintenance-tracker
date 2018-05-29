import validator from 'validator';
import moment from 'moment';

import client from '../../models/database';

class UserRequestsController {
  static getLoggedUsersRequests(request, response) {
    const { userid: userId } = request.user;
    client.query('SELECT * FROM requests WHERE userId = $1', [userId]).then((data) => {
      if (data.rows.length > 0) {
        return response.status(200).json({
          message: 'Requests successfully retrieved',
          data: data.rows,
        });
      }
      return response.status(200).json({
        message: 'You have no requests record yet',
      });
    }).catch(error => response.status(404).json({ message: error.message }));
  }

  static getSingleRequest(request, response) {
    const reqId = parseInt(request.params.requestId, 10);
    if (Number.isNaN(reqId)) {
      return response.status(400).json({
        message: 'Your request ID is invalid. Please enter a number',
      });
    }
    const { userid: userId } = request.user;
    client.query('select * from requests where userId = $1 and requestId = $2', [userId, reqId])
      .then((data) => {
        if (data.rows.length === 0) {
          return response.status(400).json({
            message: 'You have no request with this ID',
          });
        }
        return response.status(200)
          .json({
            message: 'Retrieved ONE request',
            data: data.rows,
          });
      })
      .catch(error => response.status(404).json({ message: error.message }));
    return null;
  }


  static createRequest(request, response) {
    const { userid: userId } = request.user;
    const newRequest = {
      product: validator.trim(String(request.body.product.toLowerCase())),
      requestType: validator.trim(String(request.body.requestType.toLowerCase())),
      issue: validator.trim(String(request.body.issue)),
      requestDate: moment().format('MMMM Do YYYY, h:mm:ss a'),
    };
    const query = {
      text: 'INSERT INTO requests(userId, product, requestType, issue, requestDate) VALUES($1, $2, $3, $4, $5)',
      values: [userId,
        newRequest.product,
        newRequest.requestType,
        newRequest.issue,
        newRequest.requestDate],
    };
    client.query(query).then(() => response.status(201).json({
      message: 'Request Successfully created',
      newRequest,
    })).catch(error => response.status(404).json({ message: error.message }));

    return null;
  }

  static updateRequestQuery(request, response, data) {
    const reqId = parseInt(request.params.requestId, 10);
    const updatedRequest = {
      product: request.body.product || data.rows[0].product,
      requestType: request.body.requestType || data.rows[0].requesttype,
      issue: request.body.issue || data.rows[0].issue,
    };
    return client.query({
      text: 'UPDATE requests SET product=$1, requestType=$2, issue=$3 WHERE requestId=$4',
      values: [
        updatedRequest.product,
        updatedRequest.requestType,
        updatedRequest.issue,
        reqId],
    }).then(() => response.status(200).json({
      message: 'Request successfully updated',
      updatedRequest,
    })).catch(error => response.status(404).json({ message: error.message }));
  }

  static updateRequest(request, response) {
    const reqId = parseInt(request.params.requestId, 10);
    const { userid: userId } = request.user;
    client.query('select * from requests where userId = $1 and requestId = $2', [userId, reqId])
      .then((data) => {
        if (data.rows.length === 0) {
          return response.status(400).json({
            message: 'You have no request with this ID',
          });
        } else if (data.rows[0].requeststatus !== 'pending') {
          return response.status(401).json({
            message: 'You can no longer update this request',
          });
        }
        return UserRequestsController.updateRequestQuery(request, response, data);
      }).catch(error => response.status(404).json({ message: error.message }));

    if (Number.isNaN(reqId)) {
      return response.status(400).json({
        message: 'Your request ID is invalid. Please enter a number',
      });
    }
    return null;
  }
}

export default UserRequestsController;
