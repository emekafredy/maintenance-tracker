import winston from 'winston';
import pool from './database';
import query from './model';

pool.query(query)
  .then(() => process.exit())
  .catch(error => winston.log(error));
