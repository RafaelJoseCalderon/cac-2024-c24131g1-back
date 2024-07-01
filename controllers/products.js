const pool = require("../db/db");


const findAllOnSale = async (req, res) => {
    const sql = "SELECT * FROM Productos WHERE estado = 'EN_VENTA'"

    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql);
        connection.release();

        res.json(rows);

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


const findAllInEdition = async (req, res) => {
    const sql = "SELECT * FROM Productos WHERE estado = 'EN_EDICION'"

    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql);
        connection.release();

        res.json(rows);

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


const findAllDeletes = async (req, res) => {
    const sql = "SELECT * FROM Productos WHERE estado = 'ELIMINADO'"

    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql);
        connection.release();

        res.json(rows);

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


const findById = async (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM Productos WHERE id = ?";

    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [id]);
        connection.release();

        if (rows.length == 0) {
            return res.status(404).send({ error: "No existe el producto" });
        }

        res.json(rows[0]);

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


const create = async (req, res) => {
    const { id_categoria, nombre, precio, stock, imagen } = req.body;
    const sql = "INSERT INTO Productos (id_categoria, nombre, precio, stock, estado, imagen) VALUES (?, ?, ?, ?, ?, ?)";

    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [id_categoria, nombre, precio, stock, "EN_EDICION", imagen]);
        connection.release();

        res.status(201).json({ ...req.body, id: rows.insertId });

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


const update = async (req, res) => {
    const { id } = req.params;
    const { id_categoria, nombre, precio, stock, imagen } = req.body;
    const sql = "UPDATE Productos SET id_categoria = ?, nombre = ?, precio = ?, stock = ?, imagen = ? WHERE id = ?";

    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [id_categoria, nombre, precio, stock, imagen, id]);
        connection.release();

        if (rows.affectedRows == 0) {
            return res.status(404).send({ error: "No existe la categoria" });
        }

        res.json({ ...req.body, ...req.params });

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


const onSale = async (req, res) => {
    const { id } = req.params;
    const sql = "UPDATE Productos SET estado = 'EN_VENTA' WHERE id = ?";

    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [id]);
        connection.release();

        if (rows.affectedRows == 0) {
            return res.status(404).send({ error: "No existe la categoria" });
        }

        res.json({ mensaje: "Producto puesto a la venta" });

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


const destroy = async (req, res) => {
    const { id } = req.params;

    const productoSql = "SELECT * FROM Productos WHERE id = ?"
    const setStateSql = "UPDATE Productos SET estado = 'ELIMINADO' WHERE id = ?";
    const delProductoSql = "DELETE FROM Productos WHERE id = ?";

    try {
        const connection = await pool.getConnection();
        const [producto] = await connection.query(productoSql, [id]);

        if (producto.length == 0) {
            return res.status(404).send({ error: "No existe el productos" });
        }

        if (producto[0].estado == "EN_EDICION") {
            await connection.query(delProductoSql, [id]);
        } else {
            await connection.query(setStateSql, [id]);
        }

        connection.release();

        res.json({ mensaje: "Producto eliminado" });

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = {
    findAllOnSale,
    findAllInEdition,
    findAllDeletes,
    findById,
    create,
    update,
    onSale,
    destroy
};