import React from 'react';
import logo from './logo.svg';
import './App.css';
import ClassComponent from './components/ClassComponent';
import FuntionalComponent from './components/FunctionalComponent';

function App() {
  return (
    <div className="App">
      <ClassComponent />
      <FuntionalComponent />
    </div>
  );
}

export default App;
