const { pool } = require('./connection');


/**
 * Create User Table
 */
const createUserTable = () => {
    const queryText = `CREATE TABLE IF NOT EXISTS users(
      userid serial PRIMARY KEY,
      username VARCHAR(128) UNIQUE NOT NULL,
      firstName VARCHAR(128) NOT NULL,
      lastName VARCHAR(128) NOT NULL,
      email VARCHAR(128) UNIQUE NOT NULL,
      password VARCHAR(128) NOT NULL,
      superuser boolean DEFAULT false,
      createdOn VARCHAR(128) NOT NULL,
      modifiedOn VARCHAR(128) NOT NULL
      )`;
    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        }).catch((error) => {
            console.log(error);
            pool.end();
        });
};

/**
 * Drop Table Users
 */
const dropUserTable = () => {
    const queryText = 'DROP TABLE IF EXISTS users';
    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        }).catch((error) => {
            console.log(error);
            pool.end();
        });
};

module.exports = { createUserTable, dropUserTable };

require('make-runnable')