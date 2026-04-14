import React from "react";

const TaskItem = ({ todo, toggleTask, editTask, deleteTask }) => {
  return (
    // Task Item
    <div className="flex justify-between items-center min-h-14 w-full bg-zinc-800 hover:bg-zinc-700 transition rounded-xl p-3 mb-4 border border-zinc-700">
      {/* Left Side */}
      <div className="flex gap-4 items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => {
            toggleTask(todo._id);
          }}
          className="h-5 w-5 accent-blue-600 cursor-pointer"
        />
        <p
          className={
            todo.completed
              ? "text-zinc-200 wrap-break-words line-through"
              : "text-zinc-200 wrap-break-words"
          }
        >
          {todo.title}
          <button
            type="button"
            className="ml-3 bg-green-600 hover:bg-green-700 transition rounded-lg py-1 px-3 text-sm cursor-pointer"
            onClick={() => {
              editTask(todo._id, todo.title);
            }}
          >
            ✏️ Edit
          </button>
        </p>
      </div>
      {/* Delete Button */}
      <button
        type="button"
        className="bg-red-600 hover:bg-red-700 transition px-4 py-2 cursor-pointer rounded-lg text-sm font-medium"
        onClick={() => {
          deleteTask(todo._id);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
