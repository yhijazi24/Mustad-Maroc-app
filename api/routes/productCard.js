const ProductCard = require("../models/ProductCard");
const { verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router();

// CREATE ProductCard
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const allowedTypes = ["horseshoes", "rasps", "tools", "care", "nails"];

    // Check type validity
    if (!allowedTypes.includes(req.body.type)) {
      return res.status(400).json({ message: "Invalid type" });
    }

    // Check if type already exists
    const existing = await ProductCard.findOne({ where: { type: req.body.type } });
    if (existing) {
      return res.status(400).json({ message: "Type already exists" });
    }

    // Check count limit
    const count = await ProductCard.count();
    if (count >= 5) {
      return res.status(400).json({ message: "Maximum of 5 product cards reached" });
    }

    const newProductCard = await ProductCard.create(req.body);
    res.status(200).json(newProductCard);
  } catch (err) {
    console.error("ProductCard POST error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


// UPDATE ProductCard
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await ProductCard.update(req.body, {
      where: { id: req.params.id }
    });

    const updatedProductCard = await ProductCard.findByPk(req.params.id);
    if (!updatedProductCard) return res.status(404).json({ message: "ProductCard not found" });

    res.status(200).json(updatedProductCard);
  } catch (err) {
    console.error("ProductCard PUT error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET ProductCard by Type
router.get("/:type", async (req, res) => {
  try {
    const productCard = await ProductCard.findOne({ where: { type: req.params.type } });
    if (!productCard) return res.status(404).json({ message: "ProductCard not found" });

    res.status(200).json(productCard);
  } catch (err) {
    console.error("ProductCard GET by type error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET All ProductCards
router.get("/", async (req, res) => {
  try {
    const productCards = await ProductCard.findAll();

    const order = ["horseshoes", "rasps", "tools", "care", "nails"];

    const sorted = productCards.sort((a, b) => {
      return order.indexOf(a.type) - order.indexOf(b.type);
    });

    res.status(200).json(sorted);
  } catch (err) {
    console.error("ProductCard GET all error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE ProductCard by ID
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const deletedCount = await ProductCard.destroy({
      where: { id: req.params.id }
    });

    if (deletedCount === 0) {
      return res.status(404).json({ message: "ProductCard not found" });
    }

    res.status(200).json({ message: "ProductCard deleted successfully" });
  } catch (err) {
    console.error("ProductCard DELETE error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
