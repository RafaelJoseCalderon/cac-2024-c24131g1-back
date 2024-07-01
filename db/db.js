/**
 * segun "https://sidorares.github.io/node-mysql2/docs/documentation/promise-wrapper"
**/

const mysql2 = require("mysql2/promise");
const params = require("../config");


const pool = mysql2.createPool(
    { ...params.database }
);


// test connection
pool.getConnection()
    .then(connection => {
        console.log('Connected to the database');
        connection.release();
    })
    .catch(error => {
        console.log('Error connecting to the database', error);
    });

    
module.exports = pool;