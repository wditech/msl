const mongoose = require("mongoose");

const codeGroupSchema = mongoose.Schema({
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
  secondaryCodes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SecondaryCode",
    },
  ],
  jsonVar: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("CodesGroup", codeGroupSchema);
