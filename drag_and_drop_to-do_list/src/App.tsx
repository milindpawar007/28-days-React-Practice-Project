import React from 'react';

import './App.css';
//import Example from './exmaple';
import ToDoList from './toDoList';
function App() {
  return (
    <div className="App">
      <header className="App-header">
       {/* <Example /> */}
 <ToDoList
   todos={[
     { id: 1, text: "buy milk", status: "to-do" },
     { id: 2, text: "wash bike", status: "in-progress" },
     { id: 3, text: "do the budget", status: "done" },
     { id: 4, text: "call jane", status: "to-do" },
   ]}
 />
      </header>
    </div>
  );
}

export default App;
