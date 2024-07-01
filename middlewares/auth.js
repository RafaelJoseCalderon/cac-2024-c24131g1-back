const jwt = require("jsonwebtoken");
const config = require("../config");


const auth = (req, res, next) => {
    const token = req.headers['authorization'];
    const partes = token?.split(' ');
    const jwtToken = partes?.[1];

    if (!token) {
        return res.status(403).json({ mensaje: 'Token no proporcionado' });
    }

    if (partes.length !== 2 || partes[0] !== 'Bearer') {
        return res.status(401).json({ mensaje: 'Formato de token inválido' });
    }

    jwt.verify(jwtToken, config.jwt.secretKey, (error, decoded) => {
        if (error) {
            return res.status(500).json({ auth: false, message: "Token invalido." });
        }

        req.userId = decoded.id;

        next();
    });
};


module.exports = auth;