import UserService from '../../services/UserService';
import TokenService from '../../services/TokenService';
import { push } from 'connected-react-router';
import { put, delay, call, takeLeading, select } from 'redux-saga/effects';
import { createActions, handleActions, createAction } from 'redux-actions';

// module

// prefix
const prefix = 'my-books/auth';

// action creator
const { start, success, fail } = createActions(
  {
    SUCCESS: (token) => ({ token }),
  },
  'START',
  'FAIL',
  {
    prefix,
  },
);

// initial state
const initialState = {
  token: null,
  loading: false,
  error: null,
};

// reducer
const reducer = handleActions(
  {
    START: () => ({
      token: null,
      loading: true,
      error: null,
    }),
    SUCCESS: (state, action) => ({
      token: action.payload.token,
      loading: false,
      error: null,
    }),
    FAIL: (state, action) => ({
      token: null,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  {
    prefix,
  },
);

export default reducer;

// saga
const START_LOGIN = `${prefix}/START_LOGIN`;
const START_LOGOUT = `${prefix}/START_LOGOUT`;

export const startLogin = createAction(`${START_LOGIN}`, (email, password) => ({
  email,
  password,
}));

export const startLogout = createAction(`${START_LOGOUT}`);

function* startLoginSaga(action) {
  const { email, password } = action.payload;
  try {
    yield put(start());
    yield delay(1000);
    const token = yield call(UserService.login, email, password);
    TokenService.save(token);
    yield put(success(token));
    yield put(push('/'));
  } catch (error) {
    yield put(fail(error));
  }
}

function* startLogoutSaga() {
  const token = yield select((state) => state.auth.token);
  TokenService.remove();
  yield put(success(null));
  yield put(push('/signin'));
  try {
    yield call(UserService.logout, token);
  } catch {}
}

export function* authSaga() {
  yield takeLeading(START_LOGIN, startLoginSaga);
  yield takeLeading(START_LOGOUT, startLogoutSaga);
}
