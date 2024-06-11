import { createStore, applyMiddleware } from 'redux';
import reducer from './modules/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import TokenService from '../services/TokenService';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import rootSaga from '../redux/middlewares/saga';

export const history = createBrowserHistory();

export default function create() {
  const sagaMiddleware = createSagaMiddleware();
  const token = TokenService.get();
  const preloadedState = {
    auth: {
      token,
      loading: false,
      error: null,
    },
  };
  const store = createStore(
    reducer(history),
    preloadedState,
    composeWithDevTools(
      applyMiddleware(routerMiddleware(history), sagaMiddleware),
    ),
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
