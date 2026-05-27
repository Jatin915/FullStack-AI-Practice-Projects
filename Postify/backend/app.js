const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');
dotenv.config();
connectDB();


const PORT = process.env.PORT || 4000;
app.listen(PORT, (err) => {
    console.log(`Server started on PORT : ${PORT}`)
});