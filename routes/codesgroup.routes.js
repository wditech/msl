const router = require("express").Router();
const apiCodesGroup = require("../controllers/codesgroup.controller");
const verifyToken = require("../middlewares/validate-token.middleware");

router.post("/add", apiCodesGroup.add);

router.delete("/delete/:id", apiCodesGroup.delete);

router.get("/listAll", apiCodesGroup.listAll);

router.get("/listOne/:id", apiCodesGroup.listOne);

router.put("/update/:id", apiCodesGroup.update);

module.exports = router;
