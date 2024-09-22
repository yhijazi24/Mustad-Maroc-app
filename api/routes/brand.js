const Brand = require("../models/Brand");
const { verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

router.post("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const existingBrand = await Brand.findOne({});
        
        if (existingBrand) {
            const updatedBrand = await Brand.findByIdAndUpdate(existingBrand._id, {
                $set: req.body,
            }, { new: true });
            return res.status(200).json(updatedBrand);
        } else {
            const newBrand = new Brand(req.body);
            const savedBrand = await newBrand.save();
            return res.status(200).json(savedBrand);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
