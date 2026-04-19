const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv");

dotenv.config();

app.use(express.json());
app.use(cookieParser());

const connectDB = require('./config/db');
connectDB();

const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/tasks', todoRoutes);

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
    if(err) throw err;
    else console.log(`Server running on Port ${PORT}`);
})