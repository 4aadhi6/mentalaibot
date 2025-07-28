const express = require("express");
const router = express.Router();
const {
  getJournalEntries,
  createJournalEntry,
  updateJournalSummary,
} = require("../controllers/journalController");
const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, getJournalEntries)
  .post(protect, createJournalEntry);
router.post("/:id/summary", protect, updateJournalSummary);

module.exports = router;
