const mongoose = require("mongoose");
const User = require("../models/User");

const user = mongoose.model('User', User);
const getUsers = (req,res) => {
    user.find({}, (err, contact) => {
    if (err) {
        res.send(err);
    }
        res.json(contact);
    });
};

module.exports = getUsers;