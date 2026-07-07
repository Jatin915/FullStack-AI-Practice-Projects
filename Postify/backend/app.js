const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const profileRoutes = require("./routes/profileRoutes");
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config();
connectDB();

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true
    })
);


app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (req, res) => {
    res.status(200).json({ message: "Postify API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/profile", profileRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, (err) => {
    console.log(`Server started on PORT : ${PORT}`)
});