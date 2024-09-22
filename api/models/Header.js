const mongoose = require("mongoose");

const HeaderSchema = new mongoose.Schema(
    {
        type: {type: String, required: true, unique: true},
        title: {type: String,required: true, unique: true},
        img: {type: String,required: true},
    },
    { timestamps: true },
)

module.exports = mongoose.model('Header', HeaderSchema)