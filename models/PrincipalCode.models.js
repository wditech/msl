const mongoose = require("mongoose");

const principalCodeSchema = mongoose.Schema({
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
  codesGroups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CodesGroup",
    },
  ],
});

module.exports = mongoose.model("PrincipalCode", principalCodeSchema);
