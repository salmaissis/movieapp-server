const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const cloudinary = require('cloudinary').v2;

dotenv.config();

const User = require("../../models/User");
const { cloudinaryConfig } = require("../../config");

cloudinary.config(cloudinaryConfig);

const registerRoute = async (req, res)=>{
    const {photo, firstname, lastname, email, username, password} = req.body;

    try{
        if(await User.findOne({email: { $eq: email }})){
            return res.status(409).json({error: `User with email: ${email}, already exists`, ok: false});
        }
        if(await User.findOne({username: { $eq: username }})){
            return res.status(409).json({error: `User with username: ${username}, already exists`, ok: false});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const uploadResponse = await cloudinary.uploader.upload(photo, { folder: process.env.CLOUDINARY_FOLDER });
        const user = new User({photo: uploadResponse.secure_url, firstname, lastname, email, username, password: hashedPassword});
        user.save();
        return res.status(201).json({user: { uid: user._id, username: user.username }, message: 'User created successfully', ok: true});
    }
    catch(error){
        console.log(error);
        res.status(500).send();
    }
};

module.exports = registerRoute;