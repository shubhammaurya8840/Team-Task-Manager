const express = require("express");
const router = express.Router();

const User = require("../models/User");

// ✅ Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find(); // 🔥 पूरा data (role सहित)
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
