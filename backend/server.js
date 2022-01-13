const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require('path');
const fileUpload = require("express-fileupload");
const connectDB = require('./config/dbconnection');
const cloudinary = require('cloudinary')

const app = express();

app.use(cors({
    origin: true,
    credentials: true,
}));

//load config
dotenv.config({path: 'backend/config/config.env'});
const PORT = process.env.PORT || 8080

//mongodb connection
connectDB();

// Setting up cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


// Bodyparser <middleware></middleware>
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload({
    createParentPath: true
}))


app.listen(
    PORT,
    console.log(
        `Server running on port https://localhost:${PORT}`
    )
)

app.use('/', require('./routes/router'));


