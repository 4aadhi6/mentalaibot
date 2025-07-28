const express = require("express");
const router = express.Router();
const { getMoodLogs, logMood } = require("../controllers/moodController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getMoodLogs).post(protect, logMood);

module.exports = router;
