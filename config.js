const database = {
    host: "127.0.0.1", //localhost
    user: "root",
    password: "root",
    database: "root_base",
    connectionLimit: 5 // Adjust the connection limit as per your requirements
}


const jwt = {
    secretKey: "mi_clave_secreta",
    tokenExpire: "1h"
}


module.exports = { database, jwt };