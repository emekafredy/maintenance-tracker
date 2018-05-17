import express from 'express';
import bodyParser from 'body-parser';
import winston from 'winston';

import router from './server/routes';


// Set up the express app
const app = express();
const port = process.env.PORT || 4500;

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router(app);

app.listen(port);
winston.log('info', `App is listening on port ${port}`);

export default app;
