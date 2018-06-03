import moment from 'moment';

import client from '../models/database';

class AdminRequests {
  /**
   * @description Methods for request processing as approved, disapproved or resolved
   *
   * @param {Object} request - HTTP Request
   * @param {Object} response - HTTP Response
   *
   * @returns {object} response JSON Object
   */
  static processRequestQuery(request, response, proccesdAt, action) {
    const reqId = parseInt(request.params.requestId, 10);

    const query = {
      text: `UPDATE requests SET requestStatus=$1, ${proccesdAt}=$2 WHERE requestId=$3`,
      values: [
        `${action}`,
        moment().format('MMMM Do YYYY, h:mm:ss a'),
        reqId,
      ],
    };

    return client.query(query).then(() => {
      client.query('SELECT * FROM requests WHERE requestId = $1', [reqId])
        .then((data) => {
          response.status(200).json({
            message: `Request has been ${action}`,
            data: data.rows,
          });
        }).catch(error => response.status(404).json({ message: error.message }));
    }).catch(error => response.status(404).json({ message: error.message }));
  }

  static selectionQuery(request, response, proccesdAt, action) {
    const reqId = parseInt(request.params.requestId, 10);

    return client.query('SELECT * FROM requests WHERE requestId =$1', [reqId])
      .then((data) => {
        if (data.rows.length === 0) {
          return response.status(400).json({
            message: 'There is no request with this ID',
          });
        }
        if (data.rows[0].requeststatus !== 'pending') {
          return response.status(400).json({
            message: `Request has already been ${data.rows[0].requeststatus}`,
          });
        }
        return AdminRequests.processRequestQuery(request, response, proccesdAt, action);
      }).catch(error => response.status(404).json({ message: error.message }));
  }

  static resolveSelectionQuery(request, response, proccesdAt, action) {
    const reqId = parseInt(request.params.requestId, 10);
    client.query('SELECT * FROM requests WHERE requestId =$1', [reqId])
      .then((data) => {
        if (data.rows.length === 0) {
          return response.status(500).json({ message: 'There is no request with this ID' });
        }
        if (data.rows[0].requeststatus === 'disapproved') {
          return response.status(400).json({ message: 'You can no longer update this request' });
        }
        if (data.rows[0].requeststatus === 'pending') {
          return response.status(400).json({ message: 'Request needs to be approved before resolving' });
        }
        if (data.rows[0].requeststatus === 'resolved') {
          return response.status(409).json({ message: 'Request has already been resolved' });
        }
        return AdminRequests.processRequestQuery(request, response, proccesdAt, action);
      }).catch(error => response.status(404).json({ message: error.message }));
  }
}

export default AdminRequests;
