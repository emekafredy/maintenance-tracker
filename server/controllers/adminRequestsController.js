import client from '../models/database';
import requests from '../validation/requests';

class AdminRequestsController {
  static getAllRequests(request, response, next) {
    client.query('SELECT * FROM requests').then(data => response.status(200).json({
      message: 'Requests retrieved successfully',
      data: data.rows,
    })).catch(error => next(error));
  }
}

export default AdminRequestsController;
