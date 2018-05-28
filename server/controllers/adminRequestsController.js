import client from '../models/database';
import AdminValidator from '../validation/admin';

class AdminRequestsController {
  static getAllRequests(request, response, next) {
    client.query('SELECT * FROM requests').then(data => response.status(200).json({
      message: 'Requests retrieved successfully',
      data: data.rows,
    })).catch(error => next(error));
  }

  static approveARequest(request, response, next) {
    if (AdminValidator.checkApproval(request, response)) {
      return null;
    }

    const reqId = parseInt(request.params.requestId, 10);

    client.query('SELECT * FROM requests WHERE requestId =$1', [reqId])
      .then((data) => {
        if (data.rows.length === 0) {
          return response.status(400).json({
            message: 'There is no request with this ID',
          });
        } else if (data.rows[0].requeststatus !== 'pending') {
          return response.status(401).json({
            message: `Request has already been ${data.rows[0].requeststatus}`,
          });
        }
        const approvedRequest = {
          product: data.rows[0].product,
          requestType: data.rows[0].requesttype,
          issue: data.rows[0].issue,
          requestStatus: request.body.requestStatus.toLowerCase(),
        };
        const query = {
          text: 'UPDATE requests SET product=$1, requestType=$2, issue=$3, requestStatus=$4 WHERE requestId=$5',
          values: [
            approvedRequest.product,
            approvedRequest.requestType,
            approvedRequest.issue,
            approvedRequest.requestStatus, reqId],
        };
        return client.query(query).then(() => {
          response.status(200).json({
            message: 'Request has been approved',
            approvedRequest,
          });
        }).catch(error => next(error));
      }).catch(error => next(error));
    if (Number.isNaN(reqId)) {
      return response.status(404).json({
        message: 'Your request ID is invalid. Please enter a number',
      });
    }
    return null;
  }

  static disapproveARequest(request, response, next) {
    const reqId = parseInt(request.params.requestId, 10);

    if (AdminValidator.checkRejection(request, response)) {
      return null;
    }

    client.query('SELECT * FROM requests WHERE requestId =$1', [reqId])
      .then((data) => {
        if (data.rows.length === 0) {
          return response.status(500).json({
            message: 'There is no request with this ID',
          });
        } else if (data.rows[0].requeststatus !== 'pending') {
          return response.status(401).json({
            message: `Request has already been ${data.rows[0].requeststatus}`,
          });
        }
        const disapprovedRequest = {
          product: data.rows[0].product,
          requestType: data.rows[0].requesttype,
          issue: data.rows[0].issue,
          requestStatus: request.body.requestStatus.toLowerCase(),
        };
        const query = {
          text: 'UPDATE requests SET product=$1, requestType=$2, issue=$3, requestStatus=$4 WHERE requestId=$5',
          values: [
            disapprovedRequest.product,
            disapprovedRequest.requestType,
            disapprovedRequest.issue,
            disapprovedRequest.requestStatus, reqId],
        };
        return client.query(query).then(() => {
          response.status(200).json({
            message: 'Request has been disapproved',
            disapprovedRequest,
          });
        }).catch(error => next(error));
      }).catch(error => next(error));
    if (Number.isNaN(reqId)) {
      return response.status(400).json({
        message: 'Your request ID is invalid. Please enter a number',
      });
    }
    return null;
  }

  static resolveARequest(request, response, next) {
    const reqId = parseInt(request.params.requestId, 10);

    if (AdminValidator.checkResolution(request, response)) {
      return null;
    }

    client.query('SELECT * FROM requests WHERE requestId =$1', [reqId])
      .then((data) => {
        if (data.rows.length === 0) {
          return response.status(500).json({
            message: 'There is no request with this ID',
          });
        } else if (data.rows[0].requeststatus === 'disapproved') {
          return response.status(401).json({
            message: 'You can no longer update this request',
          });
        } else if (data.rows[0].requeststatus === 'pending') {
          return response.status(401).json({
            message: 'Request needs to be approved before resolving',
          });
        } else if (data.rows[0].requeststatus === 'resolved') {
          return response.status(401).json({
            message: 'Request has already been resolved',
          });
        }
        const resolvedRequest = {
          product: data.rows[0].product,
          requestType: data.rows[0].requesttype,
          issue: data.rows[0].issue,
          requestStatus: request.body.requestStatus.toLowerCase(),
        };
        const query = {
          text: 'UPDATE requests SET product=$1, requestType=$2, issue=$3, requestStatus=$4 WHERE requestId=$5',
          values: [
            resolvedRequest.product,
            resolvedRequest.requestType,
            resolvedRequest.issue,
            resolvedRequest.requestStatus, reqId],
        };
        return client.query(query).then(() => {
          response.status(200).json({
            message: 'Request has been resolved',
            resolvedRequest,
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
