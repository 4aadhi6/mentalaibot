const MoodLog = require("../models/MoodLog");

exports.getMoodLogs = async (req, res) => {
  try {
    const logs = await MoodLog.find({ userId: req.user._id }).sort({ date: 1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.logMood = async (req, res) => {
  const { date, mood } = req.body; // date is 'YYYY-MM-DD'
  try {
    // Use `findOneAndUpdate` with `upsert` to create or update the log for the given day
    const updatedLog = await MoodLog.findOneAndUpdate(
      { userId: req.user._id, date: date },
      { mood: mood },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(201).json(updatedLog);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
