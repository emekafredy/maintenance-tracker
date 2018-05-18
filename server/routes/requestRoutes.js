import RequestController from '../controllers/requestsController';
import RequestMiddleware from '../middleware/requests';

const requestRoutes = (app) => {
  app.get('/api/v1/users/requests', RequestController.getRequests);
  app.get('/api/v1/users/requests/:requestId', RequestController.getARequest);
  app.post('/api/v1/users/requests', RequestController.createRequest);
  app.put('/api/v1/users/requests/:requestId', RequestController.updateRequest);
};

export default requestRoutes;
