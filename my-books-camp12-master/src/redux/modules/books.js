import BookService from '../../services/BookService';
import {
  select,
  put,
  delay,
  call,
  takeLeading,
  takeEvery,
} from 'redux-saga/effects';
import { createAction, createActions, handleActions } from 'redux-actions';
import { push } from 'connected-react-router';

// module

// prefix
const prefix = 'my-books/books';

// createActions
const { start, success, fail } = createActions('START', 'SUCCESS', 'FAIL', {
  prefix,
});

// initial state
const initialState = {
  books: [],
  loading: false,
  error: null,
};

// reducer
const reducer = handleActions(
  {
    START: (state) => ({ ...state, loading: true, error: null }),
    SUCCESS: (state, action) => ({
      books: action.payload,
      loading: false,
      error: null,
    }),
    FAIL: (state, action) => ({
      books: [],
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  { prefix },
);

export default reducer;

// saga
const START_GET_BOOKS = `${prefix}/START_GET_BOOKS`;
const START_ADD_BOOK = `${prefix}/START_ADD_BOOK`;
const START_REMOVE_BOOK = `${prefix}/START_REMOVE_BOOK`;

export const startGetBooks = createAction(`${START_GET_BOOKS}`);
export const startAddBook = createAction(`${START_ADD_BOOK}`);
export const startRemoveBook = createAction(`${START_REMOVE_BOOK}`);

function* startGetBooksSaga() {
  try {
    yield put(start());
    yield delay(1000);
    const token = yield select((state) => state.auth.token);
    const books = yield call(BookService.getBooks, token);
    yield put(success(books));
  } catch (error) {
    yield put(fail(error));
  }
}

function* startAddBookSaga(action) {
  try {
    yield put(start());
    yield delay(1000);
    const token = yield select((state) => state.auth.token);
    const book = yield call(BookService.addBook, token, action.payload);
    const books = yield select((state) => state.books.books);
    yield put(success([...books, book]));
    yield put(push('/'));
  } catch (error) {
    yield put(fail(error));
  }
}

function* startRemoveBookSaga(action) {
  const bookId = action.payload;
  try {
    yield put(start());
    yield delay(1000);
    const token = yield select((state) => state.auth.token);
    yield call(BookService.removeBook, token, bookId);
    const books = yield select((state) => state.books.books);
    const newBooks = books.filter((book) => book.bookId !== bookId);
    yield put(success(newBooks));
  } catch (error) {
    yield put(fail(error));
  }
}

export function* booksSaga() {
  yield takeLeading(START_GET_BOOKS, startGetBooksSaga);
  yield takeEvery(START_ADD_BOOK, startAddBookSaga);
  yield takeEvery(START_REMOVE_BOOK, startRemoveBookSaga);
}
