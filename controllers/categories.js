const pool = require("../db/db");


const findAll = async (req, res) => {
    const sql = "SELECT * FROM Categorias"

    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql);
        connection.release();

        res.json(rows);

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


const finById = async (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM Categorias WHERE id = ?";

    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [id]);
        connection.release();

        if (rows.length == 0) {
            return res.status(404).send({ error: "No existe la categoria" });
        }

        res.json(rows[0]);

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


const create = async (req, res) => {
    const { nombre, descripcion } = req.body;
    const sql = "INSERT INTO Categorias (nombre, descripcion) VALUES (?, ?)";

    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [nombre, descripcion]);
        connection.release();

        res.status(201).json({ ...req.body, id: rows.insertId });

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


const update = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    const sql = "UPDATE Categorias SET nombre = ?, descripcion = ? WHERE id = ?";

    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [nombre, descripcion, id]);
        connection.release();

        if (rows.affectedRows == 0) {
            return res.status(404).send({ error: "No existe la categoria" });
        }

        res.json({ ...req.body, ...req.params });

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


const destroy = async (req, res) => {
    const { id } = req.params;
    const categoriaSql = "DELETE FROM Categorias WHERE id = ?";
    const productosSql = "UPDATE Productos SET id_categoria = NULL WHERE id_categoria = ?;"

    try {
        const connection = await pool.getConnection();
        await connection.query(productosSql, [id]);
        const [rowsc] = await connection.query(categoriaSql, [id]);
        connection.release();

        if (rowsc.affectedRows == 0) {
            return res.status(404).send({ error: "No existe la categoria" });
        }

        res.json({ mensaje: "Categoria eliminada" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = { findAll, finById, create, update, destroy };