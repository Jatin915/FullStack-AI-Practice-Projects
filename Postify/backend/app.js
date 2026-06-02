const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const cookieParser = require('cookie-parser');

dotenv.config();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, (err) => {
    console.log(`Server started on PORT : ${PORT}`)
});