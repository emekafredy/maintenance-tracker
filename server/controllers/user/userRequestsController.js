import validator from 'validator';
import moment from 'moment';

import client from '../../models/database';
import UserRequests from '../request_queries/userRequestqueries';

class UserRequestsController {
  /**
   * @description Get all requests of a logged in user
   *
   * @param {Object} request - HTTP Request
   * @param {Object} response - HTTP Response
   *
   * @returns {object} response JSON Object
   */
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
        data: data.rows,
      });
    }).catch(error => response.status(500).json({ message: error.message }));
  }

  /**
   * @description Get a single request of a logged in user by id
   *
   * @param {Object} request - HTTP Request
   * @param {Object} response - HTTP Response
   *
   * @returns {object} response JSON Object
   */
  static getSingleRequest(request, response) {
    UserRequests.selectARequest(request, response);
  }

  /**
   * @description Query to create a new request
   *
   * @param {Object} request - HTTP Request
   * @param {Object} response - HTTP Response
   *
   * @returns {object} response JSON Object
   */
  static createRequest(request, response) {
    const { userid: userId } = request.user;

    const newRequest = {
      product: validator.trim(String(request.body.product.toLowerCase())),
      requestType: validator.trim(String(request.body.requestType.toLowerCase())),
      issue: validator.trim(String(request.body.issue.toLowerCase())),
      requestDate: moment.utc().format('MMMM Do YYYY, h:mm:ss a'),
      imageUrl: request.body.imageUrl ? validator.trim(String(request.body.imageUrl)) : 'http://res.cloudinary.com/dgbmeqmyf/image/upload/v1528040152/ph.png',
    };
    const query = {
      text: 'INSERT INTO requests(userId, product, requestType, issue, requestDate, imageUrl) VALUES($1, $2, $3, $4, $5, $6)',
      values: [userId,
        newRequest.product,
        newRequest.requestType,
        newRequest.issue,
        newRequest.requestDate,
        newRequest.imageUrl],
    };
    client.query(query).then(() => response.status(201).json({
      success: true,
      message: 'Request Successfully created',
      newRequest,
    })).catch(error => response.status(500).json({ message: error.message }));
  }

  /**
   * @description Query to update existing request
   *
   * @param {Object} request - HTTP Request
   * @param {Object} response - HTTP Response
   *
   * @returns {object} response JSON Object
   */
  static updateRequest(request, response) {
    const reqId = parseInt(request.params.requestId, 10);
    const { userid: userId } = request.user;

    UserRequests.checkNaN(request, response);

    client.query('select * from requests where userId = $1 and requestId = $2', [userId, reqId])
      .then((data) => {
        if (UserRequests.condition(request, response, data, 'edit')) {
          return null;
        }
        return UserRequests.updateRequestQuery(request, response, data);
      }).catch(error => response.status(500).json({ message: error.message }));
    return null;
  }


  static deleteRequest(request, response) {
    const reqId = parseInt(request.params.requestId, 10);
    const { userid: userId } = request.user;

    UserRequests.checkNaN(request, response);

    return client.query('SELECT * from requests where userId = $1 AND requestId = $2', [userId, reqId])
      .then((data) => {
        if (UserRequests.condition(request, response, data, 'delete')) {
          return null;
        }
        return UserRequests.deleteQuery(request, response);
      })
      .catch(error => response.status(500).json({ message: error.message }));
  }
}

export default UserRequestsController;
