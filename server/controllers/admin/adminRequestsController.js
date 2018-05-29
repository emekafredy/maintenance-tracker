import client from '../../models/database';

class AdminRequestsController {
  static getAllRequests(request, response) {
    client.query('SELECT * FROM requests').then(data => response.status(200).json({
      message: 'Requests retrieved successfully',
      data: data.rows,
    })).catch(error => response.status(404).json({ message: error.message }));
  }
}

export default AdminRequestsController;
