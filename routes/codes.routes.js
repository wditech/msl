const router = require("express").Router();
const apiCodes = require("../controllers/codes.controllers");
const verifyToken = require("../middlewares/validate-token.middleware");

router.post("/add", apiCodes.add);

router.delete("/delete/:id", apiCodes.delete);

router.get("/listAll", apiCodes.listAll);

router.get("/listOne/:id", apiCodes.listOne);

router.put("/update/:id", apiCodes.update);

module.exports = router;
