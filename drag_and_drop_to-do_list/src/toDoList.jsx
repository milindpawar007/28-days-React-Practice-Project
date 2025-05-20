import React from 'react'

function ToDoList({todos}) {
    
  return (
    <div>
        <h2>To Do List</h2>
        <input type="text" placeholder="Add a new task" />
        <button>Add</button>    
        <ul>
            {todos.map((todo, index) => (
            <li key={index}>
                {todo.text}
            </li>
            ))}
        </ul>
    </div>
  )
}

export default ToDoList
