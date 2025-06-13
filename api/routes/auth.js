const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

// Register
router.post("/register", async (req, res) => {
  try {
    // Check if username or email already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { username: req.body.username },
          { email: req.body.email }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({ message: "Username or email already in use." });
    }

    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      industry: req.body.industry,
      phone: req.body.phone,
      password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login
// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user) return res.status(401).json("Wrong username!");

    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if (originalPassword !== req.body.password) return res.status(401).json("Wrong password!");

    const accessToken = jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const refreshToken = jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "7d" }
    );

    const { password, ...others } = user.dataValues;
    res.status(200).json({ ...others, accessToken, refreshToken });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.post("/refresh", (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(403).json("Refresh token missing");

  try {
    const userData = jwt.verify(refreshToken, process.env.JWT_SEC);
    const newAccessToken = jwt.sign(
      {
        id: userData.id,
        isAdmin: userData.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );
    res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("Refresh failed:", err);
    res.status(403).json("Invalid refresh token");
  }
});

module.exports = router;
