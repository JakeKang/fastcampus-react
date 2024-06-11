export const ADD_TODO = "ADD_TODO"; // 액션 하나에
export const COMPLETE_TODO = "COMPLETE_TODO";

// {type: ADD_TODO, todo : ...}

export function addTodo(text) { // 함수 하나 {text: '', done: null}
    return { type: ADD_TODO, todo: { text, done: null} };
}

// addTodo({text: '할일'})
// {type: ADD_TODO, todo: {text: '할일'}};

// 순서
// id: uuid
export function completeTodo(index) { // 순서로 처리 해본다.
    return {
        type : COMPLETE_TODO,
        index,
    };
}