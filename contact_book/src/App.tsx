import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-base-200">
    <h1 className="text-4xl font-bold text-primary">Welcome to DaisyUI</h1>

    <button className="btn btn-primary">Primary Button</button>
    <button className="btn btn-secondary">Secondary Button</button>
    <button className="btn btn-accent">Accent Button</button>

    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Tailwind + DaisyUI</h2>
        <p>This is a sample card using DaisyUI components!</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  </div>
  );
}

export default App;
