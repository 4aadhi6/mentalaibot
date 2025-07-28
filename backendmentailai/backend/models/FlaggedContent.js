const mongoose = require("mongoose");

const FlaggedContentSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Journal", "Chat"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  resolved: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("FlaggedContent", FlaggedContentSchema);
