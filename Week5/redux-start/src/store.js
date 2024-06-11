// 단일 스토어라서 store.js 이다.

import { createStore, combineReducers } from 'redux';
import todos from './reducers/todos';
import loading from './reducers/loading';

const reducer = combineReducers({
    todos,
    loading,
});

const store = createStore(reducer);

export default store;