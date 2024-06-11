import { all } from 'redux-saga/effects';
import { booksSaga } from '../modules/books';
import { authSaga } from '../modules/auth';

export default function* rootSaga() {
  yield all([authSaga(), booksSaga()]);
}
