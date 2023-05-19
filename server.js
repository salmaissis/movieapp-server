const express = require("express");
const cors = require('cors');
const fileupload = require("express-fileupload");

const dotenv = require('dotenv');
const mongoConnect = require("./config/database");
const { loginRoute } = require("./routes/auth/login");
const {registerRoute} = require("./routes/auth/register");
const getUsers = require("./controllers/userController");

dotenv.config();

const server = express();
const PORT = 7000;

// middlewares
server.use(cors());
server.use(express.json())
server.use(express.urlencoded({extended: true}));
server.use(fileupload());

server.listen(PORT, ()=> console.log("=> Server is running on port", PORT));
mongoConnect(process.env.DATABASE_URL, process.env.DATABASE_NAME);

// endpoints
server.post('/login', loginRoute);
server.post('/register', registerRoute);
server.post('/users', getUsers);