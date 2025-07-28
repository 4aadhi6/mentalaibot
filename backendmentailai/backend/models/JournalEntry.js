const mongoose = require("mongoose");

const JournalEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
  },
});

module.exports = mongoose.model("JournalEntry", JournalEntrySchema);
