import pg from 'pg';

const connection = {
  user: 'postgres',
  host: 'localhost',
  database: 'mtracker',
  password: 'sam',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
};


const pool = new pg.Pool(connection);

export default pool;
