const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        desc: { type: Array, required: true },
        img: { type: String, required: true },
        website: { type: String, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('Brand', BrandSchema)