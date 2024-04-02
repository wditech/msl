const mongoose = require("mongoose");

const anotherJobSchema = mongoose.Schema({
  idSecondaryCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SecondaryCode",
  },
  jsonValues: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("AnotherCodesJob", anotherJobSchema);
