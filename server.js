const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');
const mongoConnect = require("./config/database");

dotenv.config();

const server = express();
const PORT = 7000;

// middlewares
server.use(cors());
server.use(express.json())
server.use(express.urlencoded({extended: false}));

server.listen(PORT, ()=> console.log("=> Server is running on port", PORT));
mongoConnect(process.env.DATABASE_URL, process.env.DATABASE_NAME);

