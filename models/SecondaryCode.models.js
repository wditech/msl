const mongoose = require("mongoose");

const secondaryCodeSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 5,
  },
  description: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 100,
  },
  price: {
    type: Number,
    required: true,
  },
  jsonBetween: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("SecondaryCode", secondaryCodeSchema);
