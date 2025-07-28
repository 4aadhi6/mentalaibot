const mongoose = require("mongoose");

const MoodLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // Storing date as a string YYYY-MM-DD for easy lookups
  date: {
    type: String,
    required: true,
  },
  mood: {
    type: Number,
    enum: [1, 2, 3, 4, 5], // Awful, Bad, Okay, Good, Great
    required: true,
  },
});
// Ensure a user can only have one mood log per day
MoodLogSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("MoodLog", MoodLogSchema);
