const express = require("express");
const router = express.Router();
const {
  getChatHistory,
  saveChatMessages,
} = require("../controllers/chatController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getChatHistory).post(protect, saveChatMessages);

module.exports = router;
