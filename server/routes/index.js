import requestRoutes from '../routes/requestRoutes';

const routes = (app) => {
  app.get('/api/v1', (request, response) => response.status(200).json({
    message: 'Welcome to M-Tracker App API, Version 1',
  }));

  requestRoutes(app);
};

export default routes;
