const mongoose = require("mongoose");

const crimeSchema = new mongoose.Schema(
  {
    crimeType: String,
    description: String,
    location: String,
    date: Date,
    status: {
      type: String,
      default: "pending",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // MUST be "User"
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Crime", crimeSchema);
