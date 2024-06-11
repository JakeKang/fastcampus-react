import React, { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import { addTodo, completeTodo } from './actions';

function App({ store }) {

  const inputRef = useRef();
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(store.getState());
    })
    return () => {
      unsubscribe();
    }
  }, [store]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <input tpye="text" ref={inputRef}></input>
          <button onClick={click}>add todo</button>
        </p>
          <ul>
            {state.todos.map((todo, i) => {
              if (todo.done === null) {
                return <li> { todo.text } <button onClick={clickDone(i)}>완료</button></li>;
              }
            return (
            <li 
            style={{
            textDecoration: "line-through",
          }}>
            {todo.text}
          </li>
          )})}</ul>
      </header>
    </div>
  );

  function click() {
    const text = inputRef.current.value;
    if(text === '') return;
    store.dispatch(addTodo(text));
  }

  function clickDone(i) {
    store.dispatch(completeTodo(i));
  }
}

export default App;
