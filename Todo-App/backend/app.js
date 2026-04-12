const express = require('express');
const app = express();
app.use(express.json());

const connectDB = require('./config/db');
connectDB();

const todoRoutes = require('./routes/todoRoutes');

app.use('/api/tasks', todoRoutes);

app.listen(3000, (err) => {
    if(err) throw err;
    console.log("Server running on Port 3000");
})