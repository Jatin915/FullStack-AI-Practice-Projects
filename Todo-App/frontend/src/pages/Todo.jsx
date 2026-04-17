import React, { useState, useEffect, useRef } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

import { getTasks, addTask, updateTask, toggleTaskStatus, deleteTaskById } from "../services/api";


const Todo = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [buttonToggle, setbuttonToggle] = useState("Add");
  const [editId, setEditId] = useState(null);

  //display tasks
  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTodos(data);
    } catch (err) {
      console.log(err);
      alert("Error displaying tasks! check console window for more details");
    }
  };

  const inputRef = useRef();

  // render tasks when components load
  useEffect(() => {
    fetchTasks();
  }, []);

  // create task
  async function createTask(e) {
    try {
      e.preventDefault();
      inputRef.current.blur();
      if (task.trim() === "") return;

      if (buttonToggle === "Edit" && editId) {
        await updateTask(editId, task);
        setTask("");
        setbuttonToggle("Add");
        setEditId(null);
        fetchTasks();
        return;
      }

      await addTask(task);

      fetchTasks();
      setTask("");
    } catch (err) {
      console.log(err);
      alert("Error creating new task! check console window for more details");
    }
  }

  //toggle task
  async function toggleTask(id) {
    try {
      await toggleTaskStatus(id);
      fetchTasks();
    } catch (err) {
      console.log(err);
      alert(
        "Error toggling task status! check console window for more details",
      );
    }
  }

  // edit task
  function editTask(id, title) {
    try {
      inputRef.current.focus();
      setbuttonToggle("Edit");
      setTask(title);
      setEditId(id);
    } catch (err) {
      console.log(err);
      alert("Error editing task! check console window for more details");
    }
  }

  // delete task
  async function deleteTask(id) {
    try {
      await deleteTaskById(id);
      fetchTasks();
    } catch (err) {
      console.log(err);
      alert("Error deleting task! check console window for more details");
    }
  }

  return (
    <div className="h-screen w-screen bg-linear-to-br from-zinc-950 to-zinc-900 text-white flex justify-center items-center p-6 overflow-hidden">
      {/* Main Card */}
      <div className="w-150 h-[90%] bg-zinc-900 rounded-2xl p-6 shadow-lg border border-zinc-800 flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-semibold text-center tracking-wide">
            📝 Todo Web App
          </h1>
          <p className="text-zinc-400 text-center mt-2">
            Stay organized. Stay productive.
          </p>
        </div>

        <TaskForm
          createTask={createTask}
          task={task}
          setTask={setTask}
          buttonToggle={buttonToggle}
          inputRef={inputRef}
        />

        <TaskList
          todos={todos}
          toggleTask={toggleTask}
          editTask={editTask}
          deleteTask={deleteTask}
        />

        {/* Divider */}
        <div className="h-px bg-zinc-800 mb-5"></div>
      </div>
    </div>
  );
};

export default Todo;
