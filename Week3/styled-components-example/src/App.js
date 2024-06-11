import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from "./components/Button"
import ShadowButton from "./components/ShadowButton"

function App() {
  return (
    <p>
      <Button>버튼</Button>
      <Button primary>primary 버튼</Button>
      <ShadowButton />
    </p>
  );
}

export default App;
