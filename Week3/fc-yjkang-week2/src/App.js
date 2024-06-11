import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom'; // react-router-dom 을 불러온다.
import logo from './logo.svg';
import './App.css';
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

function App() {
  return ( 
  <BrowserRouter>
    <ul>
      <li>
      <NavLink to="/" exact activeStyle={{fontSize: 5}}>
        Home으로 가기
      </NavLink>
      </li>
      <li>
      <NavLink to="/profile" exact activeClassName="hello">
        profile로 가기
      </NavLink>
      </li>
      <li>
      <Link to="/profile/3">3번 유저로 가기</Link>
      </li>
      <li>
      <Link to="/about">About으로 가기</Link>
      </li>
      <li>
      <Link to="/login">Login으로 가기</Link>
      </li>
  </ul>
    <Switch>
      <Route path="/profile/:id" component={Profile} />
      <Route path="/profile" exact component={Profile}/>
      <Route path="/about" component={About}/>
      <Route path="/login" component={Login}/>
      <Route path="/" exact component={Home}/>
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
  );
}
export default App;
