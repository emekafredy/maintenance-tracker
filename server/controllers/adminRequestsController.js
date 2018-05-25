import client from '../models/database';
import requests from '../validation/requests';

class AdminRequestsController {
  static getAllRequests(request, response, next) {
    client.query('SELECT * FROM requests').then(data => response.status(200).json({
      message: 'Requests retrieved successfully',
      data: data.rows,
    })).catch(error => next(error));
  }

  static approveARequest(request, response, next) {
    const reqId = parseInt(request.params.requestId, 10);
    const approvedRequest = {
      requestStatus: request.body.requestStatus || response.req.body.requestStatus,
    };

    const query = {
      text: 'UPDATE requests SET requestStatus=$1 WHERE requestId=$2',
      values: [approvedRequest.requestStatus, reqId],
    };

    client.query('SELECT * FROM requests WHERE requestId =$1', [reqId])
      .then((data) => {
        if (data.rows.length === 0) {
          response.status(400).json({
            message: 'There is no request with this ID',
          });
        } else if (data.rows[0].requeststatus !== 'pending') {
          response.status(401).json({
            message: `Request has already been ${data.rows[0].requeststatus}`,
          });
        }
        return client.query(query).then((update) => {
          response.status(200).json({
            message: 'Request has been approved',
            data: data.rows,
          });
        }).catch(error => next(error));
      }).catch(error => next(error));
    if (Number.isNaN(reqId)) {
      return response.status(404).json({
        message: 'Your request is invalid. Please enter a number',
      });
    }
    return null;
  }

  static disapproveARequest(request, response, next) {
    const reqId = parseInt(request.params.requestId, 10);
    const approvedRequest = {
      requestStatus: request.body.requestStatus || response.req.body.requestStatus,
    };

    const query = {
      text: 'UPDATE requests SET requestStatus=$1 WHERE requestId=$2',
      values: [approvedRequest.requestStatus, reqId],
    };

    client.query('SELECT * FROM requests WHERE requestId =$1', [reqId])
      .then((data) => {
        if (data.rows.length === 0) {
          response.status(500).json({
            message: 'There is no request with this ID',
          });
        } else if (data.rows[0].requeststatus !== 'pending') {
          response.status(401).json({
            message: 'You can no longer update this request',
          });
        }
        return client.query(query).then((update) => {
          response.status(200).json({
            message: 'Request has been disapproved',
            data: data.rows,
          });
        }).catch(error => next(error));
      }).catch(error => next(error));
    if (Number.isNaN(reqId)) {
      return response.status(400).json({
        message: 'Your request is invalid. Please enter a number',
      });
    }
    return null;
  }

  static resolveARequest(request, response, next) {
    const reqId = parseInt(request.params.requestId, 10);
    const approvedRequest = {
      requestStatus: request.body.requestStatus || response.req.body.requestStatus,
    };

    const query = {
      text: 'UPDATE requests SET requestStatus=$1 WHERE requestId=$2',
      values: [approvedRequest.requestStatus, reqId],
    };

    client.query('SELECT * FROM requests WHERE requestId =$1', [reqId])
      .then((data) => {
        if (data.rows.length === 0) {
          response.status(500).json({
            message: 'There is no request with this ID',
          });
        } else if (data.rows[0].requeststatus === 'disapproved') {
          response.status(401).json({
            message: 'You can no longer update this request',
          });
        } else if (data.rows[0].requeststatus === 'pending') {
          response.status(401).json({
            message: 'You need to approve request before resolving',
          });
        } else if (data.rows[0].requeststatus === 'resolved') {
          response.status(401).json({
            message: 'Request has already been resolved',
          });
        }
        return client.query(query).then((update) => {
          response.status(200).json({
            message: 'Request has been resolved',
            data: data.rows,
          });
        }).catch(error => next(error));
      }).catch(error => next(error));
    if (Number.isNaN(reqId)) {
      return response.status(400).json({
        message: 'Your request is invalid. Please enter a number',
      });
    }
    return null;
  }
}

export default AdminRequestsController;
