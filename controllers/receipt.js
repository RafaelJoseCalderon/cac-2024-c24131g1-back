const pool = require("../db/db");


const findAll = async (req, res) => {
    const sql = "SELECT * FROM Facturas"

    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql);
        connection.release();

        res.json(rows);

    } catch (error) {
        res.send(500).send('Internal server error')
    }
};


const findAllByUser = async (req, res) => {
    const { id_usuario } = req.params;
    const sql = "SELECT * FROM Facturas WHERE id_usuario = ?"

    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [id_usuario]);
        connection.release();

        if (rows.length == 0) {
            return res.status(404).send({ error: "No existe el recibo" });
        }

        res.json(rows);

    } catch (error) {
        res.send(500).send('Internal server error')
    }
};


const finById = async (req, res) => {
    const { id, id_usuario } = req.params;
    const reciboSql = "SELECT * FROM Facturas WHERE id = ? AND id_usuario = ?";
    const productosSql = `
        SELECT p.id, p.nombre FROM Facturas f
        JOIN Facturas_Productos fp ON f.id = fp.id_factura
        JOIN Productos p ON p.id = fp.id_producto
        WHERE f.id = ?
    `;

    try {
        const connection = await pool.getConnection();
        const [recibo] = await connection.query(reciboSql, [id, id_usuario]);
        const [productos] = await connection.query(productosSql, [id]);
        connection.release();

        if (recibo.length == 0) {
            return res.status(404).send({ error: "No existe el recibo" });
        }

        if (productos.length == 0) {
            return res.status(500).send({ error: "Internal server error" });
        }

        res.json({
            id: id,
            monto: recibo[0].monto,
            fecha: recibo[0].fecha,
            productos
        });

    } catch (error) {
        res.send(500).send('Internal server error')
    }
};


const registerReceipt = async (req, res) => {
    const { id_usuario, ids_productos } = req.body;
    const productosSql = "SELECT * FROM Productos WHERE id IN (?)";
    const reciboSql = "INSERT INTO Facturas (id_usuario, monto, fecha) VALUES (?, ?, ?)"
    const reciboProductosSql = "INSERT INTO Facturas_Productos (id_factura, id_producto) VALUES ?"

    try {
        const connection = await pool.getConnection();

        // traigo los producto ################################################
        const [productos] = await connection.query(productosSql, [ids_productos]);

        if (productos.length == 0) {
            return res.status(404).send({ error: "No se pudo calcular el monto" });
        }

        // genero el recibo ###################################################
        const fecha = new Date().toISOString().slice(0, 10);
        const monto = productos.reduce((total, producto) => total + producto.precio, 0);
        const [recibo] = await connection.query(reciboSql, [id_usuario, monto, fecha]);

        // le vinculo los productos al recibo ##################################
        const paresId = productos.map(producto => [recibo.insertId, producto.id]);
        await connection.query(reciboProductosSql, [paresId]);

        connection.release();

        res.json({
            id: recibo.insertId,
            monto: monto,
            fecha: fecha,
            productos: productos.map(producto => {return {
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio
            }})
        });

    } catch (error) {
        res.send(500).send('Internal server error')
    }
};


module.exports = { findAll, findAllByUser, finById, registerReceipt };