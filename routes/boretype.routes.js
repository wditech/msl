const router = require("express").Router();
const apiBoreType = require("../controllers/boretype.controller");

router.get("/listAll", apiBoreType.listAll);
router.get("/listOne/:id", apiBoreType.listOne);
router.post("/add", apiBoreType.add);
router.delete("/delete/:id", apiBoreType.delete);
router.put("/update/:id", apiBoreType.update);

module.exports = router;
