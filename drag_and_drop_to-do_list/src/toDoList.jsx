import React, { useState } from 'react'
import { DndContext } from '@dnd-kit/core'
function ToDoList({ todos }) {
    const [input, setInput] = useState('');
    // const [todo, setTodo] = useState(todos);
    const [columns, setColumns] = useState({
        'to-do': [],
        'in-progress': [],
        'done': []
    });
    React.useEffect(() => {
        todos.map((todo) => {
            console.log("todo", todo);
            if (todo.status === 'to-do') {
                setColumns(p => ({ ...p, 'to-do': [...p['to-do'], todo] }))
            } else if (todo.status === 'in-progress') {
                setColumns(p => ({ ...p, 'in-progress': [...p['in-progress'], todo] }))
            } else if (todo.status === 'done') {
                setColumns(p => ({ ...p, 'done': [...p['done'], todo] }))
            }
        })

    }, []);
    const handleInputChange = (e) => {
        setInput(e.target.value);

    };

    const handleAdd = () => {
        const obj = { id: Date.now(), text: input, status: "to-do" };
        setColumns(p => ({ ...p, 'to-do': [...p['to-do'], obj] }));
        setInput('');
    }

    function handleDragEnd({ over }) {
        //setParent(over ? over.id : null);
    }
    return (
        <>
            <h2>To Do APP</h2>
            <div className="todo-input-section">

                <input type="text" value={input || ''} placeholder="Add a new task" onChange={handleInputChange} />
                <button onClick={handleAdd}>Add</button>
            </div>
            <DndContext onDragEnd={handleDragEnd}>
                <div className='Container'>
                    <div className='todo'>
                        <h2 className='header' >To Do List</h2>
                        <ul>
                            {columns['to-do'].map((todo, index) => (
                                <li key={todo.id}>
                                    {todo.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='todo'>
                        <h2 className='header'>In-Progress</h2>
                        <ul>
                            {columns['in-progress'].map((todo, index) => (
                                <li key={todo.id}>
                                    {todo.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='todo'>
                        <h2 className='header'>Done</h2>
                        <ul>

                            {columns['done'].map((todo, index) => (
                                <li key={todo.id}>
                                    {todo.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </DndContext>
        </>
    )
}

export default ToDoList
