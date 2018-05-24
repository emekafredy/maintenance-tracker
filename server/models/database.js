import pg from 'pg';
import dotenv from 'dotenv';

require('dotenv').config();

// const DATABASE_URL= 'postgres://postgres:sam@localhost:5432/mtracker';

// const conString = 'postgres://postgres:sam@localhost/mtracker';

const DATABASE_URL = {
  user: 'postgres',
  host: 'localhost',
  database: 'mtracker',
  password: 'sam',
  port: 5432,
  // max: 10,
  // idleTimeoutMillis: 30000,
};

const pool = new pg.Pool(DATABASE_URL);

export default pool;
