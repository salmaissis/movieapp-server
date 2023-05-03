const mongoose = require("mongoose");

const Wishlist = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    list: { type: Array, required: true, default: []}
}, {
    timestamps: true
});

module.exports = mongoose.model('Wishlist', Wishlist);