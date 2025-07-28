// // const User = require("../models/User");
// // const JournalEntry = require("../models/JournalEntry");
// // const FlaggedContent = require("../models/FlaggedContent");
// // const Quote = require("../models/Quote");

// // // Dashboard
// // exports.getDashboardStats = async (req, res) => {
// //   try {
// //     const userCount = await User.countDocuments();
// //     const journalCount = await JournalEntry.countDocuments();
// //     const flaggedCount = await FlaggedContent.countDocuments({
// //       resolved: false,
// //     });

// //     // Mood Distribution (more complex, simplified for now)
// //     // This requires a more complex aggregation pipeline to get only the latest mood per user.
// //     // For simplicity, we'll just send the counts for now.

// //     res.json({
// //       userCount,
// //       journalCount,
// //       flaggedCount,
// //     });
// //   } catch (error) {
// //     res.status(500).json({ message: "Server Error" });
// //   }
// // };

// // // Quotes
// // exports.getQuotes = async (req, res) => {
// //   try {
// //     const quotes = await Quote.find({});
// //     res.json(quotes);
// //   } catch (error) {
// //     res.status(500).json({ message: "Server Error" });
// //   }
// // };

// // exports.addQuote = async (req, res) => {
// //   const { text } = req.body;
// //   try {
// //     const newQuote = new Quote({ text });
// //     const savedQuote = await newQuote.save();
// //     res.status(201).json(savedQuote);
// //   } catch (error) {
// //     res.status(500).json({ message: "Server Error" });
// //   }
// // };

// // exports.deleteQuote = async (req, res) => {
// //   try {
// //     await Quote.findByIdAndDelete(req.params.id);
// //     res.json({ message: "Quote deleted" });
// //   } catch (error) {
// //     res.status(500).json({ message: "Server Error" });
// //   }
// // };

// // // Flagged Content
// // exports.getFlags = async (req, res) => {
// //   try {
// //     const flags = await FlaggedContent.find({ resolved: false }).sort({
// //       date: -1,
// //     });
// //     res.json(flags);
// //   } catch (error) {
// //     res.status(500).json({ message: "Server Error" });
// //   }
// // };

// // exports.addFlag = async (req, res) => {
// //   const { text, userEmail, type } = req.body;
// //   try {
// //     const newFlag = new FlaggedContent({ content: text, userEmail, type });
// //     await newFlag.save();
// //     res.status(201).json({ message: "Content flagged successfully" });
// //   } catch (error) {
// //     res.status(500).json({ message: "Server Error" });
// //   }
// // };

// // exports.resolveFlag = async (req, res) => {
// //   try {
// //     const flag = await FlaggedContent.findById(req.params.id);
// //     if (flag) {
// //       flag.resolved = true;
// //       await flag.save();
// //       res.json({ message: "Flag resolved" });
// //     } else {
// //       res.status(404).json({ message: "Flag not found" });
// //     }
// //   } catch (error) {
// //     res.status(500).json({ message: "Server Error" });
// //   }
// // };
// const User = require("../models/User");
// const JournalEntry = require("../models/JournalEntry");
// const FlaggedContent = require("../models/FlaggedContent");
// const Quote = require("../models/Quote");
// const MoodLog = require("../models/MoodLog"); // Make sure this is imported

// // Dashboard Stats
// exports.getDashboardStats = async (req, res) => {
//   try {
//     const userCount = await User.countDocuments();
//     const journalCount = await JournalEntry.countDocuments();
//     const flaggedCount = await FlaggedContent.countDocuments({
//       resolved: false,
//     });
//     res.json({ userCount, journalCount, flaggedCount });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // Quotes
// exports.getQuotes = async (req, res) => {
//   try {
//     const quotes = await Quote.find({});
//     res.json(quotes);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// exports.addQuote = async (req, res) => {
//   const { text } = req.body;
//   try {
//     const newQuote = new Quote({ text });
//     const savedQuote = await newQuote.save();
//     res.status(201).json(savedQuote);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// exports.deleteQuote = async (req, res) => {
//   try {
//     await Quote.findByIdAndDelete(req.params.id);
//     res.json({ message: "Quote deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // Flagged Content
// exports.getFlags = async (req, res) => {
//   try {
//     const flags = await FlaggedContent.find({ resolved: false }).sort({
//       date: -1,
//     });
//     res.json(flags);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// exports.resolveFlag = async (req, res) => {
//   try {
//     const flag = await FlaggedContent.findById(req.params.id);
//     if (flag) {
//       flag.resolved = true;
//       await flag.save();
//       res.json({ message: "Flag resolved" });
//     } else {
//       res.status(404).json({ message: "Flag not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // --- FIX: ADDED MISSING FUNCTIONS ---

// // New function for signup statistics
// exports.getSignupStats = async (req, res) => {
//   try {
//     const sevenDaysAgo = new Date();
//     sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

//     const data = await User.aggregate([
//       { $match: { signupDate: { $gte: sevenDaysAgo } } },
//       {
//         $group: {
//           _id: { $dateToString: { format: "%Y-%m-%d", date: "$signupDate" } },
//           count: { $sum: 1 },
//         },
//       },
//       { $sort: { _id: 1 } },
//       { $project: { name: "$_id", signups: "$count", _id: 0 } },
//     ]);
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // New function for mood distribution
// exports.getMoodDistribution = async (req, res) => {
//   try {
//     const data = await MoodLog.aggregate([
//       { $sort: { date: -1 } },
//       { $group: { _id: "$userId", latestMood: { $first: "$mood" } } },
//       { $group: { _id: "$latestMood", count: { $sum: 1 } } },
//       {
//         $project: {
//           _id: 0,
//           name: {
//             $switch: {
//               branches: [
//                 { case: { $eq: ["$_id", 1] }, then: "Awful" },
//                 { case: { $eq: ["$_id", 2] }, then: "Bad" },
//                 { case: { $eq: ["$_id", 3] }, then: "Okay" },
//                 { case: { $eq: ["$_id", 4] }, then: "Good" },
//                 { case: { $eq: ["$_id", 5] }, then: "Great" },
//               ],
//               default: "Unknown",
//             },
//           },
//           value: "$count",
//         },
//       },
//     ]);
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };
const User = require("../models/User");
const JournalEntry = require("../models/JournalEntry");
const FlaggedContent = require("../models/FlaggedContent");
const Quote = require("../models/Quote");
const MoodLog = require("../models/MoodLog");

// --- DASHBOARD ---
exports.getDashboardStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const journalCount = await JournalEntry.countDocuments();
    const flaggedCount = await FlaggedContent.countDocuments({
      resolved: false,
    });
    res.json({ userCount, journalCount, flaggedCount });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getSignupStats = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const data = await User.aggregate([
      { $match: { signupDate: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$signupDate" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      { $project: { name: "$_id", signups: "$count", _id: 0 } },
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getMoodDistribution = async (req, res) => {
  try {
    const data = await MoodLog.aggregate([
      { $sort: { date: -1 } },
      { $group: { _id: "$userId", latestMood: { $first: "$mood" } } },
      { $group: { _id: "$latestMood", count: { $sum: 1 } } },
      {
        $project: {
          _id: 0,
          name: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", 1] }, then: "Awful" },
                { case: { $eq: ["$_id", 2] }, then: "Bad" },
                { case: { $eq: ["$_id", 3] }, then: "Okay" },
                { case: { $eq: ["$_id", 4] }, then: "Good" },
                { case: { $eq: ["$_id", 5] }, then: "Great" },
              ],
              default: "Unknown",
            },
          },
          value: "$count",
        },
      },
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// --- QUOTES ---
exports.getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find({});
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.addQuote = async (req, res) => {
  try {
    const { text } = req.body;
    const newQuote = new Quote({ text });
    await newQuote.save();
    res.status(201).json(newQuote);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteQuote = async (req, res) => {
  try {
    await Quote.findByIdAndDelete(req.params.id);
    res.json({ message: "Quote deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// --- FLAGGED CONTENT ---
exports.addFlag = async (req, res) => {
  try {
    const { text, userEmail, type } = req.body;
    const newFlag = new FlaggedContent({ content: text, userEmail, type });
    await newFlag.save();
    res.status(201).json({ message: "Content flagged successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getFlags = async (req, res) => {
  try {
    const flags = await FlaggedContent.find({ resolved: false }).sort({
      date: -1,
    });
    res.json(flags);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.resolveFlag = async (req, res) => {
  try {
    const flag = await FlaggedContent.findById(req.params.id);
    if (!flag) return res.status(404).json({ message: "Flag not found" });
    flag.resolved = true;
    await flag.save();
    res.json({ message: "Flag resolved" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
