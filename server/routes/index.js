import requestRoutes from '../routes/requestRoutes';

const routes = (app) => {
  app.get('/', (request, response) => response.status(200).json({
    message: 'Welcome to Maintenance-Tracker App API, Version 1',
  }));

  requestRoutes(app);
};

export default routes;
