const JournalEntry = require("../models/JournalEntry");

exports.getJournalEntries = async (req, res) => {
  try {
    const entries = await JournalEntry.find({ userId: req.user._id }).sort({
      date: -1,
    });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createJournalEntry = async (req, res) => {
  const { content } = req.body;
  try {
    const newEntry = new JournalEntry({
      content,
      userId: req.user._id,
    });
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateJournalSummary = async (req, res) => {
  const { summary } = req.body;
  try {
    const entry = await JournalEntry.findById(req.params.id);

    // Ensure the entry belongs to the user
    if (entry.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    entry.summary = summary;
    const updatedEntry = await entry.save();
    res.json(updatedEntry);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
