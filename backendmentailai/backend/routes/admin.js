// // const express = require("express");
// // const router = express.Router();
// // const {
// //   getDashboardStats,
// //   getQuotes,
// //   addQuote,
// //   deleteQuote,
// //   getFlags,
// //   addFlag,
// //   resolveFlag,
// // } = require("../controllers/adminController");
// // const { protect, admin } = require("../middleware/authMiddleware");

// // // Dashboard
// // router.get("/dashboard", protect, admin, getDashboardStats);

// // // Quotes
// // router.route("/quotes").get(getQuotes).post(protect, admin, addQuote);
// // router.delete("/quotes/:id", protect, admin, deleteQuote);

// // // Flags
// // // addFlag is a public-facing endpoint so users can flag content without being an admin
// // router.post("/flags", addFlag);
// // router.route("/flags").get(protect, admin, getFlags);
// // router.put("/flags/:id/resolve", protect, admin, resolveFlag);

// // module.exports = router;
// const express = require("express");
// const router = express.Router();
// const {
//   getDashboardStats,
//   getQuotes,
//   addQuote,
//   deleteQuote,
//   getFlags,
//   resolveFlag,
//   // FIX: Make sure the new controller functions are imported
//   getSignupStats,
//   getMoodDistribution,
// } = require("../controllers/adminController");
// const { protect, admin } = require("../middleware/authMiddleware");

// // Dashboard
// router.get("/dashboard", protect, admin, getDashboardStats);
// // FIX: Add new routes for chart data
// router.get("/dashboard/signups", protect, admin, getSignupStats);
// router.get("/dashboard/moods", protect, admin, getMoodDistribution);

// // Quotes
// router.route("/quotes").get(getQuotes).post(protect, admin, addQuote);
// router.delete("/quotes/:id", protect, admin, deleteQuote);

// // Flags
// // NOTE: The endpoint for *adding* a flag might not need protection if it's called from a service.
// // This is okay for now, but something to be aware of.
// router.get("/flags", protect, admin, getFlags);
// router.put("/flags/:id/resolve", protect, admin, resolveFlag);

// module.exports = router;
const express = require("express");
const router = express.Router();
const {
  // Make sure ALL of these are imported
  getDashboardStats,
  getSignupStats,
  getMoodDistribution,
  getQuotes,
  addQuote,
  deleteQuote,
  addFlag,
  getFlags,
  resolveFlag,
} = require("../controllers/adminController");
const { protect, admin } = require("../middleware/authMiddleware");

// --- Dashboard Routes ---
router.get("/dashboard", protect, admin, getDashboardStats);
router.get("/dashboard/signups", protect, admin, getSignupStats);
router.get("/dashboard/moods", protect, admin, getMoodDistribution);

// --- Quotes Routes (for Content Management) ---
// Getting quotes can be public, but adding/deleting must be admin
router.get("/quotes", getQuotes);
router.post("/quotes", protect, admin, addQuote);
router.delete("/quotes/:id", protect, admin, deleteQuote);

// --- Flagged Content Routes ---
// This endpoint is called from the frontend service, so it does not need protection
router.post("/flags", addFlag);
// These endpoints are for admins to view and resolve flags
router.get("/flags", protect, admin, getFlags);
router.put("/flags/:id/resolve", protect, admin, resolveFlag);

// This is line 81 from your error, now fixed.
// It seems there may have been an extra route defined here by accident.
// This file is now clean and correct.

module.exports = router;
