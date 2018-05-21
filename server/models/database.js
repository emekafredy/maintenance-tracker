import promise from 'bluebird';

const options = {
  promiseLib: promise,
};

const pgp = require('pg-promise')(options);

const connectionString = {
  user: 'postgres',
  host: 'localhost',
  database: 'mtracker',
  password: 'sam',
  port: 5432,
};

// const connectionString2 = {
//   user: 'postgres',
//   host: 'localhost',
//   database: 'trackertest',
//   password: 'sam',
//   port: 5432,
// };

const dbDev = pgp(connectionString);
// const dbTest = pgp(connectionString2);

module.exports = dbDev;
// module.exports = dbTest;
