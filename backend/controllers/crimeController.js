const Crime = require("../models/Crime");

// Add crime report (Citizen)
exports.addCrime = async (req, res) => {
  try {
    const crime = await Crime.create({
      crimeType: req.body.crimeType,
      description: req.body.description,
      location: req.body.location,
      date: req.body.date,
      user: req.user._id,   // ⭐ IMPORTANT LINE
    });

    res.status(201).json({
      message: "Crime reported successfully",
      crime,
    });
  } catch (error) {
    console.error("Add Crime Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Get my crimes (Citizen)
exports.getMyCrimes = async (req, res) => {
  try {
    const crimes = await Crime.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(crimes);
  } catch (error) {
    console.error("Get My Crimes Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all crimes (Police/Admin)
exports.getAllCrimes = async (req, res) => {
  try {
    const crimes = await Crime.find().populate("user", "email role");
    res.json(crimes);
  } catch (error) {
    console.error("Get All Crimes Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update crime status
exports.updateCrimeStatus = async (req, res) => {
  try {
    const crime = await Crime.findById(req.params.id);
    if (!crime) return res.status(404).json({ message: "Crime not found" });

    crime.status = req.body.status;
    await crime.save();

    res.json({ message: "Status updated", crime });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
