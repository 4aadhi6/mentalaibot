// const User = require("../models/User");
// const JournalEntry = require("../models/JournalEntry");
// const ChatMessage = require("../models/ChatMessage");
// const MoodLog = require("../models/MoodLog");

// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find({}).select("-password");
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// exports.getUserDetails = async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.params.email }).select(
//       "-password"
//     );
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const journalEntries = await JournalEntry.find({ userId: user._id }).sort({
//       date: -1,
//     });
//     const chatMessages = await ChatMessage.find({ userId: user._id }).sort({
//       timestamp: 1,
//     });
//     const moodLogs = await MoodLog.find({ userId: user._id }).sort({ date: 1 });

//     res.json({
//       user,
//       journalEntries,
//       chatMessages,
//       moodLogs,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// exports.deleteUser = async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.params.email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Delete all associated data
//     await JournalEntry.deleteMany({ userId: user._id });
//     await ChatMessage.deleteMany({ userId: user._id });
//     await MoodLog.deleteMany({ userId: user._id });

//     // Delete the user
//     await user.remove();

//     res.json({ message: "User and all associated data removed" });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };
const User = require("../models/User");
const JournalEntry = require("../models/JournalEntry");
const ChatMessage = require("../models/ChatMessage");
const MoodLog = require("../models/MoodLog");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select(
      "-password"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const journalEntries = await JournalEntry.find({ userId: user._id }).sort({
      date: -1,
    });
    const chatMessages = await ChatMessage.find({ userId: user._id }).sort({
      timestamp: 1,
    });
    const moodLogs = await MoodLog.find({ userId: user._id }).sort({ date: 1 });

    res.json({
      user,
      journalEntries,
      chatMessages,
      moodLogs,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete all associated data
    await JournalEntry.deleteMany({ userId: user._id });
    await ChatMessage.deleteMany({ userId: user._id });
    await MoodLog.deleteMany({ userId: user._id });

    // FIX: Replaced deprecated .remove() with .findByIdAndDelete()
    await User.findByIdAndDelete(user._id);

    res.json({ message: "User and all associated data removed" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
