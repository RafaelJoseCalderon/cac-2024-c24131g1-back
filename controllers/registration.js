const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const config = require("../config");
const pool = require("../db/db");


const signup = async (req, res) => {
    const { nombre, apellido, password, email } = req.body;
    const sql = "INSERT INTO Usuarios (nombre, apellido, contrasenia, email, imagen) VALUES (?, ?, ?, ?, ?)";

    try {
        const contrasenia = bcrypt.hashSync(password, 8);

        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [nombre, apellido, contrasenia, email, ""]);
        connection.release();

        const token = jwt.sign(
            { id: rows.insertId },
            config.jwt.secretKey,
            { expiresIn: config.jwt.tokenExpire, }
        );

        res.status(201).json({ auth: true, token });

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM Usuarios WHERE email = ?";

    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [email]);
        connection.release();

        if (rows.length == 0) {
            return res.status(404).json({ error: "No existe el usuario" });
        }

        if (!bcrypt.compareSync(password, rows[0].contrasenia)) {
            return res.status(401).json({ auth: false, token: null });
        }

        const token = jwt.sign(
            { id: rows[0].id },
            config.jwt.secretKey,
            { expiresIn: config.jwt.tokenExpire, }
        );

        res.status(201).json({ auth: true, token });

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = { signup, login };