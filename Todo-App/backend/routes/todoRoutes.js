const express = require('express');
const router = express.Router();

const {displayTasks, createTask, toggleTask, updateTask, deleteTask} = require('../controllers/todoController');

// display all tasks
router.get('/', displayTasks)

//create task
router.post('/', createTask);


// Toggle task completed status
router.patch('/:id', toggleTask);


// update todo OR rename task
router.put('/:id', updateTask);


// delete task
router.delete('/:id', deleteTask);

module.exports = router;