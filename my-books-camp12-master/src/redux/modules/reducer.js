import { combineReducers } from 'redux';
import books from './books';
import auth from './auth';
import { connectRouter } from 'connected-react-router';

/*

{
    books: {
        books: [],
        loading: boolean,
        error: null | Error
    },
    auth: {
        token: null | string,
        loading: boolean,
        error: null | Error,
    },
    router: ...
}

*/

const reducer = (history) =>
  combineReducers({
    books,
    auth,
    router: connectRouter(history),
  });

export default reducer;
