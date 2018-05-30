import express from 'express';
import bodyParser from 'body-parser';
import winston from 'winston';


// Set up the express app
const app = express();
const port = process.env.PORT || 4500;

// Parse incoming requests data

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('UI'));

app.listen(port);
winston.log('info', `App is listening on port ${port}`);

export default app;
