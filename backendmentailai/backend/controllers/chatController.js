const ChatMessage = require("../models/ChatMessage");

exports.getChatHistory = async (req, res) => {
  try {
    const messages = await ChatMessage.find({ userId: req.user._id }).sort({
      timestamp: 1,
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.saveChatMessages = async (req, res) => {
  const { messages } = req.body; // Expecting an array of messages to save
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({
      message: "Invalid data format. Expecting an array of messages.",
    });
  }

  try {
    // We only save the last two messages (user and model response)
    const messagesToSave = messages.slice(-2).map((msg) => ({
      ...msg,
      userId: req.user._id,
    }));

    await ChatMessage.insertMany(messagesToSave);
    res.status(201).json({ message: "Chat saved" });
  } catch (error) {
    console.error("Error saving chat:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
