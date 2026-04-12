const express = require('express');
const app = express();
app.use(express.json());

const todoModel = require('./models/Todo');

// display all todos
app.get('/api/tasks', async(req,res) => {
    let tasks = await todoModel.find();
    res.send(tasks);
})

//create a todo
app.post('/api/tasks', async(req,res) => {
    try {
        const { title } = req.body;
        if(!title) return res.status(501).json({message: "Task cannot be empty!"});
    
        let newTask = await todoModel.create({
            title
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
});


// Toggle task completed status
app.patch('/api/tasks/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Step 1: Find task first
        let task = await todoModel.findById(id);

        if (!task) return res.status(404).json({message: "Task not found!"})

        // Step 2: Toggle completed
        task.completed = !task.completed;

        // Step 3: Save updated task
        await task.save();

        // Step 4: Send response
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
});


// update todo OR rename task
app.put('/api/tasks/:id', async(req,res) => {
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
});


// delete task
app.delete('/api/tasks/:id', async(req,res) => {
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
});

app.listen(3000, (err) => {
    if(err) throw err;
    console.log("Server running on Port 3000");
})