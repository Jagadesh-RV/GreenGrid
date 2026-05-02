const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ✅ REGISTER
router.post("/register", async (req, res) => {
  try {
    console.log("REGISTER BODY:", req.body);

    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ message: "Phone and password required" });
    }

    // Check existing user
    const existing = await User.findOne({ phone });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      phone,
      password: hashed
    });

    await user.save();

    res.json({ message: "User registered successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ LOGIN
router.post("/login", async (req, res) => {
  try {
    console.log("LOGIN BODY:", req.body);

    const { phone, password } = req.body;

    if (!phone || !password) {
      console.log("❌ Missing fields");
      return res.status(400).json({ message: "Phone and password required" });
    }

    const user = await User.findOne({ phone });
    console.log("USER:", user);

    if (!user) {
      console.log("❌ User not found");
      return res.status(400).json({ message: "User not found" });
    }

    const valid = await bcrypt.compare(password, user.password);
    console.log("PASSWORD MATCH:", valid);

    if (!valid) {
      console.log("❌ Wrong password");
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id },
      "secret", // later move to .env
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        phone: user.phone
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;