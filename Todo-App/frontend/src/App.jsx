import React, { useState } from 'react'

const App = () => {

  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([])

  function createTask(e) {
    e.preventDefault();

    if(task.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      title: task,
      completed: false
    }

    setTodos([...todos, newTodo]);
    setTask("");
  }

  return (
    <div className='h-screen w-screen bg-linear-to-br from-zinc-950 to-zinc-900 text-white flex justify-center items-center p-6 overflow-hidden'>

      {/* Main Card */}
      <div className='w-150 h-[90%] bg-zinc-900 rounded-2xl p-6 shadow-lg border border-zinc-800 flex flex-col'>

        {/* Header */}
        <div className='mb-6'>
          <h1 className='text-4xl font-semibold text-center tracking-wide'>
            📝 Todo Web App
          </h1>
          <p className='text-zinc-400 text-center mt-2'>
            Stay organized. Stay productive.
          </p>
        </div>

        {/* Form */}
        <form className='flex justify-between gap-3 mb-6'>

          <input
            className='h-14 bg-zinc-800 rounded-xl px-4 w-full outline-none border border-zinc-700 focus:border-blue-500 transition'
            type="text"
            placeholder='Enter your task here...'
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <input
            className='bg-blue-600 hover:bg-blue-700 transition text-lg cursor-pointer h-14 px-6 rounded-xl font-medium'
            type="submit"
            value="Add"
            onClick={(e) => createTask(e)}
          />

        </form>

        {/* Divider */}
        <div className='h-px bg-zinc-800 mb-5'></div>

        {/* Tasks Section */}
        <div className='flex flex-col flex-1 overflow-y-auto pr-2'>

          {(todos.length == 0) ? 
            // Empty Space Helper
            (<div className='text-center text-zinc-500 mt-6 text-sm'>
              Your tasks will appear here ✨
            </div>) : 
            
              todos.map(todo => (
                // Task Item
                  <div key={todo.id} className='flex justify-between items-center min-h-14 w-full bg-zinc-800 hover:bg-zinc-700 transition rounded-xl p-3 mb-4 border border-zinc-700'>
                    {/* Left Side */}
                    <div className='flex gap-4 items-center'>
                      <input
                        type="checkbox"
                        onChange={() => {
                          todo.completed = !todo.completed
                        }}
                        className='h-5 w-5 accent-blue-600 cursor-pointer'
                      />
                      <p className={todo.completed ? "text-zinc-200 wrap-break-words line-through" : "text-zinc-200 wrap-break-words"}>
                        {todo.title}
                        <button className='ml-3 bg-green-600 hover:bg-green-700 transition rounded-lg py-1 px-3 text-sm'>
                          ✏️ Edit
                        </button>
                      </p>
                    </div>
                    {/* Delete Button */}
                    <button 
                      className='bg-red-600 hover:bg-red-700 transition px-4 py-2 cursor-pointer rounded-lg text-sm font-medium'
                    >
                      Delete
                    </button>
                  </div>
            ))
          }
        </div>

      </div>

    </div>
  )
}

export default App