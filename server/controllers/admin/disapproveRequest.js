import moment from 'moment';

import client from '../../models/database';
import AdminValidator from '../../validation/admin';

class DisapproveClass {
  static disapproveRequestQuery(request, response, data) {
    const reqId = parseInt(request.params.requestId, 10);
    const disapprovedRequest = {
      product: data.rows[0].product,
      requestType: data.rows[0].requesttype,
      issue: data.rows[0].issue,
      requestStatus: request.body.requestStatus.toLowerCase(),
      disapprovedAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
    };
    const query = {
      text: 'UPDATE requests SET product=$1, requestType=$2, issue=$3, requestStatus=$4, disapprovedAt=$5 WHERE requestId=$6',
      values: [
        disapprovedRequest.product,
        disapprovedRequest.requestType,
        disapprovedRequest.issue,
        disapprovedRequest.requestStatus,
        disapprovedRequest.disapprovedAt, reqId],
    };
    return client.query(query).then(() => {
      response.status(200).json({
        message: 'Request has been disapproved',
        disapprovedRequest,
      });
    }).catch(error => response.status(404).json({ message: error.message }));
  }

  static selectionQuery(request, response) {
    const reqId = parseInt(request.params.requestId, 10);
    return client.query('SELECT * FROM requests WHERE requestId =$1', [reqId])
      .then((data) => {
        if (data.rows.length === 0) {
          return response.status(500).json({
            message: 'There is no request with this ID',
          });
        }
        if (data.rows[0].requeststatus !== 'pending') {
          return response.status(401).json({
            message: `Request has already been ${data.rows[0].requeststatus}`,
          });
        }
        return DisapproveClass.disapproveRequestQuery(request, response, data);
      }).catch(error => response.status(404).json({ message: error.message }));
  }

  static disapproveARequest(request, response) {
    const reqId = parseInt(request.params.requestId, 10);

    if (AdminValidator.checkRejection(request, response)) {
      return null;
    }
    if (Number.isNaN(reqId)) {
      return response.status(404).json({
        message: 'Your request ID is invalid. Please enter a number',
      });
    }
    return DisapproveClass.selectionQuery(request, response);
  }
}

export default DisapproveClass;
