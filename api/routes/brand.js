const Brand = require("../models/Brand");
const { verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router();
const { Op } = require("sequelize");

// CREATE or UPSERT
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const existingBrand = await Brand.findOne({ where: { title: req.body.title } });

    if (existingBrand) {
      return res.status(400).json({ message: "Brand with this title already exists" });
    }

    const newBrand = await Brand.create(req.body);
    return res.status(201).json(newBrand);
  } catch (err) {
    console.error("Brand POST error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


// UPDATE by ID
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Brand.update(req.body, {
      where: { id: req.params.id }
    });

    const updated = await Brand.findByPk(req.params.id);
    if (!updated) return res.status(404).json({ message: "Brand not found" });

    res.status(200).json(updated);
  } catch (err) {
    console.error("Brand PUT error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE by ID
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const deleted = await Brand.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) return res.status(404).json({ message: "Brand not found" });
    res.status(200).json({ message: "Brand deleted successfully" });
  } catch (err) {
    console.error("Brand DELETE error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET ALL BRANDS
router.get("/", async (req, res) => {
  try {
    const brands = await Brand.findAll();
    res.status(200).json(brands);
  } catch (err) {
    console.error("Brand GET error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET Brand by ID
router.get("/:id", async (req, res) => {
  try {
    const brand = await Brand.findByPk(req.params.id);
    if (!brand) return res.status(404).json({ message: "Brand not found" });

    res.status(200).json(brand);
  } catch (err) {
    console.error("Brand GET by ID error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
