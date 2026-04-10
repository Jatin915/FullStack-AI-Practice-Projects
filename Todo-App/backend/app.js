const express = require('express');
const app = express();

app.get('/', (req,res) => {
    res.send("Welcome to Todo Application!");
})

app.listen(3000, (err) => {
    if(err) throw err;
    console.log("Server running on Port 3000");
})