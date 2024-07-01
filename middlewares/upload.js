const multer = require("multer");

const path = require("path");
const params = require("../config");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, params.basepath.files.name);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});


const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpg|jpeg|png/;

        const mimetype = fileTypes.test(file.mimetype);

        const extname = fileTypes.test(
            path.extname(file.originalname).toLowerCase()
        );

        if (mimetype && extname) {
            return cb(null, true);
        }


        cb("Tipo de archivo no soportado");
    },
    limits: { fileSize: 1024 * 1024 * 1 }, // 1 Mb
});


module.exports = upload;