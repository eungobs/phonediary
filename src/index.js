import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Load the WebAssembly module
const loadWasm = async () => {
  try {
    const response = await fetch('/db/todo.wasm'); // Ensure this path is correct
    const buffer = await response.arrayBuffer();
    const { instance } = await WebAssembly.instantiate(buffer);
    return instance.exports;
  } catch (error) {
    console.error('Error loading WebAssembly:', error);
  }
};

loadWasm().then((wasm) => {
  if (wasm) {
    wasm._init();
    wasm._add_task('Sample Task', 'This is a sample task', 1);
    console.log('Number of tasks:', wasm._get_task_count());
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
