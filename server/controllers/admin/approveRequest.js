import moment from 'moment';

import client from '../../models/database';
import AdminValidator from '../../validation/admin';

class ApproveClass {
  static approveRequestQuery(request, response, data) {
    const reqId = parseInt(request.params.requestId, 10);
    const approvedRequest = {
      product: data.rows[0].product,
      requestType: data.rows[0].requesttype,
      issue: data.rows[0].issue,
      requestStatus: request.body.requestStatus.toLowerCase(),
      approvedAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
    };
    const query = {
      text: 'UPDATE requests SET product=$1, requestType=$2, issue=$3, requestStatus=$4, approvedAt=$5 WHERE requestId=$6',
      values: [
        approvedRequest.product,
        approvedRequest.requestType,
        approvedRequest.issue,
        approvedRequest.requestStatus,
        approvedRequest.approvedAt, reqId],
    };

    return client.query(query).then(() => {
      response.status(200).json({
        message: 'Request has been approved',
        approvedRequest,
      });
    }).catch(error => response.status(404).json({ message: error.message }));
  }

  static selectionQuery(request, response) {
    const reqId = parseInt(request.params.requestId, 10);

    return client.query('SELECT * FROM requests WHERE requestId =$1', [reqId])
      .then((data) => {
        if (data.rows.length === 0) {
          return response.status(400).json({
            message: 'There is no request with this ID',
          });
        }
        if (data.rows[0].requeststatus !== 'pending') {
          return response.status(401).json({
            message: `Request has already been ${data.rows[0].requeststatus}`,
          });
        }
        return ApproveClass.approveRequestQuery(request, response, data);
      }).catch(error => response.status(404).json({ message: error.message }));
  }

  static approveARequest(request, response) {
    if (AdminValidator.checkApproval(request, response)) {
      return null;
    }

    const reqId = parseInt(request.params.requestId, 10);

    if (Number.isNaN(reqId)) {
      return response.status(404).json({
        message: 'Your request ID is invalid. Please enter a number',
      });
    }

    return ApproveClass.selectionQuery(request, response);
  }
}

export default ApproveClass;
