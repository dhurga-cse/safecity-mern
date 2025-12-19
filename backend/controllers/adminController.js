const User = require("../models/User");
const Crime = require("../models/Crime");

// Get all citizens
exports.getCitizens = async (req, res) => {
  try {
    const citizens = await User.find({ role: "citizen" }).select("-password");
    res.json(citizens);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all police
exports.getPolice = async (req, res) => {
  try {
    const police = await User.find({ role: "police" }).select("-password");
    res.json(police);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all crimes
exports.getAllCrimes = async (req, res) => {
  try {
    const crimes = await Crime.find().populate("user", "name email role");
    res.json(crimes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
