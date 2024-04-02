const router = require("express").Router();
const apiObservation = require("../controllers/observation.controller");

router.get("/listAll", apiObservation.listAll);
router.get("/listOne/:id", apiObservation.listOne);
router.post("/add", apiObservation.add);
router.delete("/delete/:id", apiObservation.delete);
router.put("/update/:id", apiObservation.update);

module.exports = router;
