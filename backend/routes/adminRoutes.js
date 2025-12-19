const express = require("express");
const {
  getCitizens,
  getPolice,
  getAllCrimes,
} = require("../controllers/adminController");

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/citizens", protect, allowRoles("admin"), getCitizens);
router.get("/police", protect, allowRoles("admin"), getPolice);
router.get("/crimes", protect, allowRoles("admin"), getAllCrimes);

module.exports = router;
