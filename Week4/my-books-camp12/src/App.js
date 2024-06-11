import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import Home from './pages/Home';
import Signin from './pages/Signin';
import NotFound from './pages/NotFound';
import Error from './pages/Error';

function App() {
  return (
    <ErrorBoundary Error={Error}>
      <BrowserRouter>
        <Switch>
          <Route path="/signin" component={Signin} />
          <Route path="/" exact component={Home} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
