const mongoose = require("mongoose");

const jobsObservationSchema = mongoose.Schema({
  idObservation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Observation",
  },
  idPlace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Place",
  },
});

module.exports = mongoose.model("JobsObservation", jobsObservationSchema);
