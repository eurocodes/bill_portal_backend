const { Pool } = require('pg');

// const connectionString = {
//     user: "postgres",
//     password: "password",
//     host: "localhost",
//     port: 5432,
//     database: "payone",
// }

const connectionString = "postgres://postgres:password@localhost:5432/payone";

const pool = new Pool({
    connectionString,
});

// Establish Database connection
const connect = async () => {
    try {
        const client = await pool.connect();
        console.log('Connected to pg database')
        return client;
    } catch (error) {
        console.log(error);
        pool.end();
    }
};

module.exports = { pool, connect };
require('make-runnable')