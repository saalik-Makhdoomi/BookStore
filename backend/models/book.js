const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    url: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("books", bookSchema);