import React from "react";

const TaskForm = ({ createTask, task, setTask, buttonToggle, inputRef }) => {
  return (
    <form
      className="flex justify-between gap-3 mb-6"
      onSubmit={(e) => createTask(e)}
    >
      <input
        className="h-14 bg-zinc-800 rounded-xl px-4 w-full outline-none border border-zinc-700 focus:border-blue-500 transition"
        ref={inputRef}
        type="text"
        placeholder="Enter your task here..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <input
        className="bg-blue-600 hover:bg-blue-700 transition text-lg cursor-pointer h-14 px-6 rounded-xl font-medium"
        type="submit"
        value={buttonToggle}
      />
    </form>
  );
};

export default TaskForm;
