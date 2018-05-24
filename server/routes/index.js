import userRoutes from './userRoutes';

const routes = (app) => {
  app.get('/api/v1', (request, response) => response.status(200).json({
    message: 'Welcome to M-Tracker App API, Version 1',
  }));

  userRoutes(app);
};

export default routes;
