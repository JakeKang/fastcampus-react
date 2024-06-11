# 컴포넌트 간 통신

외부컴포넌트 ⇒ `props` ⇒ 내부컴포넌트

많은 depth 컴포넌트의 구조인 경우 전달해야 한다.

부모의 경우에는 callback 함수로 보내야 한다.

###### A의 Button을 클릭하여 E를 변경하려면
```js
// A 컴포넌트
<div>
  <B />
  <button>클릭</button>
</div>

// B 컴포넌트
<div>
  <C />
</div>

// C 컴포넌트
<div>
  <D />
</div>

// D 컴포넌트
<div>
  <E />
</div>

// E 컴포넌트
<div>
  {props.value}
</div>
```

1. `<A />` 컴포넌트에서 `button`에 `onClick` 이벤트를 만들고,
2. button을 클릭하면, `<A />`의 state 를 변경하여, `<B />` 로 내려주는 props 를 변경
3. `<B />`의 props가 변경되면, `<C />`의 props 에 전달
4. `<C />`의 props가 변경되면, `<D />`의 props 에 전달
5. `<D />`의 props가 변경되면, `<E />`의 props 에 전달

A 컴포넌트는 `state`를 변경해 바뀌면 하위 차례대로 `render` 되면서 E 컴포넌트는 `props`를 받아서 `render`를 다시해야한다.

중간 B, C, D 컴포넌트는 의미 없이 계속 `render`가 발생한다.

```js
import React from "react";

class A extends React.Component {
  state = {
    value: "아직 안바뀜"
  };

  render() {
    console.log("A render");
    return (
      <div>
        <B {...this.state} />
        <button onClick={this._click}>E 의 값을 바꾸기</button>
      </div>
    );
  }

  _click = () => {
    this.setState({
      value: "E 의 값을 변경"
    });
  };
}

export default A;

const B = props => (
  <div>
    <p>여긴 B</p>
    <C {...props} />
  </div>
);

const C = props => (
  <div>
    <p>여긴 C</p>
    <D {...props} />
  </div>
);

const D = props => (
  <div>
    <p>여긴 D</p>
    <E {...props} />
  </div>
);

const E = props => (
  <div>
    <p>여긴 E</p>
    <h3>{props.value}</h3>
  </div>
);
```

무의미하고 극단적인 사례가 발생한다.
즉 사고의 발생 위험이 높다.

### 상위 컴포넌트를 변경하기

###### E의 Button을 클릭하여 A의 p를 변경하려면

1. `<A />` 에 함수를 만들고, 그 함수 안에 state 를 변경하도록 구현, 그 변경으로 인해 p 안의 내용을 변경.
2. 만들어진 함수를 props 에 넣어서, `<B />` 로 전달
3. `<B />` 의 props 의 함수를 `<C />` 의 props 로 전달
4. `<C />` 의 props 의 함수를 `<D />` 의 props 로 전달
5. `<D />` 의 Props 의 함수를 `<E />` 의 props 로 전달, `<E />` 에서 클릭하면 props 로 받은 함수를 실행

```js
import React from "react";

class A extends React.Component {
  state = {
    value: "아직 안바뀜"
  };

  render() {
    console.log("A render");
    return (
      <div>
        <h3>{this.state.value}</h3>
        <B change={this.change} />
      </div>
    );
  }

  change = () => {
    this.setState({
      value: "A 의 값을 변경"
    });
  };
}

export default A;

const B = props => (
  <div>
    <p>여긴 B</p>
    <C {...props} />
  </div>
);

const C = props => (
  <div>
    <p>여긴 C</p>
    <D {...props} />
  </div>
);

const D = props => (
  <div>
    <p>여긴 D</p>
    <E {...props} />
  </div>
);

const E = props => {
  function click() {
    props.change();
  }
  return (
    <div>
      <p>여긴 E</p>
      <button onClick={click}>클릭</button>
    </div>
  );
};
```

## Context API
정확하게 길을 맞춰줘서 원하는 정보를 컴포넌트간에 전달하는게 아니라,
어디서든지 접근할 수 있는 객체가 필요하다.

### useContext

###### 하위 컴포넌트 전체에 데이터를 공유하는 법
- 데이터를 Set 하는 컴포넌트
  - 가장 상위 컴포넌트 => 프로바이더
- 데이터를 Get 하는 컴포넌트
  - 모든 하위 컴포넌트에서 접근 가능
    - 1. 컨슈머로 하는 방법
    - 2. 클래스 컴포넌트의 this.context로 하는 방법
    - 3. 펑셔널 컴포넌트의 useContext로 하는 방법

Redux를 사용하지 않고 Context API를 하드하게 관리하는 방법을 배운다.

### 데이터를 Set 하기
 - 일단 컨텍스트를 생성한다.
 - 컨텍스트, 프로바이더를 사용한다.
 - value 를 사용한다.

컴포넌트의 가장 상위에 데이터를 Set 해준다.

```js
// contexts/PersonContext.js
import React from 'react';

const PersonContext = React.createContext();

export default PersonContext;
// set, get 둘다 사용할 수 있다.
```

```js
//App.js
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import Home from './pages/Home';
import Signin from './pages/Signin';
import NotFound from './pages/NotFound';
import Error from './pages/Error';

import PersonContext from './contexts/PersonContext';

const persons = [
  {name: "Kang", age: 26},
  {name: "test", age: 28},
];

function App() {
  return (
    <ErrorBoundary Error={Error}> // 원래는 가장 상위이다.
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

export default App;
```

PersonContext에서 설정한 값 persons는 Provider로 감싼 자식요소 어디서든 얻어가서 사용할 수 있다.

### 데이터를 Get 하기 (1) - Consumer
- 1. 컨텍스트를 가져온다.
- 2. 컨텍스트, 컨슈머를 사용한다.
- 3. value 를 사용한다.

```js
// ConsumerTest.jsx
import PersonContext from '../contexts/PersonContext';

export default function ConsumerTest() {
  return (
    <div>
      <PersonContext.Consumer>
        { (value) => <p>{JSON.stringify(value)}</p>}
      </PersonContext.Consumer>
    </div>
  );
}
```

NotFound 페이지로 이동하면 설정한 persons 가 그려진다.

### 데이터를 Get 하기 (2) - class
- 1. static contextType 에 컨텍스트를 설정한다.
- 2. this.context => value 이다.

```js
// classContextTest.jsx
import PersonContext from '../contexts/PersonContext';

export default class classContextTest extends React.Component {
  static contextType = PersonContext;

  render() {
    return (
      <p>{JSON.stringify(this.context)}</p> // context가 value가 된다.
    )
  }
}
```

class의 단점은 `static contextType` 하나만 가질 수 있다.

### 데이터를 Get 하기 (3) - functional
- 1. useContext 로 컨텍스트를 인자로 호출한다.
- 2. useContext 의 리턴이 value 이다.

```js
import React from 'react';

export default function FunctionalContext() {
  const persons = React.useContext(PersonContext);

  return(
    <div>
      <PersonContext.Consumer>
        {(value) => <p>{JSON.stringify(value)}</p>}
      </PersonContext.Consumer>
    </div>
  )
}
```

###### Hook 진도 전 withRouter 추가 복기
withRouter 위치 상관없이 history, location, match를 쓸 수 있었다.
- Context API를 사용해서 어디서든지 데이터를 뽑아서 props로 넣어줄 수 있다.

1. useHistory : history를 통채로 가져온다.
2. useLocation : history 안의 Location을 통채로 가져온다.
3. useParams : Location의 Params를 가져온다.
4. useRouteMatch : Match

# 리덕스(중요!)

## 상태 관리 라이브러리의 필요성

1. **상태 업데이트 로직의 분리**
   - 복잡한 상태 업데이트 로직들을 컴포넌트에서 분리 할 수 있다.
   - 이를 모듈화 하여 여러 파일들로 저장함으로써 더욱 높은 유지보수성을 만들 수 있다.
2. **더 쉬운 상태 관리**
   - 상태 관리 라이브러리가 없더라면 컴포넌트가 지닌 setState 를 사용해서 열심히 상태를 조합하고, 이를 여러 컴포넌트를 거쳐서 props 로 전달하는 번거로운 과정을 상태 관리 라이브러리는 이러한 작업을 훨씬 쉽게 해준다.

무조건 필요하지는 않지만. 규모가 큰 앱에서는 있는 것이 편하다.

[당신에게 Redux는 필요 없을지도 모릅니다.](https://medium.com/lunit-engineering/%EB%8B%B9%EC%8B%A0%EC%97%90%EA%B2%8C-redux%EB%8A%94-%ED%95%84%EC%9A%94-%EC%97%86%EC%9D%84%EC%A7%80%EB%8F%84-%EB%AA%A8%EB%A6%85%EB%8B%88%EB%8B%A4-b88dcd175754)

컴포넌트 끼리의 통신에서 불필요한 작업을 하지 않기 위해

하지만 React 16.3 에서 Context API가 좋아지면서, 별도의 라이브러리 없이 할 수 있다.

> 글로벌 상태 관리란, 컴포넌트 간의 데이터 교류, 특히 부모-자식 관계가 아닌 컴포넌트끼리 데이터 교류를 하는것을 의미합니다.

**but, 그럼에도 불구하고 리덕스를 사용하는 이유**

- 리덕스를 사용하여 프로젝트를 진행하는 흐름이 이미 손에 매우 익숙해져서 리덕스를 사용하는 개발방식이 Context API를 사용하여 개발하는것보다 편하기 때문.
- 이미 리덕스를 사용하고 있는 프로젝트들은 무수히 많기 때문
- 리덕스에서 제공하는 미들웨어같은 강력한 기능은 Context API 로 대체 할 수 없기 때문

## 개념정리

### 액션 (Action)

State에 어떠한 변화가 필요할 때, Action을 발생시킨다. 이것은 하나의 객체로 표현되어 있으며 다음과 같은 형식으로 구성되어 있다.

```jsx
{
  type: "TOGGLE_VALUE";
}
```

액션 객체는 `type`필드를 필수적으로 가지고 있어야 하고, 그외의 값은 자유롭게 구성 가능하다.

### 액션 생성함수 (Action Creator)

액션을 만드는 함수. 단순히 파라미터를 받아와서 액션 객체 형태로 만든다.

```jsx
function addTodo(data) {
  return {
    type: "ADD_TODO",
    data,
  };
}

// 화살표 함수로도 만들 수 있습니다.
const changeInput = (text) => ({
  type: "CHANGE_INPUT",
  text,
});
```

### 리듀서 (Reducer)

리듀서는 변화를 일으키는 함수. 두개의 파라미터를 받아온다.

```jsx
function reducer(state, action) {
  // 상태 업데이트 로직
  return alteredState;
}
```

### 스토어 (Store)

리덕스에서는 한 어플리케이션 당 하나의 스토어를 만든다. 스토어 안에는 현재의 앱 상태와 리듀서, 추가적으로 몇가지 내장 함수들이 있다.

### 디스패치 (Dispatch)

스토어 내장 함수중 하나, 디스패치는, 액션을 발생시키는 것이라 이해하면 된다. dispatch 라는 함수에 액션을 파라미터로 전달. 그렇게 호출 하면 스토어는 리듀서 함수를 실행시켜서 해당 액션을 처리하는 로직이 있다면 액션을 참고하여 새로운 상태로 만든다.

### 구독 (Subscribe)

스토어 내장 함수중 하나, subscribe 함수는, 함수 형태의 값을 파라미터러 받아온다. subscribe 함수에 특정 함수를 전달하면, 액션이 디스패치 될 때마다 전달한 함수가 호출 된다.

## 리덕스의 3가지 규칙

1. 하나의 어플리케이션 안에는 하나의 스토어
2. 상태(State)는 읽기 전용
3. 리듀서는 pure function.

imutablejs

immerjs

redux chunk ⇒ recux saga

[Redux (3) 리덕스를 리액트와 함께 사용하기](https://velog.io/@velopert/Redux-3-%EB%A6%AC%EB%8D%95%EC%8A%A4%EB%A5%BC-%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%99%80-%ED%95%A8%EA%BB%98-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-nvjltahf5e)

# Redux Basic

## 컴포넌트 간 통신

`npx create-react-app component-communication`

### 하위 컴포넌트를 변경하기

A 의 button 를 클릭하여 E 를 변경하려면

- `<A />` 컴포넌트에서 button 에 onClick 이벤트를 만들고,
- button 을 클릭하면, `<A />` 의 state 를 변경하여, `<B />` 로 내려주는 props 를 변경
- `<B />` 의 props 가 변경되면, `<C />` 의 props 에 전달
- `<C />` 의 props 가 변경되면, `<D />` 의 props 로 전달
- `<D />` 의 props 가 변경되면, `<E />` 의 props 로 전달

### 상위 컴포넌트를 변경하기

E 의 button 를 클릭하여 A 의 p 를 변경하려면

- `<A />` 에 함수를 만들고, 그 함수 안에 state 를 변경하도록 구현, 그 변경으로 인해 p 안의 내용을 변경.
- 만들어진 함수를 props 에 넣어서, `<B />` 로 전달
- `<B />` 의 props 의 함수를 `<C />` 의 props 로 전달
- `<C />` 의 props 의 함수를 `<D />` 의 props 로 전달
- `<D />` 의 Props 의 함수를 `<E />` 의 props 로 전달, `<E />` 에서 클릭하면 props 로 받은 함수를 실행

## Redux 개요

"(1) 단일 스토어를 만드는 법" 과,
"(2) 리액트에서 스토어 사용하는 법" 을 익히는 시간
단일 스토어다!

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

### [만들기] 단일 스토어 사용 준비하기

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


### [사용하기] 준비한 스토어를 리액트 컴포넌트에서 사용하기

import react-redux

connect 함수를 이용해서 컴포넌트에 연결

## Action - 액션

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


### 리덕스의 액션 생성자란 ?

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

### 액션 준비 코드

###### src/actions.js
```js
// actions.js

// 액션의 type 정의
// 액션의 타입 => 액션 생성자 이름
// ADD_TODO => addTodo
export const ADD_TODO = "ADD_TODO";

// 액션 생산자
// 액션의 타입은 미리 정의한 타입으로 부터 가져와서 사용하며,
// 사용자가 인자로 주지 않습니다.
export function addTodo(text) {
  return { type: ADD_TODO, text }; // { type: ADD_TODO, text: text }
}
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

## Reducers - 리듀서

### 리덕스의 리듀서란 ?

- 액션을 주면, 그 액션이 적용되어 달라진(안달라질수도...) 결과를 만들어 줌.

- 그냥 함수입니다.
  - Pure Function
  - Immutable
    - 왜용 ?
    - 리듀서를 통해 스테이트가 달라졌음을 리덕스가 인지하는 방식

```js
function 리듀서(previousState, action) {
  return newState;
}​
```

- 액션을 받아서 스테이트를 리턴하는 구조
- 인자로 들어오는 previousState 와 리턴되는 newState 는
  다른 참조를 가지도록 해야합니다.

  - 액션을 주면, 그 액션이 적용되어 달리진(혹은 달라지지 않는) 결과를 만들어 준다.

- 그냥 함수이다.
  - Pure Function
  - Immutable (새로운 객체로 만들어져야 한다.)
    - 왜용?
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

## 스토어를 만드는 함수 createStore

> redux 로 부터 import
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

### 스토어 만들기

```js
// store.js
import { todoApp } from "./reducers";
import { createStore } from "redux";
import { addTodo } from "./actions";

const store = createStore(todoApp);
console.log(store);

console.log(store.getState());

setTimeout(() => {
  store.dispatch(addTodo("hello"));
}, 1000);

export default store;
```

```js
// index.js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import store from "./store";

store.subscribe(() => {
  const state = store.getState();

  console.log("store changed", state);
});

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
```

---

## 로직을 추가하기

> action 을 정의하고, action 생성자를 만들고, reducer 를 수정

### action 을 정의하고,

```js
// actions.js

// 액션의 type 정의
// 액션의 타입 => 액션 생성자 이름
// ADD_TODO => addTodo
export const ADD_TODO = "ADD_TODO";
export const COMPLETE_TODO = "COMPLETE_TODO";

// 액션 생산자
// 액션의 타입은 미리 정의한 타입으로 부터 가져와서 사용하며,
// 사용자가 인자로 주지 않습니다.
export function addTodo(text) {
  return { type: ADD_TODO, text }; // { type: ADD_TODO, text: text }
}
```

### action 생성자를 만들고,

```js
// actions.js

// 액션의 type 정의
// 액션의 타입 => 액션 생성자 이름
// ADD_TODO => addTodo
export const ADD_TODO = "ADD_TODO";
export const COMPLETE_TODO = "COMPLETE_TODO";

// 액션 생산자
// 액션의 타입은 미리 정의한 타입으로 부터 가져와서 사용하며,
// 사용자가 인자로 주지 않습니다.
export function addTodo(text) {
  return { type: ADD_TODO, text }; // { type: ADD_TODO, text: text }
}

export function completeTodo(index) {
  return { type: COMPLETE_TODO, index }; // { type: COMPLETE_TODO, index: index}
}
```

### reducer 를 수정

```js
import { ADD_TODO, COMPLETE_TODO } from "./actions";

export function todoApp(previousState, action) {
  if (previousState === undefined) {
    return [];
  }
  if (action.type === ADD_TODO) {
    return [...previousState, { text: action.text, completed: false }];
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
```

### dispatch

```js
// store.js
import { todoApp } from "./reducers";
import { createStore } from "redux";
import { addTodo, completeTodo } from "./actions";

const store = createStore(todoApp);
console.log(store);

console.log(store.getState());

setTimeout(() => {
  store.dispatch(addTodo("hello"));
  setTimeout(() => {
    store.dispatch(completeTodo(0));
  }, 1000);
}, 1000);

export default store;
```

### 애플리케이션이 커지면, state 가 복잡해진다.

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

- 리듀서를 크게 만들고, state 를 변경하는 모든 로직을 담을 수도 있습니다.
- 리듀서를 분할해서 만들고, 합치는 방법을 사용할 수 있습니다.
  - todos 만 변경하는 액션들을 처리하는 A 라는 리듀서 함수를 만들고,
  - filter 만을 변경하는 액션들을 처리하는 B 라는 리듀서 함수를 만들고,
  - A 와 B 를 합침.

###### 예시
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

- 리듀서를 크게 만들고, state 를 변경하는 모든 로직을 담을 수도 있다.
- 리듀서를 분할해서 만들고, 합치는 방법을 사용할 수 있다.
  - todos만 변경하는 액션들을 처리하는 A 라는 리듀서 함수를 만들고,
  - loading 만을 변경하는 액션들을 처리하는 B 라는 리듀서 함수들 만들고,
  - A 와 B 를 합침

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