const todoModel = require('../models/Todo');

const displayTasks = async(req,res) => {
    try {
        let tasks = await todoModel.find({userId: req.userId});
        res.send(tasks);
    } catch(err) {
        throw new Error(err.message);
    }
}

    
const createTask = async(req,res) => {
    try {
        const {title} = req.body;
        if(!title) return res.status(501).json({message: "Task cannot be empty!"});
    
        let newTask = await todoModel.create({
            title,
            userId: req.userId
        });
    
        res.send({
            message: "Task created",
            task: newTask
        })
    } catch(err){
        res.status(500).json({
            message: "Error creating new task!",
            error: err.message
        })
    }
}


const toggleTask = async (req, res) => {
    try {
        const id = req.params.id;
        let task = await todoModel.findById(id);

        if (!task) return res.status(404).json({message: "Task not found!"})

        task.completed = !task.completed;
        await task.save();

        res.json({
            message: "Status updated",
            task
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating status",
            error: error.message
        });
    }
}


const updateTask = async(req,res) => {
    try {
        const id = req.params.id;
        const newTitle = req.body.title;
    
        if(!newTitle) return res.json({message: "No title provided!"});
    
        let task = await todoModel.findOneAndUpdate({_id: id}, {title: newTitle}, {"document": "after"});
        
        if(!task) return res.status(404).json({
            message: "Task not found!"
        })

        let renamedTask = await todoModel.findById(id);
        res.send({
            message: "Task renamed",
            task: renamedTask
        })
    } catch(err) {
        res.status(500).json({
            message: "Error rename task",
            error: err.message
        })
    }
}


const deleteTask = async(req,res) => {
    try {
        const id = req.params.id;

        let deletedTask = await todoModel.findByIdAndDelete(id);

        if(!deletedTask) return res.status(404).json({message: "task not found!"})

        res.send({
            message: "Task deleted successfully",
            deletedTask
        })

    } catch(err) {
        res.status(500).json({
            message: "error deleting task",
            error: err.message
        })
    }
}


module.exports = {displayTasks, createTask, toggleTask, updateTask, deleteTask};