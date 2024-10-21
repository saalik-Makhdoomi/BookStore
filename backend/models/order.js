const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    book: {
        type: mongoose.Types.ObjectId,
        ref: "books",
    },
    status:{
        type: String,
        default: "Order Placed",
        enum: ["Order Placed", "Out for delivery", "Delivered", Cancelled],
    },
}, { timestamps: true});

module.exports = mongoose.model("order", orderSchema);