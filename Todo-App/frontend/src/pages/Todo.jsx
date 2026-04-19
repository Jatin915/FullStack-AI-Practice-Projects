import React, { useState, useEffect, useRef } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

import { getTasks, addTask, updateTask, toggleTaskStatus, deleteTaskById } from "../services/api";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/api";


const Todo = () => {
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Logout failed! check console for details");
    }
  };

  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [buttonToggle, setbuttonToggle] = useState("Add");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  //display tasks
  const fetchTasks = async () => {
    try {
        setLoading(true);
        const data = await getTasks();
        setTodos(data);
    } catch (err) {
        console.log(err);
        alert("Please login first!");
        navigate("/login");
    }
    finally {
      setLoading(false);
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

  // Loading UI
  if (loading) {
    return (
      <div className="h-screen w-screen bg-linear-to-br from-zinc-950 to-zinc-900 text-white flex justify-center items-center">
        <div className="flex flex-col items-center gap-3">

          {/* Spinner */}
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>

          <p className="text-lg text-zinc-300">
            Loading tasks...
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-linear-to-br from-zinc-950 to-zinc-900 text-white flex justify-center items-center p-6 overflow-hidden">
      {/* Main Card */}
      <div className="w-150 h-[90%] bg-zinc-900 rounded-2xl p-6 shadow-lg border border-zinc-800 flex flex-col">
        {/* Header */}
        <div className="mb-6 relative">
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="absolute top-0 right-0 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Logout
          </button>
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

      </div>
    </div>
  );
};

export default Todo;
