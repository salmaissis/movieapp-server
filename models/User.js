const mongoose = require("mongoose");

const User = new mongoose.Schema({
    // photo: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user", required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', User);