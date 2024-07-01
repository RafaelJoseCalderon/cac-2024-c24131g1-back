const express = require("express");
const router = express.Router();

const registration = require("../controllers/registration");
const authmidd = require("../middlewares/auth");


router.post("/signup", registration.signup);
router.post("/login", registration.login);

router.get("/protected", authmidd, (req, res) => {
    res.status(200).send(`Hola User ${req.userId}`);
});


module.exports = router;