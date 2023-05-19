const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const path = require('path');
const DatauriParser=require("datauri/parser");
const parser = new DatauriParser();


const cloudinary = require('cloudinary').v2;

dotenv.config();

const User = require("../../models/User");
const { cloudinaryConfig } = require("../../config");

cloudinary.config(cloudinaryConfig);

const registerRoute = async (req, res)=>{
    // const {photo} = req.files;
    const {firstname, lastname, email, username, password} = req.body;
    // console.log(photo);
    console.log(req.body)

    try{
        if(await User.findOne({email: { $eq: email }})){
            return res.status(409).json({error: `User with email: ${email}, already exists`, ok: false});
        }
        if(await User.findOne({username: { $eq: username }})){
            return res.status(409).json({error: `User with username: ${username}, already exists`, ok: false});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // const extName = path.extname(photo.name).toString();
        // const file64 = parser.format(extName, photo.data);
        // const uploadResponse = await cloudinary.uploader.upload(file64.content, { folder: process.env.CLOUDINARY_FOLDER });
        // fs.unlink(photo.tempFilePat);
        const user = new User({firstname, lastname, email, username, password: hashedPassword});
        user.save();
        return res.status(201).json({user: { uid: user._id, username: user.username }, message: 'User created successfully', ok: true});
    }
    catch(error){
        console.log(error);
        res.status(500).send();
    }
};

module.exports = {registerRoute};