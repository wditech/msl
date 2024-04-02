const router = require("express").Router();
const apiPlace = require("../controllers/places.controller");

router.get("/listAll", apiPlace.listAll);
router.get("/listOne/:id", apiPlace.listOne);
router.post("/add", apiPlace.add);
router.delete("/delete/:id", apiPlace.delete);
router.put("/update/:id", apiPlace.update);

module.exports = router;
