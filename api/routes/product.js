const Product = require("../models/Product");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const { Op } = require("sequelize");
const router = require("express").Router();

// CREATE Product
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(200).json(newProduct);
  } catch (err) {
    console.error("Product POST error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// UPDATE Product
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Product.update(req.body, {
      where: { id: req.params.id }
    });

    const updatedProduct = await Product.findByPk(req.params.id);
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error("Product PUT error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE Product
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const deleted = await Product.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Product not found" });

    res.status(200).json("Product has been deleted...");
  } catch (err) {
    console.error("Product DELETE error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET Product by ID
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (err) {
    console.error("Product GET by ID error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET Products by Type
router.get("/:type", async (req, res) => {
  try {
    const products = await Product.findAll({ where: { type: req.params.type } });
    res.status(200).json(products);
  } catch (err) {
    console.error("Product GET by type error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET All or Filtered Products
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.type;

  try {
    let products;

    if (qNew) {
      products = await Product.findAll({
        order: [["createdAt", "DESC"]],
        limit: 1
      });
    } else if (qCategory) {
      products = await Product.findAll({
        where: {
          type: {
            [Op.in]: [qCategory]
          }
        }
      });
    } else {
      products = await Product.findAll();
    }

    res.status(200).json(products);
  } catch (err) {
    console.error("Product GET all error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
