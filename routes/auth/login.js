const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();

const User = require("../../models/User");

export const loginRoute = async (req, res)=>{
    const {emailorusername, password} = req.body;
    
    try{

        const user = await User.findOne({$or: [{username: { $eq: emailorusername } }, {email: { $eq: emailorusername } }]});        
        if(!user || !await bcrypt.compare(password, user.password)){ 
            return res.status(401).json({error: 'Invalid password or Email|Username', ok: false});
        }
 
        return res.status(200).json({user: { uid: user._id, username: user.username }, message: 'Login successful', ok: true});
    }
    catch(error){
        console.log(error);
        res.status(500).send();
    }
};

module.exports = loginRoute;