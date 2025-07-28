const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserDetails,
  deleteUser,
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

router.get("/", protect, admin, getAllUsers);
router.get("/:email", protect, admin, getUserDetails);
router.delete("/:email", protect, admin, deleteUser);

module.exports = router;
