const router = require("express").Router();
const authCtrl = require("../controllers/auth.controllers");
const verifyToken = require("../middlewares/validate-token.middleware");

router.post("/register", verifyToken, authCtrl.register);

router.post("/login", authCtrl.login);

module.exports = router;
