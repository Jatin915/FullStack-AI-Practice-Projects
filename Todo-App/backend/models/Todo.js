const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/todoFullstack`);

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    completed: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Todo", todoSchema);