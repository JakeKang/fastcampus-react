import { START_GET_BOOKS, SUCCESS_GET_BOOKS, FAIL_GET_BOOKS } from '../actions'

const initialState = {
    books: [],
    loading: false,
    error: null,
  };
  
  export default function books(state = initialState, action) {
    switch (action.type) { // 액션은 겹치지 않기 때문에
      case START_GET_BOOKS:
        return {
          books: [],
          loading: true,
          error: null,
        };
      case SUCCESS_GET_BOOKS:
        return {
          books: action.books,
          loading: false,
          error: null,
        };
      case FAIL_GET_BOOKS:
        return {
          books: [],
          loading: false,
          error: action.error,
        };
      default:
        return state;
  }
}