import express from 'express';
import bodyParser from 'body-parser';
import winston from 'winston';


// Set up the express app
const app = express();
const port = process.env.PORT || 4500;

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('UI'));


app.listen(port);
winston.log('info', `App is listening on port ${port}`);

export default app;
