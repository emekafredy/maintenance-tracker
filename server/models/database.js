import pg from 'pg';

require('dotenv').config();

const DATABASE_URL = {
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: 10,
  idleTimeoutMillis: 30000,
};

const pool = new pg.Pool(DATABASE_URL);
pool.connect();

export default pool;
