const express = require("express");
const params = require("./config");

const app = express();
const files = params.basepath.files


app.use(express.json());
app.use(files.name, express.static(files.path));

app.use("/", express.static("public"));

app.use("/api/categories", require("./routes/categories"));
app.use("/api/products", require("./routes/products"));
app.use("/api/receipt", require("./routes/receipt"));
app.use("/api/registration", require("./routes/registration"));


const port = 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});