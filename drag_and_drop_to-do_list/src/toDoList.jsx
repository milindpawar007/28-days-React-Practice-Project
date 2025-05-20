import React, { useState } from 'react'

function ToDoList({ todos }) {
    const [input, setInput] = useState('');
    const [todo, setTodo] = useState(todos);

    React.useEffect(() => {
        setTodo(todos);
    }, [todos]);
    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleAdd = () => {
        const obj = { id: Date.now(), text: input, status: "to-do" };
        setTodo(p => [...p, obj]);
        setInput('');
    }
    return (
        <>
          <h2>To Do APP</h2>
            <div className="todo-input-section">
              
                <input type="text" value={input || ''} placeholder="Add a new task" onChange={handleInputChange} />
                <button onClick={handleAdd}>Add</button>
            </div>
            <div className='Container'>
                <div className='todo'>
                    <h2 >To Do List</h2>
                    <ul>
                        {todo.map((todo, index) => (
                            <li key={todo.id}>
                                {todo.text}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='todo'>
                    <h2>In-Progress</h2>
                    <ul>
                        {todo.map((todo, index) => (
                            <li key={todo.id}>
                                {todo.text}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='todo'>
                    <h2>Done</h2>
                    <ul>

                        {todo.map((todo, index) => (
                            <li key={todo.id}>
                                {todo.text}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default ToDoList
