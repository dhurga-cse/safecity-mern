const express = require("express");
const {
  addCrime,
  getAllCrimes,
  getMyCrimes,
  updateCrimeStatus,
} = require("../controllers/crimeController");
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Citizen routes
router.post("/", protect, allowRoles("citizen"), addCrime);
router.get("/my", protect, allowRoles("citizen"), getMyCrimes);

// Police/Admin routes
router.get("/", protect, allowRoles("police", "admin"), getAllCrimes);
router.put("/:id/status", protect, allowRoles("police", "admin"), updateCrimeStatus);

module.exports = router;
