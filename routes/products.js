const express = require("express");
const router = express.Router();
const products = require("../controllers/products");


router.get("/on-sales", products.findAllOnSale);
router.get("/in-editions", products.findAllInEdition);
router.get("/deletes", products.findAllDeletes);

router.get("/:id", products.findById);

router.post("/create", products.create);
router.put("/update/:id", products.update);
router.put("/on-sale/:id", products.onSale);
router.delete("/delete/:id", products.destroy);


module.exports = router;