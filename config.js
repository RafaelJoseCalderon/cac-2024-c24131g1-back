const database = {
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "root",
    database: process.env.DB_NAME || "root_base",
    connectionLimit: 5
}


const jwt = {
    secretKey: "mi_clave_secreta",
    tokenExpire: "1h"
}


module.exports = { database, jwt };