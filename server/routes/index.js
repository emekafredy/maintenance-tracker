import userRoutes from './userRoutes';
import userRequestsRoutes from './userRequestsRoutes';

const routes = (app) => {
  app.get('/', (request, response) => response.status(200).json({
    message: 'MAINTENANCE TRACKER APP',
  }));

  app.get('/api/v1', (request, response) => response.status(200).json({
    message: 'Welcome to M-Tracker App API, Version 1',
  }));

  userRoutes(app);
  userRequestsRoutes(app);
};

export default routes;
