const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const { Op, Sequelize } = require("sequelize");
const router = require("express").Router();

// CREATE
router.post("/", verifyToken, async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(200).json(newOrder);
  } catch (err) {
    console.error("Order POST error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.update(req.body, {
      where: { id: req.params.id }
    });

    const updatedOrder = await Order.findByPk(req.params.id);
    if (!updatedOrder) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(updatedOrder);
  } catch (err) {
    console.error("Order PUT error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const deleted = await Order.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Order not found" });

    res.status(200).json("Order has been deleted...");
  } catch (err) {
    console.error("Order DELETE error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { userId: req.params.userId } });
    res.status(200).json(orders);
  } catch (err) {
    console.error("Order GET user error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET ALL ORDERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (err) {
    console.error("Order GET all error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.findAll({
      attributes: [
        [Sequelize.fn('MONTH', Sequelize.col('createdAt')), 'month'],
        [Sequelize.fn('SUM', Sequelize.col('amount')), 'total']
      ],
      where: {
        createdAt: {
          [Op.gte]: previousMonth
        },
        ...(productId && {
          products: {
            [Op.contains]: [{ productId }]
          }
        })
      },
      group: ['month']
    });

    res.status(200).json(income);
  } catch (err) {
    console.error("Order INCOME error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
