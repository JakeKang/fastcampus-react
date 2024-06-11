import { combineReducers } from 'redux';
import loading from "./loading"
import todos from "./todos"

const reducer = combineReducers({
    todos,
    loading,
})

export default reducer;