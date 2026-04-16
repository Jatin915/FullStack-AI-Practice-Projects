const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

const connectDB = require('./config/db');
connectDB();

const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/tasks', todoRoutes);

app.use('/api/auth', authRoutes);

app.listen(3000, (err) => {
    if(err) throw err;
    else console.log("Server running on Port 3000");
})