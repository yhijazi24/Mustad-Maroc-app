const ProductCard = require("../models/ProductCard");
const { verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router();

// Create ProductCard
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProductCard = new ProductCard(req.body); // Fixed: ProductCard instead of Header

    try {
        const savedProductCard = await newProductCard.save();
        res.status(200).json(savedProductCard);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update ProductCard
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProductCard = await ProductCard.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedProductCard);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get ProductCard by title
router.get("/", async (req, res) => {
    try {
        const productCard = await ProductCard.findOne({ type: req.query.type });
        res.status(200).json(productCard);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
