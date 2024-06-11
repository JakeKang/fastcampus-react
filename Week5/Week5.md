## 패스트캠퍼스 React

### Week5

사용 슬라이드
[슬라이드7](https://slides.com/woongjae/react-camp-7)
[슬라이드8](https://slides.com/woongjae/react-camp-8)
[슬라이드9](https://slides.com/woongjae/react-camp-9)

###### 슬라이드7

## Redux Basic

```
npm i redux
```

### Redux 개요
###### App.js
```js
const persons = [
  { name: "Kang", age: 26},
  { name: "kim" , age: 29},
];

function App() {
  return (
    <ErrorBoundary Error={Error}>
      <PersonContext.Provider value={persons}>
        <BrowserRouter>
          <Switch>
            <Route path="/signin" component={Signin} />
            <Route path="/" exact component={Home} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </PersonContext.Provider>
    </ErrorBoundary>
    )
}
```

`Context` 에서 만들어진 객체를 하위 컴포넌트에서 사용할 수 있는 3가지 방법을 제공해줬다.

이는 리액트에서 제공해주는 기술적인 베이스이며, 활용 방안은 우리가 선택하는것이다.

하지만 우리가 원하는건 `Home`에서 `Person` 데이터를 하나 더 추가한다.

공유되고 있는 `persons`에서 하나가 추가되면 `Home`에서는 2개가 아니라 3개로 보이게 하고 싶다.

이런걸 정확하게 구현해주는게 리덕스이다.

리덕스에서는 `persons` 즉, 전체적으로 공유해주는 `value={persons}` 가 중요하다.

이전의 방식은 `props`를 통해서 계속 이어서 가야한다면,

리덕스에서는 `store`가 `persons`의 역할을 하고 거쳐갈 필요 없이 `store`를 통해 바로 모든걸 처리할 수 있다.

### store
- 한 어플리케이션 당 하나의 스토어를 만든다.
- 스토어 안에는 현재의 앱 상태와 리듀서, 추가적인 내장 함수들이 있다.

- store를 통해 데이터를 받아 쓰는 컴포넌트가 있다.
- store에 상태 변화를 요청하는 컴포넌트가 있다.
- 상태 변화를 요청하는 컴포넌트에 의해 store의 상태가 변경되면 데이터를 받아 쓰는 컴포넌트는 다시 랜더한다.

즉 `props`를 통해 계속 이어가며 처리할 필요 없이, 별도의 `store`를 만들어 스토어를 통해 모든걸 처리할 수 있다.

__[만들기]__ 단일 스토어 사용 준비하기
- `import redux`
- `Action`을 정의하고,
- `Action`을 사용하는, `Reducer`를 만들고,
- `Reducer`들을 합친다.
- 최종 합쳐진 `Reducer`를 인자로, 단일 스토어를 만든다.

__[사용하기]__ 준비한 스토어를 리액트 컴포넌트에서 사용하기
- `import react-redux`
- `connect` 함수를 이용해서 컴포넌트에 연결

### 리덕스 Action

`store`에서 날려주는 형태를 `Action` 이라고 한다.
- 액션은 `객체(object)` 이다.
- `{type: '문자열'}` payload 없는 액션
- `{type: '문자열', params: '값'}` payload 있는 액션
- `type` 만이 필수 프로퍼티이며, `type`은 문자열이다.

```js
{
  type: "START_ACTION",
  params: "값",
};
```

###### payload
`type` 뒤에 들어가는 값 (전달할 인자)들을 말한다.

#### 리덕스의 액션 생성자 (Action Creator)

```js
function 액션생성자(...args) { return 액션; }
```
- 단순한 함수이며, 파라미터를 받아와서 액션 객체 형태로 만든다.
- 함수를 통해 액션을 생성해서, 액션 객체를 리턴한다.
- createTest('hello'); // {type: 'TEST', params: 'hello'} 리턴

`type`에 액션을 적으면 문자열이기 때문에 오타가 나더라도 알아차리기 어렵다. 그래서 액션 생성자를 통해 액션을 리턴하게 된다.

#### 리덕스의 액션은 어떤 일을 하는가?
- 액션 생성자를 통해 액션을 만들어 낸다.
- 만들어진 액션 객체를 리덕스 스토어에 보낸다.
- 리덕스 스토어가 액션 객체를 받으면 스토어의 상태 값이 변경된다.
- 변경된 상태 값에 의해 상태를 이용하고 있는 컴포넌트가 변경된다.
- 액션은 스토어에 보내는 일종의 인풋이라고 생각할 수 있다.

#### 액션을 준비하기 위해서
- 액션의 타입을 정의하여 변수로 빼는 단계
    - 강제는 아니다.
    - 그냥 타입을 문자열로 넣기에는 실수를 유발할 가능성이 크다.
    - 미리 정의한 변수를 사용하면, 스펠링에 주의를 덜 기울여도 된다.

###### src/actions.js
```js

const ADD_TODO = 'ADD_TODO'; // 대문자에 _ 언더라인을 사용
```

- 액션 객체를 만들어 내는 함수를 만드는 단계
    - 하나의 액션 객체를 만들기 위해 하나의 함수를 만들어낸다.
    - 액션의 타입은 미리 정의한 타입 변수로 부터 가져와서 사용한다.

######  src/actions.js
```js
export const ADD_TODO = 'ADD_TODO';
// 위의 변수를 이용한 액션 객체의 모습을 예상하면 아래와 같다.
// {type: ADD_TODO, todo: ...데이터}

export function addTodo(todo) { // addTodo 함수가 실행될때 todo를 넣어준다.
  return { type: ADD_TODO, todo }
}
```

위 함수가 실행될때 `todo`의 모습은 `addTodo({text: '할일'})` 같은 형태를 뛰고 싶다. 그렇다면 최종 모습의 액션은`{type: ADD_TODO, todo: {text: '할일'}}`이 된다. 
이 모습이 스토어로 날아간다.

간단하게 액션을 만드는 방법을 알아봤다.

### 리덕스 Reducers
- 액션을 주면, 그 액션이 적용되어 달리진(혹은 달라지지 않는) 결과를 만들어 준다.

- 그냥 함수이다.
  - Pure Function
  - Immutable (새로운 객체로 만들어져야 한다.)
    - 왜?
      - 리듀서를 통해 스테이트가 달라졌음을 리덕스가 인지하는 방식

```js
// Pure Function
function 리듀서(previousState, action) { 
  // previousState 는 변해야 하는 현재 스테이트이다.
    return newState;
}
```
- 액션을 받아서 스테이트를 리턴하는 구조
- 인자로 들어오는 previousState와 리턴되는 newState는 다른 참조를 가지도록 해야한다.

```js
const todos = [];
const action = {type: ADD_TODO, todo : {text:'할일'}}

const newState = 리듀서(todos, action);
// newState = [{ text: "할일" }];
```

###### src/reducers.js
```js
import { ADD_TODO } from './actions';

const initialState = [];

export function todoApp(previousState, action) {
  if (previousState === undefined) {
    return initialState;
  }

  if (action.type === ADD_TODO) {
    return [
        ...previousState,
        action.todo
      ];
    } 

  return previousState;
}
```

1. 그냥 `return previousState`를 한다면 상태가 변하지 않는다.
2. 그러므로 조건문을 하나 추가한다.
3. `if(action.type===ADD_TODO) {return [...previousState, action.todo];}` type이 ADD_TODO 일때 새로운 배열을 만들어서 기존의 상태에 새로운 todo를 추가해서 반환한다.
4. `todoApp`은 최초에 한번 실행될때 `previousState`는 `undefined` 값을 가진다.
5. 그러므로 `initialState`를 통해 초기값(`[]`)을 지정해준다.

액션이 날아올때마다 해당되는 상태를 `return` 해주는 리듀서가 완성되었다.

### createStore

- 스토어를 만드는 함수
```js
const store = createStore(리듀스);
```
__모습__
```
createStore<S>(
  reducer: Reducer<S>,
  preloadedState: S,
  enhancer?: StoreEnhancer<S>
): Store<S>;
```

#### Store
- store.getState();
- store.dispatch(액션);
- store.dispatch(액션생성자());
- const unsubscribe = store.subscribe(()=>{});
    - 리턴이 unsubscribe 라는 점!
    - unsubscribe(); 하면 제거
- store.replaceReducer(다른리듀서);

#### todo앱으로 학습하기
###### src/store.js
```js

import { createStore } from 'redux';
import { todoApp } from './reducers';

const store = createStore(todoApp) // 인자로 todoApp을 받고 store로 리턴한다.

export default store; // 사용하기 위해 export 해준다.
```

`Context` 처럼 최상단에 위치 시켜 사용한다.
여기서 최상단은 `App.js`가 아니라 `index.js`이다.

###### src/index.js
```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import store from './store';
import { addTodo } from './actions';

const action1 = addTodo({text: '학원가기' });

console.log('action1', action1);
// action1 {type: "ADD_TODO", todo: {text:"학원가기"}}

store.dispatch(action1);

console.log(store.getState());
// 0 : {text: "학원 가기"}

ReactDOM.render(
<App />, 
document.getElementById('root')
);

serviceWorker.unregister();
```

`console.log(store)`를 찍어보면 `Object`가 출력된다. 총 4개의 함수를 가지고 있다.

- __store.getState()__
    - 최초에 무조건 한번 실행되면 `undefined` 이다.
    - store가 가지고 있는 State를 보여준다.
    - 위 코드에서 initialState를 통해 `[]` 를 초기값으로 가지게 된다.

- __store.dispatch()__
    - 액션을 전달하는 역할
    - action1을 store에 보낸다.
    - 액션이 스토어에 도달했을때 리듀서를 한번 더 호출한다.

- __store.subscribe()__
    - 인자로 함수가 들어간다.
    - store의 상태값이 변경 되었을때 싱행된다.
    - 즉 dispatch 이후 실행된다.

```js
// 간단한 subscribe 예시

// ...

store.subscribe(() => {
  console.log("subscribe", store.getState());
});

sotre.dispatch(addTodo({ text: "학원 가기" }));

// ...
```

`subscribe`는 `dispatch` 이후에 실행 되므로 `0 : {text: "학원가기"}` 가 출력된다.

`subscribe`에서 랜더를 다시 해주는게 곧 `store`에 연결된 아이들이다.

이 모든걸 `react-redux`가 해준다.

이해를 돕기 위해 직접 연결을 해보겠다.

새로운 스토어에 변경이 일어날때 직접 랜더해주는 방법

###### src/index.js
```js

//...

ReactDOM.render(
    <App store={store} />,
    // ...
)

// ...
```

###### src/App.js
```js
import React, { useState, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";

function App( {store} ) {
  const inputRef = useRef();
  const [todos, setTodos] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setTodos(store.getState());
    });
    return () => {
      unsubscribe(); // cleanUp
    }
  }, [store]);

  return (
    <p>
      <input type="text" ref={inputRef}/>
      <button onClick={click}>add Todo</button>
    </p>
    <p>{JSON.stringify(todos)}</p>
    )

    function click() {
      const text = inputRef.current.value;
      if (text === '') return; // 빈칸이면 리턴
      store.dispatch(addTodo({ text }));
    }
}
```

---

#### 할일 끝났는지 체크 하는 기능 구현
액션과 리듀스를 복습하기 위해 체크 기능을 넣어보자.

먼저 state의 모습을 구상해보자.

[{text: '할 일', done: null | Date}]
`null`이면 끝나지 않았다.
`Date` 타입이 들어와 있으면 끝났다.

###### src/App.js
```js
import React, { useState, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";

function App( {store} ) {
  const inputRef = useRef();
  const [todos, setTodos] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setTodos(store.getState());
    });
    return () => {
      unsubscribe(); // cleanUp
    }
  }, [store]);

  return (
    <p>
      <input type="text" ref={inputRef}/>
      <button onClick={click}>add Todo</button>
    </p>
    <ul>
      {todos.map((todo, i) => {
        if(todo.done === null) {
          return (
            <li>
              {todo.text} <button onClick={() => clickDone(i)}>
              완료
              </button>
            </li>
          );
        }
        return (
          <li
            style={{
              textDecoration: "line-through",
            }}>
          {todo.text}
          </li>
        )
      })}
    </ul>
  )

  function click() {
    const text = inputRef.current.value;
    if (text === '') return; // 빈칸이면 리턴
      store.dispatch(addTodo(text)); //text만 넘긴다.
  }

  function clickDone(i) {
    store.dispatch(completeTodo(i));
    // dispatch를 인덱스 값으로 넘긴다.
  } 

}
```

###### src/actions.js
```js
export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';

export function addTodo(text) { // done을 추가해 반환한다.
  return { type: ADD_TODO, todo: {text, done: null} }
}

// 순서 방식
export function completeTodo(index) {
  return {
    type: COMPLETE_TODO,
    index,
  };
}
```

###### src/reducers.js
```js
import { ADD_TODO, COMPLETE_TODO } from './actions';

const initialState = [];

export function todoApp(previousState, action) {
  if (previousState === undefined) {
    return initialState;
  }

  if (action.type === ADD_TODO) {
    return [
      ...previousState,
      action.todo
    ];
  } 

  if (action.type === COMPLETE_TODO) {
    return previousState.map((todo, i) => {
      if (i === action.index) {
        return {
          ... todo,
          done: new Date().toISOTring(),
        };
      }
      return todo;
    });
  }

  return previousState;
}
```
previousState 는 todos라는 배열이고 i는 index일 경우 같으면 새로운 객체를 리턴하는데 완료를 위해 todo를 분해할당하고 done을 추가해준다.
index 가 다르면 그냥 todos를 리턴한다.

#### combineReducers
위에서 하나의 reducer를 사용했다.

싱글 스토어를 사용하기 때문에 스토어를 쪼갠다.
멀티 스토어를 사용하면 스토어를 늘린다.

리덕스에서는 싱글 스토어 방식을 이용하기 때문에 쪼개는 방식에 대한 이해가 필요하다.

state에 대한 계획이 필요하다.
```js
const initialState = [];
```

위의 모습은 todos 하나만 가지고 있고,
loading을 위해 하나 추가한다.
```js
const initialState = {
    todos: [], 
    loading: boolean,
};
```

스토어가 생성되기 바로 직전에 처리를 해줘야한다.

로딩을 위한 새로운 리듀서를 만들어준다.

###### src/reducers/loading.js
```js
const initialState = false;

export default function loading(previousState, action) {
  if (previousState === undefined) {
    return initialState;
  }
  return previousState;
}
```

reducers라는 새로운 폴더를 만들어 loading.js 파일과 reducers.js를 todos.js로 이름을 변경하고 reducers 관리를 위해 폴더에 넣는다.

todos.js의 `todoApp()`을 `todos()`로 이름을 변경한 후 `export default` 해준다.

###### src/store.js
```js
import { createStore, combineReducers } from "redux";
import todos from "./reducers/todos";
import loading from "./reducers/loading";

// state와 동일한 형태로 만들어준다.
const rootReducer = combineReducers({
  todos,
  loading,
});

const store = createStore(rootReducer);

export default store;
```

위와 같이 변경한 후 실행하면 바로 에러가 발생한다.
기존에 App.js에서 store.getState()를 하면 todos가 나왔다. 하지만 loading이 추가되었기에 변경해줘야 한다.

###### src/App.js
```js
import React, { useState, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";

function App( {store} ) {
  const inputRef = useRef();
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(store.getState());
    });
    return () => {
      unsubscribe(); // cleanUp
    }
  }, [store]);

  return (
    <p>
      <input type="text" ref={inputRef}/>
      <button onClick={click}>add Todo</button>
    </p>
    <ul>
      {state.todos.map((todo, i) => {
        if(todo.done === null) {
          return (
            <li>
              {todo.text} <button onClick={() => clickDone(i)}>
              완료
              </button>
            </li>
          );
        }
        return (
          <li
            style={{
              textDecoration: "line-through",
            }}>
            {todo.text}
          </li>
        )
    })}
    </ul>
  )

  function click() {
    const text = inputRef.current.value;
      if (text === '') return; // 빈칸이면 리턴
      store.dispatch(addTodo(text)); //text만 넘긴다.
  }

  function clickDone(i) {
    store.dispatch(completeTodo(i));
    // dispatch를 인덱스 값으로 넘긴다.
  } 
}
```

#### 의존성 정리하기
###### src/reducers/index.js
```js
import {combineReducers} from "redux";
import todos from "./todos";
import loading from "./loading";

const reducer = combineReducers({
  todos,
  loading,
});

// {
// todos: [],
// loading: boolean,
// }

// 위의 형태를 root State라고 부를 수 있다.
// 실제로 root State를 만들어 관리해야 한다.
// todos, loading 각각 state 형태를 만들어서
// 타입을 가져와 이곳에서 조합해서 합쳐야한다.
// 그리고 합쳐진 root State를 사용한다.

export default reducer;
```

###### src/store.js
```js
import { createStore } from "redux";
import reducer from './reducers';

const store = creteStore(reducer);

export default store;
```

store.js 에서는 조합된 rootReducer를 가져와서 인자로 삼고 생성만 해준다.

reducers/index.js 에서는 각각의 reducer들을 import 하고 조합해서 내보낸다.

todos, loading은 각자의 initialState가 존재한다.

###### 왜 분리하는가?
애플리케이션이 커지면, state 가 복잡해진다.

```js
[
  {
    text: "Hello",
    completed: false,
  },
];
```

```js
{
  todos: [
    {
      text: 'Hello',
      completed: false
    }
  ],
  filter: 'SHOW_ALL'
}
```

- 리듀서를 크게 만들고, state 를 변경하는 모든 로직을 담을 수도 있다.
- 리듀서를 분할해서 만들고, 합치는 방법을 사용할 수 있다.
  - todos만 변경하는 액션들을 처리하는 A 라는 리듀서 함수를 만들고,
  - loading 만을 변경하는 액션들을 처리하는 B 라는 리듀서 함수들 만들고,
  - A 와 B 를 합침

### 한번에 다하는 리듀서

```js
import { ADD_TODO, COMPLETE_TODO } from "./actions";

export function todoApp(previousState, action) {
  if (previousState === undefined) {
    return { todos: [], filter: "SHOW_ALL" };
  }
  if (action.type === ADD_TODO) {
    return {
      todos: [...previousState.todos, { text: action.text, completed: false }],
      filter: previousState.filter,
    };
  }
  if (action.type === COMPLETE_TODO) {
    const todos = [];
    for (let i = 0; i < previousState.todos.length; i++) {
      todos.push(
        i === action.index
          ? { ...previousState.todos[i], completed: true }
          : { ...previousState.todos[i] }
      );
    }
    return { todos, filter: previousState.filter };
  }
  return previousState;
}
```

### 리듀서 분리

```js
export function todos(previousState, action) {
  if (previousState === undefined) {
    return [];
  }
  if (action.type === ADD_TODO) {
    return [...previousState.todos, { text: action.text, completed: false }];
  }
  if (action.type === COMPLETE_TODO) {
    const newState = [];
    for (let i = 0; i < previousState.length; i++) {
      newState.push(
        i === action.index
          ? { ...previousState[i], completed: true }
          : { ...previousState[i] }
      );
    }
    return newState;
  }
  return previousState;
}

export function filter(previousState, action) {
  if (previousState === undefined) {
    return "SHOW_ALL";
  }
  return previousState;
}
```

### 리듀서 합치기

```js
export function todoApp(previousState = {}, action) {
  return {
    todos: todos(previousState.todos, action),
    filter: filter(previousState.filter, action),
  };
}
```

#### 깔끔하게 다듬기
###### src/reducers/todos.js
```js
const initialState = [];

export default function todos(state = initialState, action) {
  if (action.type === ADD_TODO) {
    return [...state, action.todo];
  }
  if (action.type  === COMPLETE_TODO) {
    return state.map((todo, i) => {
      if (i === action.index) {
        return {
          ...todo,
          done: new Date().toISOString(),
        };
      }
      return todo;
    });
  }

  return state;
}
```

###### src/reducers/loading.js
```js
const initialState = false;

export default function loading(state = initialState, action) {
  return state;
}
```

react-redux를 안쓰고 연결하는 방법을 배웠다.
연결하는데 키포인트는 store에 접근할 수 있으면 자체적으로 커넥트 할 수 있다는 것이다.

1. 단일 store 를 만들고,
2. subscribe와 getState를 이용하여,
3. 변경되는 state 데이터를 얻어,
4. props로 계속 아래로 전달.

- componentDidMount - subscribe
- componentWillUnmount - unsubscribe

### Context로 연결하기
#### react-redux 안쓰고 연결하기
###### src/contexts/ReduxContext.js
```js
import React from 'react';

const ReduxContext = React.createContext();

export default ReduxContext;
```

###### src/index.js
```js

// ...
import ReduxContext from './contexts/ReduxContext';

ReactDOM.render(
  <ReduxContext.Provider value={store}>
    <App />
  </ReduxContext.Provider>,
  document.getElemnetById("root");
}
```
이제 스토어를 Props로 전달하지 않는다.
그리고 어디서든지 store를 사용할 수 있다.

###### src/components/Child.jsx
```js
import React, {useContext, useRef, useState, useEffect} from 'react';
import ReduxContext from '../contexts/ReduxContext';
import {addTodo, completeTodo} from '../actions';

export default function Child() { //App.js 로직
  const store = useContext(ReduxContext);

  const inputRef = useRef();
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(store.getState());
    });
    return () => {
      unsubscribe();
    }
  }, [store]);

  return (
    <div>
      <p>
        <input type="text" ref={inputRef}/>
        <button onClick={click}>add Todo</button>
      </p>
      <ul>
        {state.todos.map((todo, i) => {
          if(todo.done === null) {
            return (
              <li>
                {todo.text} <button onClick={() => clickDone(i)}>
                완료
                </button>
              </li>
            );
          }
          return (
            <li
              style={{
                textDecoration: "line-through",
              }}>
              {todo.text}
            </li>
          )
      })}
      </ul>
    </div>
  )

  function click() {
    const text = inputRef.current.value;
    if (text === '') return;
      store.dispatch(addTodo(text));
  }

  function clickDone(i) {
    store.dispatch(completeTodo(i));
  } 
}
```

###### src/App.js
```js
import React from "react";
import "./App.css";
import Child from "./components/Child";

function App() {
  return (
    <div>
      <h2>App</h2>
        <Child />
    </div>
  )
}
```

최종적으로 `Context`를 추가하고 컴포넌트들을 정리하면 위와 같은 모습을 뛴다.

### react-redux

- Provider 컴포넌트를 제공해준다.
- connect 함수를 통해 "컨테이너"를 만들어준다.
  - 컨테이너는 스토어의 state와 dispatch(액션) 을 연결한 컴포넌트에 props 로 넣어주는 역할을 한다.
  - 그렇다면 필요한 것은?
    - 어떤 state 를 어떤 props 에 연결할 것인지에 대한 정의
    - 어떤 dispatch(액션) 을 어떤 props 에 연결할 것인지에 대한 정의
    - 그 props 를 보낼 컴포넌트를 정의

```
npm i react-redux
```

###### src/index.js
```js

// ...
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElemnetById("root");
}
```

`react-redux`로 부터 `Provider`를 import 한다.
앞서 제작한 `ReduxContext` 대신에 `Provider`를 사용한다.

#### 차이점
- Context API
    - value를 항상 입력해줘야 한다.
- react-redux Provider
    - 명확하게 store를 세팅할 수 있다.

`Context API`를 사용할때는 우리가 하기 때문에 `child`라는 하위 컴포넌트에서 `store`를 거쳐서 사용해야 했다.

`react-redux`는 `store`를 직접 거치지 않도록 도움을 준다.

- store를 직접 사용하는 방식
    - store.getState() =>
    - store.dispatch(액션생성자())
    - 상태를 가져오고 상태를 변경 시키는 2개 밖에 리액트에서 할게 없다.

- store를 직접 사용하지 않는 방식
    - store.getState().todos =>
    - store.dispatch(액션생성자()) wrapping 한 함수 =>
    - 위 두가지를 props로 받는다.

```js
function C() {
  // 스토어와 연결해서, props를 받아온다.
  return (
    <Child todos={todos} addTodo={addTodo} completeTodo={comoleteTodo}>
  );
}
```

#### Container
스토어랑 연결해서 Child 에게 props를 넘겨주는 아이

###### src/containers/ChildContainer.jsx
```js
import React from 'react';
import Child from '../components/Child';
import { connect } from 'react-redux';

// 1. HOC
// connect(설정)(컴포넌트);

// 스토어의 스테이트를 프롭스로 바꾸는 설정
const mapStateToProps = state => ({
  todos: state.todos // 루트스테이트의 todos
}) // {todos: []}

// 스토어한테 디스패치하는 함수를 프롭스로 바꾸는 설정
const mapDispatchToProps = dispatch => ({
  addTodo : (text) => { // view에서 들어온다.
    dispatch(addTodo(text));
  },
  completeTodo: (index) => {
    dispatch(completeTodo(i));
  },
}); // {addTodo: 함수, completeTodo: 함수}

export default connect(mapStateToProps, mapDispatchToProps)(Child);
// {todos: [], addTodo: 함수, completeTodo: 함수} <= props

// 2. Hook
export default function ChildContainer() {
  const todos = useSelector((rootState) => rootState.todos);
  const dispatch = useDispatch();

  const addTodoProps = useCallback(
    (text) => {
      dispatch(addTodo(text));
    }, 
    [dispatch]
  );

  const completeTodoProps = useCallback(
    (i) => {
    dispatch(completeTodo(i));
    },
    [dispatch]
  );

  return (
    <Child 
      todos={todos}
      addTodo={addTodoProps}
      completeTodo={completeTodoProps}>
    )
}

```

###### 1. HOC
`Child`는 View에 집중하고 View에 관련된것만 테스트한다. (텍스트의 유효성 검사) => 컴포넌트

`ChildContainer` 넘어온 데이터를 스토어에 전달해준다. => 콘테이너

이제는 두 가지를 분리해서 작업해야한다.

###### 2. Hook
__useSelector__ : react-redux에서 제공해주는 Hook
__useDispatch__ : react-redux에서 제공

#### Presentational Component
스토어는 모르고, props 만 받아 사용하는 아이

View만 관련있고 비즈니스 로직은 없다.
아래 코드에서는 todos 만 받아서 어떻게 보여줄까 고민만 한다.

즉 우리가 아는 컴포넌트이다.

###### src/components/Child.jsx
```js
import React, { useRef } from 'react';

export default function Child({ todos, addTodo, completeTodo }) {
   const inputRef = useRef();

  return (
    <div>
      <p>
        <input type="text" ref={inputRef}/>
        <button onClick={click}>add Todo</button>
      </p>
      <ul>
        {todos.map((todo, i) => {
          if(todo.done === null) {
            return (
              <li>
                {todo.text} <button onClick={() => clickDone(i)}>
                완료
                </button>
              </li>
            );
          }
          return (
            <li
              style={{
                textDecoration: "line-through",
              }}>
              {todo.text}
            </li>
          )
        })}
      </ul>
    </div>
  )

  function click() {
    const text = inputRef.current.value;
      if (text === '') return;
      addTodo(text);
  }

  function clickDone(i) {
    completeTodo(i);
  }
}
```

###### src/App.js
```js
import React from "react";
import "./App.css";
import ChildContainer from "./containers/ChildContainer";

function App() {
  return (
    <div>
      <h2>App</h2>
      <ChildContainer />
    </div>
  )
}
```

----
###### 슬라이드8

## Redux Advanced(1)

### Async Action with Redux

#### 비동기 작업을 어디서 하느냐? 가 제일 중요
  - 액션을 분리한다.
    - Start
    - Success
    - Fail
    - ... 등등
  - dispatch 를 할때 해준다.
    - 당연히 리듀서는 동기적인 것 => Pure
    - dispatch 도 동기적인 것

#### myBooks 프로젝트로 알아보는 비동기
```
npm i redux

npm i react-redux
```

#### 세팅하기
##### 액션을 생성한다.
###### src/actions.js
```js

export const START_GET_BOOKS = 'START_GET_BOOKS';
export const SUCCESS_GET_BOOKS = 'SUCCESS_GET_BOOKS';
export const FAIL_GET_BOOKS = 'FAIL_GET_BOOKS';

// 처음 로딩할때
export const startGetBooks = () => ({
  type: START_GET_BOOKS,
});

// 리퀘스트, 리스폰스
export const successGetBooks = (books) => ({
  type: SUCCESS_GET_BOOKS,
  books,
});

// 오류 발생
export const failGetBooks = (error) => ({
  type: FAIL_GET_BOOKS,
  error,
});
```

##### 리듀서를 생성한다.
###### src/reducers/index.js
```js
import { combineReducers } from 'redux';
import books from './books';

const reducer = combineReducers({
  books
});

export default reducer;
```

###### src/reducers/books.js
```js
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
```

##### 스토어를 생성한다.
###### src/store.js
```js
import { createStore } from 'redux';
import reducer from './reducers';

const store = createStore(reducer);

export default store;
```

##### 스토어를 가져다 쓴다.
###### src/index.js
```js
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
```

#### 사용하기
데이터를 props로 바꿔서 넣어주는 애가 필요하다.

###### src/containers/BookListContainer.jsx
```js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startGetBooks, successGetBooks, failGetBooks } from '../actions.js';
import { useCallback } from 'react';
import BookList from '../components/BookList';

export default function BookListContainer({ token }) {
  // mapStateToProps  
  const { books, loading, error } = useSelector(state => state.books);
  
  // mapDispatchToProps
  const dispatch = useDispatch();

  const start = useCallback(
    () => {
      dispatch(startGetBooks());
    }, 
    [dispatch],
  );

   const success = useCallback(
    (books) => {
      dispatch(successGetBooks(books));
    }, 
    [dispatch],
  );

   const fail = useCallback(
    (error) => {
      dispatch(failGetBooks(error));
    }, 
    [dispatch],
  );

  return (
    <BookList 
      books={books} 
      loading={loading} 
      error={error}
      start={start}
      success={success}
      fail={fail}
      token={token}
    />
  );
}
```

`start` `success` `fail` 3개 모두 넣는 이유는 비동기 로직을 보내고 받을때 전부다 dispatch를 계속 날려줘야 하기 때문이다.

######  src/components/BookList.jsx
```js
import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';

export default function BookList({
  books,
  loading,
  error,
  start,
  success,
  fail,
  token
}) {

  useEffect(() => {
    async function getBooks() { // Hook에서 Async가 안되므로 새로운 함수를 만들어준다.
      try {
        start(); // 스타트 호출
        const response = await axios.get('https://api.marktube.tv/v1/book', {
          headers: {
          Authorization: `Bearer ${token}`,
        },
        });
        const books = response.data;
        success(books); // 받아온 데이터
      } catch (error) {
       fail(error); // 에러처리
      }
    }
    getBooks(); // 함수를 바로 호출한다.
  }, [start, success, fail, token]);

  return (
    <div>
    {loading && <div>로딩 중...</div>}
    {error !== null && <div>에러다!!!</div>}
      {books.map((book) => {
        <div>{book.title}</div>
      })}
    </div>
  );
}
```

```js
// src/pages/Home.js
import React from 'react';
import withAuth from '../hocs/withAuth';
import BookListContainer from '../containers/BookListContainer';

function Home({ token }) {
    return (
      <div>
        <h1>Home</h1>
        <BookListContainer token={token} />
      </div>
    );
}

export default withAuth(Home);
```

#### Presentational Component 를 만들기 위한 정리

###### src/containers/BookListContainer.jsx
```js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startGetBooks, successGetBooks, failGetBooks } from '../actions.js';
import { useCallback } from 'react';
import BookList from '../components/BookList';
import axios from 'axios';

export default function BookListContainer() {
  // mapStateToProps  
  const { books, loading, error } = useSelector(state => state.books);
  
  // mapDispatchToProps
  const dispatch = useDispatch();

  const getBooks = useCallback(async () => {
    try {
      dispatch(startGetBooks());
      await sleep(2000);
      const response = await axios.get('https://api.marktube.tv/v1/book', {
      headers: {
        Authorization: `Bearer ${token}`,
        },
      });
      const books = response.data;
      dispatch(successGetBooks(books));
      } catch (error) {
        dispatch(failGetBooks(error));
    }
  }, [dispatch, token]);

  return (
    <BookList 
      books={books} 
      loading={loading} 
      error={error}
      getBooks={getBooks}
    />
  );
}

  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }
```

###### src/components/BookList.jsx
```js

import React from 'react';
import { useEffect } from 'react';

export default function BookList({
  books,
  loading,
  error,
  getBooks,
}) {

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  return (
    <div>
    {loading && <div>로딩 중...</div>}
    {error !== null && <div>에러다!!!</div>}
      {books.map((book) => {
        return <div>{book.title}</div>
      })}
    </div>
  );
}
```

비동기 로직이 컴포넌트에서 컨테이너로 옮겨졌다.
`getBooks()`라는 함수를 props로 받아서 잘 호출했는지만 확인하면 된다.

나머지는 `books, loading, error` 어떻게 보이는지 테스트만 하면 된다.

### 리덕스 미들웨어
- 미들웨어가 __"디스패치"__ 의 앞뒤에 코드를 추가할 수 있게 해준다.
- 미들웨어가 여러개면 미들웨어가 __"순차적으로"__ 실행된다.
- 두 단계가 있다.
  - 스토어를 만들때, 미들웨어를 설정하는 부분
    - {createStore, applyMiddleware} from Redux
  - 디스패치가 호출될때 실제로 미들웨어를 통과하는 부분
- dispatch 메소드를 통해 store로 가고 있는 액션을 가로채는 코드

#### 설정예시

###### src/store.js
```js

import { createStore } from 'redux';
import reducer from './reducers';

function middleware1(store) {
  return next => {
    console.log('middleware1', 1);
    return action => {
      console.log('middleware1', action.type, 2);
      const returnValue = next(action);
      console.log('middleware1', action.type, 3);
      return returnValue;
    };
  };
} // 함수가 함수를 리턴한다.

function middleware2(store) {
  return next => {
    console.log('middleware2', 1);
    return action => {
      console.log('middleware2', action.type, 2);
      const returnValue = next(action);
      console.log('middleware2', action.type, 3);
      return returnValue;
    };
  };
}

const store = createStore(reducer, applyMiddleware(middleware1, middleware2));

// enhancer 자리에 applyMiddleware라는 redux에서 제공하는 미들웨어 함수를 불러온다.

// applyMiddleware(실행 순서에 맞게 인자로 넣는다.)

// 이제 store는 미들웨어1과 2의 영향을 받는다.
// 미들웨어1, 미들웨어2, reducer가 실행되고 다시 미들웨어2, 미들웨어1로 작동된다.

// store 개체를 가지고 있으므로 getState와 dispatch를 할 수 있다.

export default store;
```

### 대표적인 미들웨어

#### redux-devtools
```
npm install -D redux-devtools-extension
```
브라우저에 [redux devtools](https://github.com/zalmoxisus/redux-devtools-extension) 를 설치한다.

위 주소의 깃 허브에 적힌 설치 방법에 따라 세팅한다.

```js
 const store = createStore(
   reducer, /* preloadedState, */
+  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 );
```

문구를 사용할때 마다 써야하지만 npm install 을 통해 설치한 redux-devtools-extension은 그 과정을 생략할 수 있게 도와준다.

###### src/store.js
```js

import { createStore } from 'redux';
import reducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(reducer, composeWithDevTools(applyMiddleware()));

export default store;
```

`composeWithDeveTools`로 `applyMiddleware`를 감싸면 위 생략된 코드를 적은것과 동일한 세팅이 완료된다.

크롬 개발자 도구를 통해 redux 개발에 필요한 devtools 기능을 사용할 수 있다.

#### redux-thunk
- 리덕스 미들웨어
- 리덕스를 만든 사람이 만들었다. (Dan)
- 리덕스에서 비동기 처리를 위한 라이브러리
- 액션 생성자를 활용하여 비동기 처리
- 액션 생성자가 액션을 리턴하지 않고, 함수를 리턴함

이전의 코드에서는 액션 생성자 함수가 단타로 실행되었지만 redux-thunk를 사용하면 액션 생성자가 비동기 처리를 해준다.

###### src/actions.js
```js
// 기존의 액션
export const failGetBooks = (error) => ({
  type: FAIL_GET_BOOKS, // 액션 생성자
  error,
}); // 액션을 리턴한다.

// thunk
export const getBooksThunk = () => {
  return async () => {
    // 비동기 로직
  };
};
```

```
npm i redux-thunk
```

###### src/index.js
```js
// redux-thunk
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
```

만약 `action`이 함수면 액션을 실행한다.
이때 dispatch와 getState를 인자로 넣는다.

###### src/actions.js
```js
// thunk 예제
import axios from 'axios';

// ...

export const getBooksThunk = (token) => {
  return async (dispatch) => {
    try {
      dispatch(startGetBooks());
      await sleep(2000);
      const response = await axios.get('https://api.marktube.tv/v1/book', {
      headers: {
        Authorization: `Bearer ${token}`,
        },
      });
      const books = response.data;
      dispatch(successGetBooks(books));
      } catch (error) {
        dispatch(failGetBooks(error));
    }
  };
};

  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }
```

###### src/containers/BookListContainer.jsx
```js
import { getBooksThunk } from '../actions';
// ...

const dispatch = useDispatch();

const getBooks = useCallback (() => {
  dispatch(getBooksThunk(token));
}, [dispatch, token])

// ...
```

###### src/store.js
```js
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
```

앞서 마지막으로 정리한 코드와 동일한 결과를 보여준다.

#### 추상화하기
API를 사용하는 아이들은 서비스로 추상화가 가능하다.

###### src/services/BookService.js
```js
import axios from 'axios';

const API_URL = 'https://api.marktube.tv/v1/book';
// 한 레벨 더 추상화 한다.
// 공통적인 항목이므로 밖으로 뺀다.

export default class BookService {
  // token
  // return books
  static async getBooks(token) {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async addBook() {

  }

  static async deleteBook() {
    
  }

  static async editBook() {
    
  }
}
```

###### src/actions.js
```js
import axios from 'axios';
import BookService from '../services/BookService';

// ...

export const getBooksThunk = (token) => {
  return async (dispatch) => {
    try {
      dispatch(startGetBooks());
      await sleep(2000);
      const books = await BookService.getBooks(token);
      dispatch(successGetBooks(books));
      } catch (error) {
        dispatch(failGetBooks(error));
    }
  };
};

  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }
```

조금 더 깔끔하게 한 단계 추상화됐다.
다른 부분에 대해서도 늘려보자.

#### 로그인 요청 부분 수정해보기.

###### ßsrc/reducers/index.js
```js
/*
  auth: {
    token: null | string,
    loading: boolean,
    error: null | Error
  }
*/

import auth from './auth';

// ...

const reducer = combineReducers({
  books,
  auth,
});

export default reducer;
```

###### src/actions.js
```js

// ...

import UserService from '../services/UserService'

export const START_GET_TOKEN = 'START_GET_TOKEN';
export const SUCCESS_GET_TOKEN = 'SUCCESS_GET_TOKEN';
export const FAIL_GET_TOKEN = 'FAIL_GET_TOKEN';

const startGetToken = () => ({
  type: START_GET_TOKEN,
});

const successGetToken = () => ({
  type: SUCCESS_GET_TOKEN,
  token,
});

const failGetToken = (error) => ({
  type: FAIL_GET_TOKEN,
  error,
});

export const loginThunk = (email, password, history) => {
  return async (dispatch) => {
    try {
        dispatch(startGetToken());
        await sleep(2000);
        const token = await UserService.login(email, password);
        localStorage.setItem('token', token);
        dispatch(successGetToken(token));
        history.push('/');
      } catch (error) {
        dispatch(failGetToken(error));
      }
  };
};

// ...

```

###### src/services/UserService.js
```js
import axios from 'axios';

const API_URL = 'https://api.marktube.tv/v1/me';

export default class UserService {
  // email, password
  // token return 
  static async login(email, password) {
    const response = await axios.post(API_URL, {
      email,
      password,
    });
    return response.data.token;
  }
}
```

###### src/reducers/auth.js
```js
import { START_GET_TOKEN, SUCCESS_GET_TOKEN, FAIL_GET_TOKEN } from '../actions'

const initialState = {
  token: null,
  loading: false,
  error: null,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case: START_GET_TOKEN
    return {
      token: null,
      loading: ture,
      error: null,
    }
    case: SUCCESS_GET_TOKEN
    return {
      token: action.token,
      loading: false,
      error: null,
    }
    case: FAIL_GET_TOKEN
    return {
      token: null,
      loading: false,
      error: action.error,
    }
    case: SUCCESS
    default:
      return state;
  }
}
```

###### src/components/SigninForm.jsx
```js
import React, { useRef } from 'react';

export default function SigninForm({ loading, error, login }) {
  const emailRef = useRef();
  const passwordRef = useRef();

  return (
    <div>
      <p>
        <input type="text" ref={emailRef}/>
      </p>
      <p>
        <input type="password" ref={passwordRef}/>
      </p>
      <p>
        <button onClick={click}>로그인</button>
      </p>
      {loading && <p>로딩 중..</p>}
      {error !==null && <p>에러다.</p>}
    </div>
  );

  function click() {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // 유효성 체크

    login(email, password);
  };
}
```

###### src/containers/SigninFormContainer.jsxß
```js
import React, { useCallback } from 'react';
import SigninForm from '../components/SigninForm';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../actions';
import { useHistory } from 'react-router-dom';

export default function SigninFormContainer() {
  const history = useHistory();

  // mapStateToProps
  const {loading, error} = useSelector(state => stat.auth);

  const dispatch = useDispatch();

  const login = useCallback(
    async (email, password) => {
      dispatch(loginThunk(email, password, history));
    }, 
    [dispatch, history],
  );
  return <SigninForm loading={loading} error={error} login={login} />;
}
```

###### src/pages/Signin.jsx
```js
import React from 'react'; 
import { Redirect } from 'react-router-dom';
import SigninFormContainer from '../containers/SigninFormContainer';

export default function Signin() {
  const token = localStorage.getItem('token');
  if (token !== null) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1>Signin</h1>
      <SigninFormContainer />
    </div>
  );
}
```

#### 토큰 추상화하기
Service는 다루는 관심사를 하나의 테마로 묶은 덩어리들이다.

###### src/services/TokenService.js
```js

const LOCALSTORAGE_KEY = 'token';

export default class TokenService {
  static get() {
    return localStorage.getItem(LOCALSTORAGE_KEY);
  }

  static save() {
    return localStorage.setItem(LOCALSTORAGE_KEY, token);
  }

  static remove() {
    return localStorage.removeItem(LOCALSTORAGE_KEY);
  }
}
```

```js
TokenService.save(token)

// 서비스를 만들어 위와 같은 방식으로 사용할 수 있다.
```