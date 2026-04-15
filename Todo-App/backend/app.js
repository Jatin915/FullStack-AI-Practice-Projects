const express = require('express');
const app = express();
app.use(express.json());

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