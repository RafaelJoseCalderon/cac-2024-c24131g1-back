const express = require("express");
const router = express.Router();
const receipts = require("../controllers/receipt");


router.get("/", receipts.findAll);
router.get("/:id_usuario", receipts.findAllByUser);
router.get("/:id/:id_usuario", receipts.finById);
router.post("/register", receipts.registerReceipt);


module.exports = router;