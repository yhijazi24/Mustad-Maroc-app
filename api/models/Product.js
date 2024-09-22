const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        type: {type: String, required: true},
        title: {type: String,required: true, unique: true},
        desc: {type: String,required: true},
        availability: {type: String},
        img: {type: Array,required: true},
        fullDesc: {type: String,required: true},
        price: {type: String, required: true},
        size: {type: Array, required: true},
        wheather: {type: Array,required: true},
        terrain: {type: Array,required: true},
        activity: {type: Array,required: true},
    },
    { timestamps: true },
)

module.exports = mongoose.model('Product', ProductSchema)