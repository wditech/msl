const mongoose = require("mongoose");

const observationSchema = mongoose.Schema({
  observation: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
  },
  places: {
    type: Boolean,
    required: false,
  },
});

module.exports = mongoose.model("Observation", observationSchema);
