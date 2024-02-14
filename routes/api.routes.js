const router = require("express").Router();
const apiCtrl = require("../controllers/api.controllers");

router.get("/", apiCtrl.listAll);

module.exports = router;
