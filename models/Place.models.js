const mongoose = require("mongoose");

const placeSchema = mongoose.Schema({
  place: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 100,
  },
});

module.exports = mongoose.model("Place", placeSchema);
