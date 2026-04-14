import React from 'react'
import TaskItem from './TaskItem'

const TaskList = ({ todos, toggleTask, editTask, deleteTask }) => {
  return (
        // Tasks Section
        <div className='flex flex-col flex-1 overflow-y-auto pr-2'>

          {(todos.length == 0) ?
            // Empty Space Helper
            (<div className='text-center text-zinc-500 mt-6 text-sm'>
              Your tasks will appear here ✨
            </div>) : 
            
              todos.map(todo => (
                <TaskItem 
                    key={todo._id}
                    todo={todo} 
                    editTask={editTask} 
                    deleteTask={deleteTask} 
                    toggleTask={toggleTask}
                />
            ))
          }
        </div>
  )
}

export default TaskList