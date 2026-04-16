const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {displayTasks, createTask, toggleTask, updateTask, deleteTask} = require('../controllers/todoController');

// display all tasks
router.get('/', authMiddleware, displayTasks)

//create task
router.post('/', authMiddleware, createTask);


// Toggle task completed status
router.patch('/:id', authMiddleware, toggleTask);


// update todo OR rename task
router.put('/:id', authMiddleware, updateTask);


// delete task
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;