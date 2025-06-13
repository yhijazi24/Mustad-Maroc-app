const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router();

// CREATE Cart
router.post("/", verifyToken, async (req, res) => {
  try {
    const newCart = await Cart.create(req.body);
    res.status(200).json(newCart);
  } catch (err) {
    console.error("Cart POST error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// UPDATE Cart
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.update(req.body, {
      where: { id: req.params.id }
    });

    const updatedCart = await Cart.findByPk(req.params.id);
    if (!updatedCart) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json(updatedCart);
  } catch (err) {
    console.error("Cart PUT error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE Cart
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const deleted = await Cart.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    console.error("Cart DELETE error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET User Cart by userId
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ where: { userId: req.params.userId } });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json(cart);
  } catch (err) {
    console.error("Cart GET user error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET All Carts (Admin only)
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.findAll();
    res.status(200).json(carts);
  } catch (err) {
    console.error("Cart GET all error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
