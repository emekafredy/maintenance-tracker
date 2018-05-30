import express from 'express';
import bodyParser from 'body-parser';
import winston from 'winston';
import cors from 'cors';

import router from './server/routes';
import notFound from './server/routes/notFound';


const app = express();
const port = process.env.PORT || 4500;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('UI'));

router(app);
app.use(notFound);

app.listen(port);
winston.log('info', `App is listening on port ${port}`);

export default app;
