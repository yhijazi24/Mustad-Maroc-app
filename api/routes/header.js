const Header = require("../models/Header");
const { verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router();

// CREATE Header
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const newHeader = await Header.create(req.body);
    res.status(200).json(newHeader);
  } catch (err) {
    console.error("Header POST error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// UPDATE Header
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Header.update(req.body, {
      where: { id: req.params.id }
    });

    const updatedHeader = await Header.findByPk(req.params.id);
    if (!updatedHeader) return res.status(404).json({ message: "Header not found" });

    res.status(200).json(updatedHeader);
  } catch (err) {
    console.error("Header PUT error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET Header by type
router.get("/type/:type", async (req, res) => {
  try {
    const header = await Header.findOne({ where: { type: req.params.type } });
    if (!header) return res.status(404).json({ message: "Header not found" });

    res.status(200).json(header);
  } catch (err) {
    console.error("Header GET by type error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET All Headers
router.get("/", async (req, res) => {
  try {
    const headers = await Header.findAll();
    res.status(200).json(headers);
  } catch (err) {
    console.error("Header GET all error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE Header by ID
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const deletedCount = await Header.destroy({
      where: { id: req.params.id }
    });

    if (deletedCount === 0) {
      return res.status(404).json({ message: "Header not found" });
    }

    res.status(200).json({ message: "Header deleted successfully" });
  } catch (err) {
    console.error("Header DELETE error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
