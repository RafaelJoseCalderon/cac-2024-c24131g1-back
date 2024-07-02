const database = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 5
}


const jwt = {
    secretKey: "mi_clave_secreta",
    tokenExpire: "1h"
}


module.exports = { database, jwt };