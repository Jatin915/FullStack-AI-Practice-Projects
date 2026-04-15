const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },

    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: true
    },

    password: {
        type: String,
        minlength: 6,
        required: true
    },
},{timestamps: true})

module.exports = mongoose.model("User", userSchema);