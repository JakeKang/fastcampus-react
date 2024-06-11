import { ADD_TODO, COMPLETE_TODO } from '../actions'

const initialState = [];
// [{text: '할 일'}] 기존에 들어오는 모습
// [{text: '할 일', done: null | Date}] // 끝난일 인지 체크할 스테이트 모습

// {
//  todos: [], 
//  loading: false
// }

// 리듀서
export default function todoApp(state = initialState, action) {
    console.log(state, action); // 리덕스가 초기화 될때 상태확인.

    if(action.type === ADD_TODO) { // 액션.type이 ADD_TODO면 
        return [...sate, action.todo]; // 기존에 요소를 빼서 새로운 todo를 추가하고 새로운 배열을 만들어서 리턴한다.
    }

    if(action.type === COMPLETE_TODO) {
        return state.map((todo, i) => {
            if (i === action.index) { // 새로운 객체 반환
                return {
                    ...todo,
                    done: new Date().toISOString,
                };
            }
            return todo; // 아니면 안 바뀐 아이를 그대로 반환
        });
    }

    return state;
}