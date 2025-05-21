import React, { useState, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import Draggable from './Draggable';
import Droppable from './Droppable';

function ToDoList({ todos }) {
    const [input, setInput] = useState('');
    const [columns, setColumns] = useState({
        'to-do': [],
        'in-progress': [],
        'done': [],
    });

    useEffect(() => {
        const grouped = {
            'to-do': [],
            'in-progress': [],
            'done': [],
        };
        todos.forEach(todo => {
            grouped[todo.status].push(todo);
        });
        setColumns(grouped);
    }, [todos]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleAdd = () => {
        const obj = { id: Date.now(), text: input, status: "to-do" };
        setColumns(prev => ({
            ...prev,
            'to-do': [...prev['to-do'], obj]
        }));
        setInput('');
    };

    const handleDragEnd = ({ active, over }) => {
        if (!over || !active || over.id === active.id) return;

        let fromColumn = null;
        let taskToMove = null;

        // Find the task and its original column
        for (const columnKey in columns) {
            const item = columns[columnKey].find(todo => todo.id === active.id);
            if (item) {
                fromColumn = columnKey;
                taskToMove = item;
                break;
            }
        }

        if (!taskToMove || fromColumn === over.id) return;

        taskToMove.status = over.id;

        setColumns(prev => ({
            ...prev,
            [fromColumn]: prev[fromColumn].filter(todo => todo.id !== active.id),
            [over.id]: [...prev[over.id], taskToMove]
        }));
    };

    return (
        <>
            <h2>To Do APP</h2>
            <div className="todo-input-section">
                <input
                    type="text"
                    value={input}
                    placeholder="Add a new task"
                    onChange={handleInputChange}
                />
                <button onClick={handleAdd}>Add</button>
            </div>

            <DndContext onDragEnd={handleDragEnd}>
                <div className='Container' style={{ display: 'flex', gap: '16px' }}>
                    {['to-do', 'in-progress', 'done'].map(column => (
                        <div className='column' key={column}>
                            <h2 className='header'>{column.replace('-', ' ').toUpperCase()}</h2>
                            <Droppable id={column}>
                                <ul style={{ minHeight: '100px', padding: 0 }}>
                                    {columns[column].map((todo) => (
                                        <Draggable key={todo.id} id={todo.id}>
                                            <li style={{ listStyle: 'none', border: '1px solid #ccc', marginBottom: '8px', padding: '8px' }}>
                                                {todo.text}
                                            </li>
                                        </Draggable>
                                    ))}
                                </ul>
                            </Droppable>
                        </div>
                    ))}
                </div>
            </DndContext>
        </>
    );
}

export default ToDoList;
