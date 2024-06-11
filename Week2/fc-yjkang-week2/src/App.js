import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'; // react-router-dom 을 불러온다.
import logo from './logo.svg';
import './App.css';
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";

function App() {
  return ( // 패스로 경로를 지정해주고 exact는 path에 적은 내용을 포함하면 맞다고 본다.
  <BrowserRouter>
      <Route path="/" exact component={Home}/>
      <Route path="/profile" exact component={Profile}/>
      <Route path="/profile/:id" component={Profile} />
      <Route path="/about" component={About}/>
  </BrowserRouter>
  );
}

export default App;
