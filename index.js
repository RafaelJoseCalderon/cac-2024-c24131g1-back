require("dotenv").config();

const express = require("express");
const app = express();


app.use(express.json());


app.use("/", express.static("public"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/products", require("./routes/products"));
app.use("/api/receipt", require("./routes/receipt"));
app.use("/api/registration", require("./routes/registration"));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
