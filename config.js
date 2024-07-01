const path = require("path");


const database = {
    host: "127.0.0.1", //localhost
    user: "root",
    password: "root",
    database: "root_base",
    connectionLimit: 5 // Adjust the connection limit as per your requirements
}


const basepath = {
    root: {
        name: "root",
        path: path.resolve(__dirname)
    },
    files: {
        name: "uploads",
        path: path.resolve(__dirname, "uploads")
    }
}


const jwt = {
    secretKey: "mi_clave_secreta",
    tokenExpire: "1h"
}


module.exports = { database, basepath, jwt };
