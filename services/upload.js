const fs = require("fs");
const path = require("path");
const params = require("../config");


const pathBy = (fileName) => {
    return path.resolve(params.basepath.files.path, fileName);
}


const exists = (fileName) => {
    try {
        fs.accessSync(pathBy(fileName));
        return true;
    } catch (error) {
        if (error.code === 'ENOENT') {
            return false;
        } else {
            throw error;
        }
    }
}


const deleteIfEquals = (oldName, newName) => {
    try {
        if (oldName !== newName && exists(oldName)) {
            fs.unlinkSync(pathBy(oldName));
        }
        console.log(`Archivo '${oldName}' actualizado.`);
    } catch (error) {
        throw error;
    }
}


const deleteFile = (fileName) => {
    if (fileName) {
        try {
            fs.unlinkSync(pathBy(fileName));
            console.log(`Archivo '${fileName}' eliminado.`);
        } catch (error) {
            throw error;
        }
    }
}


module.exports = { exists, deleteIfEquals, deleteFile };