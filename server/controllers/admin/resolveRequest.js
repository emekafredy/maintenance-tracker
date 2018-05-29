import moment from 'moment';

import client from '../../models/database';
import AdminValidator from '../../validation/admin';

class ResolveClass {
  static ResolveRequestQuery(request, response, data) {
    const reqId = parseInt(request.params.requestId, 10);
    const resolvedRequest = {
      product: data.rows[0].product,
      requestType: data.rows[0].requesttype,
      issue: data.rows[0].issue,
      requestStatus: request.body.requestStatus.toLowerCase(),
      resolvedAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
    };
    const query = {
      text: 'UPDATE requests SET product=$1, requestType=$2, issue=$3, requestStatus=$4, resolvedAt=$5 WHERE requestId=$6',
      values: [
        resolvedRequest.product,
        resolvedRequest.requestType,
        resolvedRequest.issue,
        resolvedRequest.requestStatus,
        resolvedRequest.resolvedAt, reqId],
    };
    return client.query(query).then(() => {
      response.status(200).json({
        message: 'Request has been resolved',
        resolvedRequest,
      });
    }).catch(error => response.status(404).json({ message: error.message }));
  }

  static selectionQuery(request, response) {
    const reqId = parseInt(request.params.requestId, 10);
    client.query('SELECT * FROM requests WHERE requestId =$1', [reqId])
      .then((data) => {
        if (data.rows.length === 0) {
          return response.status(500).json({ message: 'There is no request with this ID' });
        }
        if (data.rows[0].requeststatus === 'disapproved') {
          return response.status(401).json({ message: 'You can no longer update this request' });
        }
        if (data.rows[0].requeststatus === 'pending') {
          return response.status(401).json({ message: 'Request needs to be approved before resolving' });
        }
        if (data.rows[0].requeststatus === 'resolved') {
          return response.status(409).json({ message: 'Request has already been resolved' });
        }
        return ResolveClass.ResolveRequestQuery(request, response, data);
      }).catch(error => response.status(404).json({ message: error.message }));
  }

  static resolveARequest(request, response) {
    if (AdminValidator.checkResolution(request, response)) {
      return null;
    }
    const reqId = parseInt(request.params.requestId, 10);

    if (Number.isNaN(reqId)) {
      return response.status(404).json({
        message: 'Your request ID is invalid. Please enter a number',
      });
    }
    return ResolveClass.selectionQuery(request, response);
  }
}

export default ResolveClass;
