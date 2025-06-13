const express = require("express");
const CryptoJS = require("crypto-js");
const User = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const { Op, Sequelize } = require("sequelize");

const router = express.Router();

// UPDATE USER
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
  }

  try {
    await User.update(req.body, {
      where: { id: req.params.id }
    });

    const updatedUser = await User.findByPk(req.params.id);
    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("User UPDATE error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE USER
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "User not found" });

    res.status(200).json("User has been deleted...");
  } catch (err) {
    console.error("User DELETE error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET USER BY ID
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { password, ...others } = user.dataValues;
    res.status(200).json(others);
  } catch (err) {
    console.error("User GET by ID error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET ALL USERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;

  try {
    const users = query
      ? await User.findAll({
          order: [["createdAt", "DESC"]],
          limit: 5
        })
      : await User.findAll();

    res.status(200).json(users);
  } catch (err) {
    console.error("User GET all error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET USER STATS (Monthly Registrations)
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const lastYear = new Date();
  lastYear.setFullYear(lastYear.getFullYear() - 1);

  try {
    const stats = await User.findAll({
      attributes: [
        [Sequelize.fn("MONTH", Sequelize.col("createdAt")), "month"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "total"]
      ],
      where: {
        createdAt: {
          [Op.gte]: lastYear
        }
      },
      group: [Sequelize.fn("MONTH", Sequelize.col("createdAt"))]
    });

    res.status(200).json(stats);
  } catch (err) {
    console.error("User STATS error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
