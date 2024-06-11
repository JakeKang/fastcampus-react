import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import Home from './pages/Home';
import Signin from './pages/Signin';
import Add from './pages/Add';
import NotFound from './pages/NotFound';
import Error from './pages/Error';

import PersonContext from './contexts/PersonContext';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './redux/create';

const persons = [
  { name: 'Mark', age: 38 },
  { name: 'Hanna', age: 27 },
];

// store !== state
// state 가지고 있다.
// state 를 변경하는 로직을 가지고 있다.

function App() {
  return (
    <ErrorBoundary Error={Error}>
      <PersonContext.Provider value={persons}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/add" component={Add} />
            <Route path="/signin" component={Signin} />
            <Route path="/" exact component={Home} />
            <Route component={NotFound} />
          </Switch>
        </ConnectedRouter>
      </PersonContext.Provider>
    </ErrorBoundary>
  );
}

export default App;

// withRouter => Context
// use
