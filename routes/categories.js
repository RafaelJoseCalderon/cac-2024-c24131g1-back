const express = require("express");
const router = express.Router();
const categories = require("../controllers/categories");


router.get("/", categories.findAll);
router.get("/:id", categories.finById);
router.post("/create", categories.create);
router.put("/update/:id", categories.update);
router.delete("/delete/:id", categories.destroy);


module.exports = router;