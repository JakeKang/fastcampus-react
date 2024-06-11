import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary';

import Home from './pages/Home';
import Signin from './pages/Signin';
import NotFound from './pages/NotFound';
import Error from './pages/Error';

function App() {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <BrowserRouter>
        <Switch>
          <Route path="/signin" exact component={Signin} />
          <Route path="/" exact component={Home} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
