const mongoose = require("mongoose");

const boreTypeSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 100,
  },
});

module.exports = mongoose.model("BoreType", boreTypeSchema);
