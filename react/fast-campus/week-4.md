# Higher Order Component(HoC) 알아보기

## **HOC란 ?**

- 컴포넌트를 인자로 받아서 컴포넌트를 리턴하는 함수
- 컴포넌트 로직 재 사용을 위한 React의 고급 기술
- React API의 한 파트는 아니고 개발 패턴 혹은 방법론

### **대표적인 예**

- Redux - connect()
- Relay - Fregment Container
- ReactRouter - withRouter()

보통 HOC에는 prefix로 `with`를 붙인다.

### **크로스-커팅 문제(Cross-cutting Concerns)에 HOC 사용**

- 크로스 커팅 문제란

  - 어플리케이션 전반에 적용될 수 있는 우려사항이며, 전체 어플리케이션에 영향을 주는 것

    HOC는 사이드 이펙트가 없는 순수함수임.

  - 예를 들면 로깅, 유저 인증 로직, 로딩화면 표시 같은 어플리케이션 거의 모든 모듈에서 필요하거나 중복 사용되는것

HOC는 컴포넌트를 수정하거나 상속을 이용하여 동작을 복사하지 않음, 원래 컴포넌트를 래핑해서 작성

### **원본 컴포넌트를 변경하지 말고 합성 (Composition)을 사용**

HOC 내부에서 원본 컴포넌트의 프로토타입을 수정, 변경하지 말것

```jsx
// Bad.
// input 컴포넌트는 enhanced 컴포넌트와 별도로 재사용 될수 없음
// componentWillReceive가 변형된 또 다른 HOC에 적용하면 첫번째 HOC의 그닝이 무시됨.
// 이 HOC 는 라이프사이클메소드가 없는 function component에서 사용할 수 없음.

function logProps(InputComponent) {
  InputComponent.prototype.componentWillReceiveProps = function (nextProps) {
    console.log("Current props: ", this.props);
    console.log("Next props: ", nextProps);
  };

  return InputComponent;
}
const EnhancedComponent = logProps(InputComponent);

// Good.
// 다른 HOC와의 충돌 가능성을 피하면서 위의 HOC와 동일한 기능 수행
// 클래스, 함수 컴포넌트에서 동일하게 작동
// pure function 이기 때문에 다른 HOC, 그 자체로도 구성 가능

function logProps(WrappedComponent) {
  return class extends React.Component {
    componentWillReceiveProps(nextProps) {
      console.log("Current props: ", this.props);
      console.log("Next props: ", nextProps);
    }
    render() {
      // Wraps the input component in a container, without mutating it. Good!
      return <WrappedComponent {...this.props} />;
    }
  };
}
```

## **규칙(Convention)**

### **래핑된 컴포넌트로 HOC와 관련 없는 props 전달하기**

```jsx
render() {
	// HOC에만 해당하고 통과 해서는 안되는 extra prop 필터링
  const { extraProp, ...passThroughProps } = this.props;

	// 추가될 props. 일반적으로 state나 instance method.
  const injectedProp = someStateOrInstanceMethod;

  // 래핑된 컴포넌트에 props 전달
  return (
    <WrappedComponent
      injectedProp={injectedProp}
      {...passThroughProps}
    />
  );
}
```

### 합성 가능성 (Composability) 최대한으로 할 것

HOC의 일반적인 signiture는 다음과 같다.

```jsx
// React Redux's `connect`
const ConnectedComment = connect(commentSelector, commentActions)(CommentList);
```

이것을 분해해보면 아래와 같은 작업을 쉽게 확인할 수 있다.

```jsx
// connect는 HOC를 return.
const enhance = connect(commentListSelector, commentListActions);

// return된 HOC는 Redux store에 연결된 컴포넌트를 return.
const ConnectedComment = enhance(CommentList);
```

즉, connect는 HOC(고차컴포넌트)를 리턴하는 HOF(고차함수)이다.

connect와 같은 단일 인자 HOC는 `component ⇒ component` 의 signiture를 가진다. input type과 output type이 동일한 함수는 쉽게 합성 할 수 있다.

```jsx
// 이렇게 하는 대신...
const EnhancedComponent = withRouter(
  connect(commentSelector)(WrappedComponent)
);

// 함수 합성 유틸리티를 사용할 수 있다.
// compose(f, g, h) is the same as (...args) => f(g(h(...args)))
const enhance = compose(
  // 모두 단일 인자 HOC.
  withRouter,
  connect(commentSelector)
);
const EnhancedComponent = enhance(WrappedComponent);
```

### 쉬운 디버깅을 위해 Display name을 wrap할 것

```jsx
function withSubscription(WrappedComponent) {
  class WithSubscription extends React.Component {
    /* ... */
  }
  WithSubscription.displayName = `WithSubscription(${getDisplayName(
    WrappedComponent
  )})`;
  return WithSubscription;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}
```

## 주의 사항

### render 메서드 안에서 고차 컴포넌트를 사용하지 말것

React의 비교 알고리즘은 컴포넌트 ID를 사용하여 기존 sub tree를 업데이트 해야 하는지, 버리고 새로운 노드를 마운트 노드를 마운트 해야하는지 결정한다.

render에서 반환된 컴포넌트가 이전 렌더링의 컴포넌트와 동일(===)하다면 Reac가 새 트리와 비교하여 반복적으로 sub tree를 업데이트 한다. 만약 동일하지 않다면 이전 sub tree는 완전히 마운트 해제 된다.

일반적으로 이것을 생각할 필요가 없지만 컴포넌트의 렌더링 메서드 안에서는 컴포넌트에 HOC를 적용할 수 없기 때문에 중요하다.

```jsx
render() {
  // 렌더링 할때마다 새로운 버전의 EnhancedComponent가 생성된다.
  // EnhancedComponent1 !== EnhancedComponent2
  const EnhancedComponent = enhance(MyComponent);
  // 때문에 매번 하위 트리 전체가 unmount/remount 된다.
  return <EnhancedComponent />;
}
```

성능 상의 문제 뿐만 아니라 다시 마운트 하게 되면 컴포넌트의 state와 모든 하위항목들이 손실 된다.

Enhanced 컴포넌트는 외부에서 HOC를 적용하여 한번만 생성되도록 해서 Component ID가 렌더링 간에 일관되게 유지해야 한다.

드물게 HOC를 동적으로 적용해야 하는 경우 컴포넌트의 라이프사이클 메소드나 생성자 내에서 HOC를 수행할 수도 있다.

### static method는 꼭 copy 할 것

HOC를 컴포넌트에 적용할 때 원본 컴포넌트는 컨테이너 컴포넌트에 래핑 되기 때문에 원본 컴포넌트의 정적 메서드가 없다.

```jsx
// static method 정의
WrappedComponent.staticMethod = function () {
  /*...*/
};
// HOC 적용
const EnhancedComponent = enhance(WrappedComponent);

// enhanced component에는 static method가 없음.
typeof EnhancedComponent.staticMethod === "undefined"; // true
```

이 문제를 해결하기 위해 메서드를 반환하기 전에 컨테이너에 메서드를 복사한다.

```jsx
function enhance(WrappedComponent) {
  class Enhance extends React.Component {
    /*...*/
  }
  // 어떤 메서드를 복사해야하는 지 정확히 알아야 한다.
  Enhance.staticMethod = WrappedComponent.staticMethod;
  return Enhance;
}
```

모든 non-React 정적 메서드를 자동으로 복사하기 위해 hoist-non-react-statics를 사용할 수 있다.

```jsx
import hoistNonReactStatic from "hoist-non-react-statics";
function enhance(WrappedComponent) {
  class Enhance extends React.Component {
    /*...*/
  }
  hoistNonReactStatic(Enhance, WrappedComponent);
  return Enhance;
}
```

다른 해결 방법으로는 정적 메서드를 컴포넌트 자체와 별도로 내보는 것이다.

```jsx
// 이것 대신..
MyComponent.someFunction = someFunction;
export default MyComponent;

// 메서드르 별도로 export 한다.
export { someFunction };

// 사용하는 모듈에서 둘다 import 한다.
import MyComponent, { someFunction } from "./MyComponent.js";
```

### ref는 전달 할 수 없다. ref를 사용하지 말것

HOC에 대한 컨벤션은 모든 props를 래핑된 컴포넌트에 전달하는 것이지만 ref는 props가 아니기 때문에 불가능하고 이것은 key 처럼 React가 특별히 처리한다.

HOC를 통한 enhanced 컴포넌트에 ref를 추가하면 ref는 래핑된 컴포넌트가 아닌 가장 바깥쪽 컨테이너 컴포넌트 인스턴스를 참조한다.

이런 문제가 있을 경우 가장 이상적인 방법은 ref 사용을 피하는 것이다.

input 필드에 포커스를 맞춰야 하는 경우

```jsx
function Field({ inputRef, ...rest }) {
  return <input ref={inputRef} {...rest} />;
}

// HOC 적용
const EnhancedField = enhance(Field);

// 클래스 컴포넌트의 render()
<EnhancedField
  inputRef={(inputEl) => {
    // ref 콜백을 일반 prop으로 전달하고 다른 이름을 부여
    this.inputEl = inputEl;
  }}
/>;

// 명령형(imperative) 메서드를 호출할 수 있다.
this.inputEl.focus();
```

갑자기 명령형 메서드가 궁금해졌다.

[번역 - 함수형 프로그래밍이란 무엇인가?](https://sungjk.github.io/2017/07/17/fp.html)

## 선언형 vs 명령형(Declarative vs Imperative)

함수형 프로그래밍은 선언적 패러다임으로, 흐름 제어를 명시적으로 기술하지 않고 프로그램 로직이 표현된다는 것을 의미한다.

### **명령형** 프로그램

- 원하는 결과를 얻기 위해 특정 단계를 설명하는 코드 라인을 사용
- 흐름 제어: 어떻게(How) 하는지.

```jsx
const doubleMap = (numbers) => {
  const doubled = [];
  for (let i = 0; i < numbers.length; i++) {
    doubled.push(numbers[i] * 2);
  }
  return doubled;
};

console.log(doubleMap([2, 3, 4])); // [4, 6, 8]
```

### **선언적** 프로그램

- 흐름 제어를 추상화하고, 대신에 **데이터 흐름** 을 설명하는 코드 라인을 사용
- 데이터 흐름(data flow): 무엇을(What) 하는지.

```jsx
const doubleMap = (numbers) => numbers.map((n) => n * 2);

console.log(doubleMap([2, 3, 4])); // [4, 6, 8]
```

**명령형** 코드는 구문를 자주 사용한다.

**구문(statement)** 은 어떤 동작을 수행하는 코드 조각. 일반적으로 사용되는 구문의 예로는 `for`, `if`, `switch`, `throw` 등이 있다.

**선언적** 코드는 표현에 더 의존한다.

**표현식(expression)** 은 어떤 값을 평가하는 코드 조각. 표현식은 대개 함수 호출, 값 그리고 결과 값을 생성하기 위해 평가되는 연산자의 조합이다.

## Controlled Component 와 Uncontrolled Component

### **Form**

HTML 폼 엘리먼트는 폼 엘리먼트 자체가 내부 상태를 가지기 때문에, React의 다른 DOM 엘리먼트와 조금 다르게 동작한다

- input
- select
- textarea
- ...

`React`는 `Component` 안에 있는 상태를 관리하려고 한다.
만약 어떤 상태가 있는데 그 상태가 변경되면 `render`를 다시한다.

하지만 HTML 폼 엘리먼트 자체가 내부 상태를 가지기 때문에 값을 입력해도 내가 관리하지 못하는 상태가 된다.

### 엘리먼트의 '상태'를 누가 관리하느냐
- 엘리먼트를 가지고 있는 컴포넌트가 관리
    - Controlled
- 엘리먼트의 상태를 관리하지 않고, 엘리먼트의 참조만 컴포넌트가 소유
    - Uncontrolled

### Controlled Componeent

- React에서 엘리먼트를 가지고 있는 컴포넌트가 state를 관리
- 대부분의 경우에 폼을 구현하는데 Controlled component를 사용하는 것이 좋다.
- 데이터를 변경할 수 있는 모든 방법에 대해 이벤트 핸들러를 작성하고 React 컴포넌트를 통해 모든 입력 상태를 연결해야 한다.

```jsx
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

### Uncontrolled Component

- React에서 엘리먼트의 state를 제어하지 않고, 엘리먼트의 참조만 컴포넌트가 소유
- 장점은 이벤트가 발생할 때 핸들링을 할 뿐 state를 가지고 있지 않기 때문에 render가 실행되지 않는다. 모든 동작은 Native DOM의 동작에 의존.
- 단점은 state가 없으므로 state를 제어할 방법이 없고 결국 state를 제어하기 위해서는 state를 보유해야 한다.
  - 해당 엘리먼트를 wapped component로 만들고, 그 안에서 state를 만들어 사용하는 방법도 있다.
  - Pure component로 만드는 방법도 있다.
    - props나 State를 얕은(Shallow) 비교해서 변경점이 없으면 render를 다시 실행하지 않음.

```jsx
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.input.current.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

### (추가) 로그인 요청으로 알아보는 Controlled Component

`Signin` 컴포넌트가 `input` 태그를 관리하기 위해 `value`를 컴포넌트 값이 가지고 있어야 한다.

상태를 관리하기 위해 `state`를 이용한다.

```js
// pages/Signin.jsx

import React from 'react';

export default class Signin extends React.Component {
    state = { // state는 항상 객체여야한다.
        email: '' // key와 value로 관리한다.
    }
    render() {
    return (
        <div>
            <h1>Signin</h1>
            <p>
                <input type="text" value={this.state.email}/>
            </p>
            <p>
                <input type="password" />
            </p>
            <p>
                <button onClick={this.click}>로그인</button>
            </p>
        </div>
    );
}

    click = () => { 
        // 이메일과 패스워드의 value
        
    }
}
```

최초 빈값을 넣고 실행하면 에러가 발생한다.

`value`에 `state` 값을 할당했는데 유저가 값을 변경할때마다 `state` 값을 변경하지 않으면 동작하지 않으므로 `onChange`와 같은 이벤트를 연결해줘야한다.

```js
<input type="text" value={this.state.email}/> // 에러 발생

<input type="text" value={this.state.email} onChange={this.change} /> // 로 변경

change = (e) => { // input 태그에서 변경된 값을 넣어줘야 한다.
    const text = e.target.value
    // console.log(text); // 한글자마다 render 된다.
    this.setState({email: text}); // 입력때마다 계속 쌓이면서 render 된다.
    // state는 input 태그의 value 와 정확하게 sync를 이루게 된다.
}
```

`input` 태그의 `value` 값을 `state`가 관리하므로 `Controlled Component`가 된다.

장점으로 타이핑을 할때 `state`를 확인하면 정확하게 적힌 값과 똑같다는 판단을 할 수 있다.

아래 예시로 확인해보자.

```js
// pages/Signin.jsx

import React from 'react';

export default class Signin extends React.Component {
    state = { // state는 항상 객체여야한다.
        email: '' // key와 value로 관리한다.
    }
    render() {
    return (
        <div>
            <h1>Signin</h1>
            <p>
                <input type="text" value={this.state.email} onChange={this.change} />
            </p>
            <p>
                <input type="password" />
            </p>
            <p>
                <button onClick={this.click}>로그인</button>
            </p>
            {this.state.email.length > 20 && <p>너무 길어</p>}
        </div>
    );
}

    click = () => { 
        // 이메일과 패스워드의 value
        
    }

    change = (e) => {
    const text = e.target.value
    this.setState({email: text});
    }
}
```

email `input`에 입력된 글자수가 20을 넘어가면 "너무 길어"라는 텍스트를 그려준다.

1. 조건문 등을 이용해 글자수 제한, 정규 표현식을 이용한 email 체크 등이 가능해진다.
2. sync가 이루어지고 매 변화마다 트래킹해서 UI를 변경해줄 수 있다.

### (추가) 로그인 요청으로 알아보는 Uncontrolled Component
`Controlled Component`와 다르게 버튼을 눌렀을때만 email 값을 얻어 오고 싶을때 사용할 수 있다.

```js
// pages/Signin.jsx

import React from 'react';

export default class Signin extends React.Component {
    state = { // state는 항상 객체여야한다.
        email: '' // key와 value로 관리한다.
    }
    render() {
    return (
        <div>
            <h1>Signin</h1>
            <p>
                <input type="text" value={this.state.email} onChange={this.change} />
            </p>
            <p>
                <input type="password" id="password" />
            </p>
            <p>
                <button onClick={this.click}>로그인</button>
            </p>
            {this.state.email.length > 20 && <p>너무 길어</p>}
        </div>
    );
}

    click = () => { 
        // 이메일과 패스워드의 value
        const passwordDom = document.querySelector('#password');

        console.log('click', this.state.email, passwordDom.value);
    }

    change = (e) => {
    const text = e.target.value
    this.setState({email: text});
    }
}
```

버튼을 클릭할 시 `email`과 `password`의 `value`를 출력한다.
리액트에서는 직접 `DOM`을 찾아서 뭔가를 하는걸 지양한다.

로직을 시작할때 `document`에서 `DOM`을 찾아내는게 아니라
내부에 변수를 하나 둔다.

#### React.createRef();
`componentDidMount()` 가 실행도는 시점에 `DOM`에서 `ref`를 통해서 받아온 정보에 대한 참조를 저장할 수 있다.

`render`가 일어나지 않으면 `{this.passwordRef}`가 연결되지 않는다.
최초의 `render` 즉 `componentDidMount()` 직전에는 `passwordRef`가 제대로 된 값을 가지고 있지 않다.

`console.log()` 로 확인해보면 `passwordRef`는  `{current: input}` 객체형태로 값은 `null`로 가지고 있다.

```js
// pages/Signin.jsx

import React from 'react';

export default class Signin extends React.Component {
    passwordRef = React.createRef();
    state = { // state는 항상 객체여야한다.
        email: '' // key와 value로 관리한다.
    }
    render() {
    return (
        <div>
            <h1>Signin</h1>
            <p>
                <input type="text" value={this.state.email} onChange={this.change} />
            </p>
            <p>
                <input type="password" ref={this.passwordRef} />
            </p>
            <p>
                <button onClick={this.click}>로그인</button>
            </p>
            {this.state.email.length > 20 && <p>너무 길어</p>}
        </div>
    );
}

    click = () => { 
        // 이메일과 패스워드의 value
        const password = this.passwordRef.current.value;
        console.log('click', this.state.email, password);
    }

    change = (e) => {
    const text = e.target.value
    this.setState({email: text});
    }
}
```

###### 차이점
- `document.querySelector`로 `DOM`을 얻어오는 방법은 일회성으로 얻어온다.
- `React.createRef()`는 인스턴스가 만들어질때 레퍼런스를 하나 두고 `current` 값이 최초에 `null` 인 상태이고, `render`하면서 지정을 하면 한번 지정이되고 난 후 부터 사용할때마다 `input` 태그를 얻어온다.

`ref`는 어떤 태그에도 달릴 수 있다. `document.querySelector` 가 아닌 레퍼런스를 만들어서 `render`할때 지정해서 활용할 수 있다.

`Uncontrolled Components`에서 말하는 `input` 태그의 특징만을 가진게 아닌 어떤 `DOM`에도 연결해서 사용할 수 있다는걸 말한다.

__`DOM`을 확실히 알아야할때 `React.createRef()`를 만들어야한다.__

###### Reference (참조)
한 객체가 다른 객체를 연결하거나 연결하는 수단으로 작용하는 객체 간의 관계이다.

## Login 요청하기

## npm ci

[CI 환경을 위한 npm ci - Npm ci for Continuous Integration](https://medium.com/@trustyoo86/ci-%ED%99%98%EA%B2%BD%EC%9D%84-%EC%9C%84%ED%95%9C-npm-ci-npm-ci-for-continous-integration-850fc48dd4cc)

#### axios
```
npm i axios
```

HTTP 클라이언트로 서버에 요청을 하는 가장 전통적인 방법은 `XMLHttpRequests` 이고 브라우저가 좋아지면서 새로운 스펙으로 추가된게 `fetchAPI`이다.

axios는 `XMLHttpRequests`를 사용해서 `Promise` 형태로 제공 되도록 wrapping 했다.

##### 특징
- 구형 브라우저에서도 지원한다.
- Node.js 에서도 `http` 모듈을 wrapping해서 `requests`를 보낼 수 있다.
- 장점은 코드를 서버에서 돌려도 돌아갈 수 있다.
    - 서버사이드 렌더링시 요청이 서버에 들어가도 문제가 없을 수 있다.
    - 클라이언트와 서버 양쪽에서 똑같은 자바스크립트를 사용할 수 있다.
    - Isomorphic JavaScript (Universal Javascript)

로그인은 `ID`와 `Password`를 서버로 보내 데이터베이스에서 검사를 하게 된다. 인증된 사용자에게 API를 인증된 상태로 요청할 수 있게 `token`을 내려준다.

간단한 문자열 형태를 `token`이라고 하고,
문자열안에 정보까지 담긴 경우를 `jwt token(JSON Web Token)`이라고 한다.

그냥 `token`을 준다는건 서버에서 알고 있어야 한다는 말이다.
유저가 API를 요청하면 `token`만 오게되고 서버가 인증된 `token` 인지를 확인하는 절차가 필요하다.

그래서 `user` 테이블만 있는게 아니라 `token`을 발행한 `session` 테이블을 따로 관리하게 된다 `token` 과 누가 발행했는지에 대한 정보가 담겨있다.

```js
// pages/Signin.jsx

import React from 'react';
import axios from 'axios';

// ...
    click = () => { 
        // 이메일과 패스워드의 value
        const email = this.state.email;
        const password = this.passwordRef.current.value;
        console.log('click', email, password);

        // 서버에 요청 (Promise로 리턴되며 get, post 등 메소드를 이용하면 된다.)
        axios.post('https://api.marktube.tv/v1/me', {
            email,
            password
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    };

// ...
```

요청이 정상적으로 이루어지면 status: 200 코드, 에러가 발생하면 status: 400 코드가 반환된다.

#### try, catch, async, await
```js
// pages/Signin.jsx

import React from 'react';
import axios from 'axios';

// ...
    click = async() => { 
        // 이메일과 패스워드의 value
        const email = this.state.email;
        const password = this.passwordRef.current.value;
        console.log('click', email, password);

        // 서버에 요청
        try {
        const response = await axios.post('https://api.marktube.tv/v1/me', {
            email,
            password
        })
            console.log(reponse)
        } catch (error) {
            console.log(error);
        }
    };

// ...
```

로그인 성공시 콘솔로그에 `{data: {...}, status: 200, statusText: "", headers: {...}, config: {...}}` 가 찍히게 된다.

객체 `data: token: "d0e0b...."` 로 받아온 데이터를 알 수 있다.


### localStorage

Token

서버 ⇒ 토큰 ⇒ 클라이언트

##### 로그인 예제 받아온 token localstorage 저장

```js
// pages/Signin.jsx
import { Redirect } from 'react-router-dom';

    // render 바로 아래에 토큰이 있으면 Home 으로 이동하는 로직을 넣는다.
    // token이 있으면 Signin 페이지로 접근시 Home으로 자동 Redirect 된다.
    render() {
        const token = localStorage.getItem('token');
        if(token !== null) {
            return <Redirect to="/"/>;
        }
// ...
    click = async() => { 
        // 이메일과 패스워드의 value
        const email = this.state.email;
        const password = this.passwordRef.current.value;
        console.log('click', email, password);

        // 서버에 요청
        try {
        const response = await axios.post('https://api.marktube.tv/v1/me', {
            email,
            password
        })
        const token = response.data.token;
        localStorage.setItem('token', token);
        this.props.history.push('/'); // 토큰을 저장하고 페이지 이동
        } catch (error) {
            console.log(error);
        }
    };
// ...
```

```js
// pages/Home.jsx
import React from 'react';
import { Redirect } from 'react-router-dom';

export default function Home() {
    const token = localStorage.getItem('token');
    if(token === null) {
        return <Redirect to="/signin" />; // token이 없으면 로그인 페이지로 이동
    }
    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}
```

###### LocalStorage, SessionStorage
`LocalStorage`의 데이터는 저장 만료 기간이 없지만,
`SessionStorage`는 세션이 끝나면 데이터가 사라진다.
- 브라우저 삭제, 브라우저 종료 차이

### Rest API 로 데이터 가져오기

Postman import/export

## 로그인 페이지 HOC 실전 활용
똑같은 로직을 사용한다고 느끼면 HOC를 이용한다.
`token`을 인증하는 행위는 `Home` 뿐만 아니라 어디에서도 이용될 수 있다.

```js
// hocs/withAuth.jsx
import React from 'react';
import { Redirect } from 'react-router-dom';

export default function withAuth(Component) {
    //새로운 컴포넌트를 만들어준다.
    function WrappingComponent(props) { // 랩핑하는 컴포넌트
        // 정상인 상태가 아니라면
        const token = localStorage.getItem('token');
        if(token === null) {
            return <Redirect to="/signin" />;
        }
        return (<Component {...props} token={token}/>); // 별일이 없으면 Component를 리턴하면서 token을 넣어준다.
    }
    
    // 디버깅을 위해 withAuth가 달린 dispalyName 지정
    WrappingComponent.displayName = `withAuth(${Component.displayName})`;

    return WrappingComponent;
}
```

```js
// pages/Home.jsx
import React from 'react';
import withAuth from '../hocs/withAuth';

function Home( {token} ) {
    return (
        <div>
            <h1>Home</h1>
            <p>{token}</p> // 문제가 없으면 Home에서 token이 찍혀나온다.
        </div>
    );
}

// withAuth로 홈을 감싸서 보낸다.
// 모든 인증이 필요한 페이지에서 withAuth HOC를 사용할 수 있다.
export default withAuth(Home);
```

## Home 페이지 Book 데이터 받아오기 및 로딩표시
```js
import withAuth from '../hocs/withAuth';

class Home extends React.Component {
    state = { // 요청에 의한 상태 3가지 자주 사용하는 방법
        books: [],
        loading: false,
        error: null
    };
    render() {
        return (
            <div>
                <h1>Home</h1>
                <p>{this.props.token}</p>
                {this.state.loading && <p>로딩 중...</p>}
                {this.state.error !==null && <p>에러 발생</p>}
                <ul>
                    // Map을 돌면서 배열이 <li>{book}</li> 으로 바뀐다.
                    {this.state.books.map((book) => (
                    <li>{book.title}</li>
                    ))};
                </ul>
            </div>
        );
    }

    async componentDidMount() {
        // 책 가져오기
        try {
        this.setState({loading: true});
        await sleep(3000);
        const response = await axios.get('https://api.marktube.tv/v1/book', {
            headers: { // 공통적으로 많이 쓰이는 방식 (OAuth 방식)
                Authorization: `Bearer ${this.props.token}`, // 약속이라 의미가 있지 않다. React 강사 서버에 지정된 방법
            },
        });
        const books = response.data;
        this.setState({ books, loading: false });
        /* 받아온 책 데이터 예시
        {
        author: "정이든"
        bookId: 1809
        createdAt: "2020-07-22T22:36:58.000Z"
        deletedAt: null
        message: "끝까지 한번 가보자 !!"
        ownerId: "7a1fcf00-6cc6-4f54-84f1-2e55d301d4b5"
        title: "React 끝판왕"
        updatedAt: "2020-07-23T11:45:56.000Z"
        url: "www.test.com"
        }
        */
        } catch (error) {
            console.log(error);
            this.setState({ books: [], loading: false, error});
        }
    }
}

function sleep(ms) { // 로딩과 에러 확인을 위한 유틸
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

export default withAuth(Home);
```
강의 아이디를 통해 사이트에 책을 등록하면 지정된 api 서버에서 등록된 책을 받아와서 그려주게된다.
[my-books.now.sh](my-books.now.sh)

추가된 책은 `{data: Array(1) 0: {bookID, atuhor, createdAt, deletedAt, message, ownerId, title, uodateAt, url}}` 형태로 받아온다.

`componentDidMount`에 도착하면 로딩을 시작하고 데이터를 받아오면 `setState()`로 데이터를 넣어주는 방식으로 동작한다.

###### OAuth
웹, 앱 서비스에서 제한적으로 권한을 요청해 사용 할 수 있는 키를 발급해주는 것

## Hooks

**Hook이란?**

React 16.8 부터 추가되었다.

Hook은 특별한 함수. ex) useState는 state를 함수 컴포넌트 안에서 사용할 수 있게 해준다.

**언제 Hook을 사용할까?**

예전에는 state를 사용하기 위해 class로 바꿨지만. 이제 Hook을 이용해서 state를 사용할 수 있다.

### Hook을 만든 이유, 동기

- **컴포넌트 사이에서 state와 관련된 로직을 재사용하기 어렵다.**
  - 기존에는 render props, HOC 와 같은 패턴 등을 사용했지만 코드를 추적하기 어렵게 만듬
  - Hook을 사용하면 컴포넌트로부터 state 관련 로직을 추상화 할 수 있다.
- **복잡한 컴포넌트들은 이해하기 어렵다.**
  - 각 컴포넌트의 생명주기 메서드 에서 일관성 없는 동작이 이루어 지게 되고 이로 인해 버그와 무결성을 해치는 일이 많다.
  - state 관련 로직이 모든 공간에 있기 때문에 이러한 컴포넌트를 작게 만드는 것은 불가능
    - 이것이 React를 별도의 상태관리 라이브러리와 함께 결합해서 사용하는 이유
  - Hook을 통해 로직에 기반을 둔 작은 함수로 컴포넌트를 나눌 수 있다.
- **Class 는 사람과 기계를 혼동시킨다.**
  - class 는 코드의 재사용성과 코드구성을 어렵게 한다.
  - 최적화 시에 더 느린 경로로 되돌리는 의도하지 않은 패턴을 만들 수 있다.
  - Hook은 class 없이 react 기능을 사용하는 방법을 알려준다.
    - React 컴포넌트는 항상 함수에 가까움.

```js
// class Component State 공유
// ...
plus = () => {
    this.setState({
        count: this.state.count + 1,
    });
};

alert = () => {
    setTimeout(() => {
        alert(this.state.count);
    }, 1000)
}
```

위 코드에서 `alert`를 누르고 `plus`를 누르면 1초 후 `alert`를 눌렀을 때 상태가 아닌 실제로 뜰때는 `plus`로 인해 바뀐 `state` 값이 뜨게 된다.
이는 `classComponent`에서 `state`를 공유하고 있다는 말이다.

```js
// components/Counter.jsx
import React from 'react';

export default function Counter() {
    const [count, setState] = React.useState(0);
    return (
        <div>
            <h1>{count}</h1> // 최초 실행에 0으로 표현한다.
            <p>
                <button onClick={click}>+</button>
                <button onClick={click2}>alert</button>
            </p>
        </div>
    );

    // 오브젝트는 구조분해할당때 이름을 변경할 수 없지만 배열은 가능하다.
    function click() {
        setState(count + 1);
    }
    function click2() {
        setTimeout(() => {
            alert(count);
        }, 1000)
    }
}
```
`classComponent`와 동일한 로직이지만 `click2`를 누르고 `click`을 누르면 값이 올라가지만 `click2`는 0이 뜬다.
`click2`를 눌렀을 때의 값이 담기게 되고 `click` 과는 전혀 다르게 동작한다.

`classComponent`는 연결되어 있는게 단점이라면
`functionalComponent`는 분리되어 있는게 단점이다.

그래서 앞에 내용과 뒤의 내용이 변경이 없을 때 같다를 의미하는 연결하는 `Hooks`이 많이 나온다.

### Hook 사용 규칙

- **최상위(at the top level)**에서만 Hook을 호출해야 합니다. 반복문, 조건문, 중첩된 함수 내에서 Hook을 실행하면 안된다.
- **React 함수 컴포넌트** 내에서만 Hook을 호출해야 합니다. 일반 JavaScript 함수에서는 Hook을 호출해서는 안된다.
  - 직접 작성한 custom Hook 에서는 가능

### Basic Hooks
클래스 컴포넌트가 구현된 실체가 된 즉 인스턴스가 되는 순간은 마운트 되기 전이다.

최초에 한번 `render`가 발생하고 `state`, `props`에 의해 상태가 변화될때 `render`가 다시 호출된다.

```js
// 예제1
import React from 'react';

export default class Example1 extends React.Component {
    state = {
        count: 0,
    };

    render() {
        const { count } = this.state;
        return (
            <div>
                <p>You clicked {count} times</p>
                <button onClick={this.click}>Click me</button>
            </div>
        );
    }

    click = () => {
        this.setState({count: this.state.count + 1});
    };
}
```

```js
    click = () => {
        this.setState({count: this.state.count + 1});
    };
```
위 `click()`은 `class` 인스턴스안에 들어있게 된다.
그러므로 바뀌지 않는다.
`click` 이라는 멤버변수에 함수가 정해진 순간부터 그냥 사용하는것이다.

```js
// 예제2
import React from 'react';

export default function Error() {
    return (
        <div>
            <h1>에러다</h1>
        </div>
    )
    
    function click() {
    }
}
```
에러페이지의 `Error()`가 한번 실행되면 `render`되고 두번 실행되면 `render`가 다시 된다.

즉 함수가 매번 새로 실행된다.

`Error()` 함수가 실행되면 `click()` 함수가 다시 실행된다.

예제1의 `render()` 함수가 다시 실행되는 것과 예제2의 전체가 실행되는건 완전 다른 차원의 이야기이다.

state가 존재한다는건
```js
// 예제2
import React from 'react';

export default function Error() {
    state
    return (
        <div>
            <h1>에러다 {state}</h1>
        </div>
    )
    
    function click() {
    }
}
```

어떤한 `state`를 만들어 사용하고 다른 `state`로 바꿔서 실행할때는 내부적으로 실행 되지 않는다 함수를 다시한번 실행할때 `state`를 다른 값으로 실행해야 한다.

### State Hook
- state 를 대체 할 수 있다.
`state`를 다른 값으로 바꿔서 실행을 할 수 있게 도와준다.

```jsx
import React, { useState } from "react";

function Example() {
  const [count, setCount] = useState(0);
  // state 변수 : count
  // 0 으로 초기화
  // setter : setCount()

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

```jsx
// useState 구조
const [{varName}, set{varName}] = useState({initializeValue});
```

- useState를 호출 ⇒ state 변수 선언
- useState() 의 인자로 넘겨주는 값 ⇒ state의 초기값
- useState가 반환하는 것 ⇒ state 변수, 해당 변수를 갱신할수 있는 setter

###### useState 추가 예제
```js
// components/Counter.jsx
import React, { useState } from 'react';

export default function Counter() {
    const [count, setCount] = React.useState(0);
    return (
        <div>
            <h1>{count}</h1> // 최초 실행에 0으로 표현한다.
            <p>
                <button onClick={click}>+</button>
            </p>
        </div>
    );

    // 오브젝트는 구조분해할당때 이름을 변경할 수 없지만 배열은 가능하다.
    function click() {
        setCount(count + 1);
    }
}
```
```js
// pages/test.jsx
import React from 'react';
import Counter from '../components/Counter';

export default class Test extends React.Component {
    render() {
        return (
            <Counter />
        )
    }
}
```

초기값을 0으로 설정, 배열에 첫 번째 인자 값 `count`와, 값을 변경하는 `setCount` 함수를 분해 할당해서 넣는다.

이름을 마음대로 변경할 수 있는 이유는 각 인자가 값과 함수를 뜻하지만 이름을 확정해서 넣어주는 건 아니다.

최초 `render`시 `0`이 `count`에 세팅이 되고 `render` 된다.
버튼을 클릭하면 `0 + 1`을 한 결과물을 Set 해주는 함수를 실행한다.
다시 `render`가 되면서 `count`가 `1` 이 된 상태로 리턴 된다.

버튼을 누를 때마다 숫자가 올라가며 `Counter()` 함수가 다시 호출된다.
주의할 점은 `count`의 값이 `const`로 되어있다. `count`의 값이 실제로 변하지만 변한 값은 실제로 아무 관계가 없다.

첫 실행 시 `count`와 다음 실행 시 `count`는 전혀 다른 변수이다.
그러므로 `let`을 쓸 수 없고 `const`를 사용 해야한다.

클래스에서는 `state`를 항상 오브젝트로 설정해야하지만,
여기서는 상관없다. `primitive type`과 `객체` 도 가능하다.

```js
// components/Counter.jsx
import React from 'react';

export default function Counter() {
    const [state, setState] = React.useState({count: 0});
    return (
        <div>
            <h1>{state.count}</h1> // 최초 실행에 0으로 표현한다.
            <p>
                <button onClick={click}>+</button>
            </p>
        </div>
    );

    // 오브젝트는 구조분해할당때 이름을 변경할 수 없지만 배열은 가능하다.
    function click() {
        setState({count: state.count + 1});
    }
}
```
위와 같은 형식으로 변경해도 전혀 문제없이 동작한다.
하지만 권장 사항은 아니다.

## Functional Component
- Stateless Component : Hooks 등장 전
- Stateless Functional Component(SFC) : Hooks 전 typescript 명시

### Effact Hook

- 라이프 사이클을 훅으로 대체할 수 있다.

함수 컴포넌트에서 Data fetching과 같은 사이드 이펙트를 수행할 수 있다.

렌더가 완료된 후에 호출되는 콜백, componentDidMount, componentDidUpdate 이 실행되는 시점을 합쳐져 있다고 생각하면 됨.

```js
React.useEffect(() => {}, []); 
// 첫 번째 인자가 함수고 두 번째 인자가 배열이다.
// 함수 실행의 실행 타이밍을 결정하는게 두 번째 인자다. (인접성)
```

###### 예제1

```jsx
import React, { useState, useEffect } from "react";

function Example() {
  const [count, setCount] = useState(0);

  // componentDidMount componentDidUpdate와 유사
  useEffect(() => {
    // 브라우저 API 를 이용해서 title 업데이트
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

###### 예제2

```js
// components/Counter.jsx
import React from 'react';

export default function Counter() {
    const [count, setState] = React.useState(0);

    React.useEffect(() => {
        console.log('[]');
    }, []); // 빈 배열로 지정된 순간부터 최초 실행시 한번 실행 된다.
            // 빈 배열은 다른 어떤것에도 반응하지 않겠다고 설정한것
            // ['hello'] 라고 쓰면 hello가 변경될 시 다시 실행된다.
            // 즉 componentDidMount 와 동일하다.

    React.useEffect(() => {
        console.log('undefined');
    }); // 인자가 없는 형태
        // return이 다시 된 직후에 실행된다.
        // 현재는 count 말고 render할 방법이 없기 때문이다.
        // componentDidMount + componentDidUpdate 와 동일하다.
    
    React.useEffect(() => {
        console.log('count');
    }, [count]); // 위와 동일한 조건이다.
                // 순서는 항상 위에서 아래로 실행된다.
                // count 가 바뀌고 render된 직후에 실행된다.
                // 라이프사이클에 없는 형태지만 Hooks로 인해 가능해졌다.

    return (
        <div>
            <h1>{count}</h1>
            <p>
                <button onClick={click}>+</button>
                <button onClick={click2}>alert</button>
            </p>
        </div>
    );
    // ...
```

**side effect**

React 컴포넌트 에서 데이터 가져오기, 가입 설정, 수동으로 DOM 변경과 같은 부수적인 동작들.

- 정리(clean up)가 필요한 side effect
- 일반 side effect

### componentWillUnmount 의 역할은 어떻게?

useEffect에 넘겨준 callback에 return 할때 함수를 넣어주면 Unmount 되면서 실행.

React에서 이것을 Cleanup 이라고 부름

###### 예제1

```jsx
useEffect(() => {
  console.log("Mount");

  return () => {
    console.log("Unmount");
  };
}, []);
```

###### 예제2

`React.useEffect(()=>{},[])` 로 설정된 함수는 보통 `return`된 직후에 실행된다. 즉 `render`된 직후이다.

`return` 된 직후 실행되고 다음번에 실행되기 전에 뭔가 해주기 위해서 아래 예제처럼 이용할 수 있다.
```js
// cleanup 예제1
React.useEffect(() => {
    console.log('componentDidMount');
    return () => {
        // 1. 최초 실행된 결과물
        // 2. 다시 실행되려고 할때 return 먼저 실행하고 console.log를 실행
        // cleanup 이라고 부른다. => componentWillUnmount
    }
}, []); // 최초 render 직후 실행
```

```js
// cleanup 예제2
React.useEffect(() => {
    console.log('undefined', count);
    return () => {
        // cleanup
    console.log('cleanup', count); // cleanup이 먼저 실행되고
                            // 원래 있던 함수가 실행된다.
    }
});
//1. 최초 componentDidMount에 실행되고
//2. componentDidUpdate 전에 cleanup을 하고 실행한다.
```

위 예제의 콘솔로그는
```
cleanup 0
undefined 1
cleanup 1
undefined 2 
```
순서로 찍히게 된다.

##### 사용하는 이유
```js
React.useEffect(() => {
    const resize = () => {};
    // 설정하기
    window.addEventListener('resize', resize);
    return () => {
        window.removeEventListener('reisze', resize);
    };
});
```
위의 예제에 상태가 변경될때마다 `addEventListener`가 계속 들어가게된다.
그래서 cleanup시 초기화 시켜줄 수 있다.

자바스크립트 특성으로 함수형 `const resize = () => {};`를 가지고 있다가 `addEventListener`를 추가할 때는 다른 함수지만 `removeEventListener`할때 `resize`는 같은 함수이다.


##### 추가 설명
첫 번째 랜더링(1)
- from 리액트
- 컴포넌트에게 state가 0 일 때의 UI를 보여줘

첫 번째 랜더링(2)
- from 컴포넌트
- 랜더링 결과물로 <p>test 0</p> 가 있다.
- 모든 처리가 끝나고(브라우저에 그리고) 이펙트의 실행을 알린다.
- () => {document.title = "test 0"}
- 위의 함수는 useEffect(() => {
    document.title = "test ${count}"
}) 이다.

첫 번째 랜더링(3)
- from 리액트
- UI를 브라우저에게 DOM에 랜더링을 요청한다.

첫 번째 랜더링(4)
- from 브라우저
- DOM에 UI를 그린다.

첫 번째 랜더링(5)
- from 리액트
- 컴포넌트가 준 이펙트를 실행한다.

클릭 후 랜더링(1)
- from 컴포넌트
- 사람이 버튼을 클릭했다.
- state의 변경을 알린다.

클릭 후 랜더링(2)
- 상태가 변경 되었을때 UI를 요청한다.

클릭 후 랜더링(3)
- from 컴포넌트
- 랜더링 결과물로 <p>test 1</p> 가 있다.
- 또 다시 이펙트 실행을 알린다.

클릭 후 랜더링(4)
- from 리액트
- UI를 브라우저에게 DOM에 랜더링을 요청한다.

위의 상황이 계속 반복된다.

[useEffect 완벽가이드](https://rinae.dev/posts/a-complete-guide-to-useeffect-ko)

### Custom Hook

컴포넌트 재사용시 사용하던 전통적인 방법 2가지

- HOC (Higher-order component)
- render props

1. Custom hook 컴포넌트 트리에 새 컴포넌트를 추가하지 않고도 이것을 가능하게 한다.
2. Hook은 state 그 자체가 아닌 state 관련 로직을 재사용하는 방법.
3. 실제로 각각의 호출은 완전히 독립된 state를 가진다.
4. Custom Hook은 기능이라기 보다는 컨벤션에 가깝다.
5. 이름이 "`use`"로 시작하고 내부에서 다른 Hook을 호출 ⇒ **Custom Hook**

```js
// 커스텀 Hooks을 안 만드는 방법
import React from 'react';

export default function widthTest() {
    const [width, setWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
        const resize = () => {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <div>
            <h1>{width}</h1>
        </div>
    )
}
```

위 코드를 다른 컴포넌트에서도 사용하고 싶을때 state와 관련된 사항이므로 Hooks를 만들어 사용할 수 있다.

```js
// hooks/useWindowWidth.js
import React from 'react';
import { useState, useEffect } from 'react';

export default function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const onResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);
    return width;
}
```

```js
import React from 'react';
import useWindowWidth from '../hooks/useWindowWidth';

export default function Test() {
    const width = useWindowWidth();

    return (
        <div>
            <h1>{width}</h1>
        </div>
    )
}
```


## Additional Hooks
- 끊어짐을 연결해주는 행위
- Basic Hook을 가지고 내가 만들면 Custom Hook, 미리 만들어 놓은게 Additional Hooks

#### useReducer
- state가 복잡하고 즉 다수의 하윗값을 포함하는 복잡한 정적 로직을 만드는 경우
- 다음 state가 이전 state에 의존적인 경우( 이전 state의 영향을 받아서 변경되어야 하는 경우 )
- Redux 를 안다면 쉽게 사용 가능
=> Redux 이후에 다시 스터디

### useMemo
- 실제로 변하지 않더라도, 매번 실행되는 어떤 값
- 메모장에 기억을 하는 것 처럼 사용하는 `useMemo()`
- const 디펜던시 변경 없으면 고정 = useMemo(함수, 디펜던시)

```js
// components/Example9
import React, { useState } from 'react';

function sum(persons) {
  console.log('sum...');
  return persons.map(person => person.age).reduce((l, r) => l + r, 0);
}

const Example9 = () => {
  const [value, setValue] = useState('');
  const [persons] = useState([{ name: 'Mark', age: 38 }, { name: 'Hanna', age: 27 }]);

  function change(e) {
    setValue(e.target.value);
  }

  const count = sum(persons);

  return (
    <div>
      <input value={value} onChange={change} />
      <p>{count}</p>
    </div>
  );
};

export default Example9;
```

```js
import React from 'react';
import Example9 from '../components/Example9';

export default function useMemoTest() {
    return (
        <div>
            <Example9 />
        </div>
    )
}
```

위 코드를 실행하면 `input` 박스가 나오고 해당 `input` 박스는 컨트롤드 컴포넌트로 제작되어있다.

그래서 값을 입력할때마다 `sum..` 이라는 행위를 다시 하게 된다.

`sum..`은 `persons` 라는 배열을 받아서 나이를 합한 값을 리턴해준다.

`persons`이 바뀔때만 다시 계산해야 한다.
즉 `persons`이 바뀔때 Effect를 다시 실행 해줘야한다.
`useEffect`의 의존성과 동일하며 의존성을 표현해줘야 한다.
그 의존성에 영향이 있을때만 다시 표현해주는게 `useMemo()` 이다.

`useMemo()`는 값을 저장하는 Hook이다.
실행한 결과물이 `count`에 들어가고 의존성이 변경되지 않는한
`count`는 동일하기에 계산을 하지 않는다.

```js
// 1. 계산에 대한 함수
// 2. 의존성 = []
// 3. 함수가 아닌 결과를 가져야 하므로 return이 있다.
// 4. [] 의존성에 dependency 경고가 뜨면 우리가 잘못한거다.
// 5. [] 는 최초에 한번만 계산 되기 때문이다.
// 6. persons가 바뀔때마다 바뀌어야 하므로 persons를 넣는게 맞다.

const count = React.useMemo(() => {
    return sum(persons);
}, [persons]);
```

### useCallback
`useMemo()`가 `return`된 값을 `count`에 저장하는 형태라면

```js
// components/Example9
import React, { useState } from 'react';

function sum(persons) {
  console.log('sum...');
  return persons.map(person => person.age).reduce((l, r) => l + r, 0);
}

const Example9 = () => {
  const [value, setValue] = useState('');
  const [persons] = useState([{ name: 'Mark', age: 38 }, { name: 'Hanna', age: 27 }]);

  function change(e) {
    setValue(e.target.value);
  }

  const count = React.useMemo(() => {
    return sum(persons);
  }, [persons]);

  return (
    <div>
      <input value={value} onChange={change} />
      <p>{count}</p>
      <button onClick={click}>Click</button>
    </div>
  );

  function click() {
      console.log(persons);
  }
};

export default Example9;
```
위와 같이 작성하면 `function click()`이 매번 새롭게 만들어진다.
원래 `const[persons] = useState` 안의 값이 변수처럼 보이지만 `click()` 안의 `console.log(persons)`안에 들어있는 형태이다.
그러므로 타이핑을 아무리 하더라도 `click()` 함수는 변경점이 없다.
변경점이 없는 함수를 매번 새로 만들어서 바인딩하는게 문제이다.

마치 메모처럼 함수를 가지고 있을 수 있다.
`function click()` 은 호이스팅으로 인해 아래에 적어도 알 수 있다.
`const click = () => {}` 의 형태 즉 `const, let`은 호이스팅이 안되므로 오류가 발생한다.

`const click = () => {}`을 기억했다가 사용하려면
```js
// components/Example9
import React, { useState } from 'react';

function sum(persons) {
  console.log('sum...');
  return persons.map(person => person.age).reduce((l, r) => l + r, 0);
}

const Example9 = () => {
  const [value, setValue] = useState('');
  const [persons] = useState([{ name: 'Mark', age: 38 }, { name: 'Hanna', age: 27 }]);

  function change(e) {
    setValue(e.target.value);
  }

  const count = React.useMemo(() => {
    return sum(persons);
  }, [persons]);

  const click = React.useCallback(() => {
    console.log(persons);
  }, [persons]) // 언제 새로 만들어지는지 의존성을 넣어준다.

  return (
    <div>
      <input value={value} onChange={change} />
      <p>{count}</p>
      <button onClick={click}>Click</button>
    </div>
  );
};

export default Example9;
```

`useCallback()`을 이용할 수 있다.
`useMemo()`와 마찬가지고 persons가 바뀌지 않으면 같은 함수를 가지게 된다.
자식이 `click`이라는 함수를 받아오는 형태인데 `click`이 전과 같은지 판단만 하면 다시 렌더하지 않아도 된다.

즉 최적화에 도움을 준다.

최종적으로 최초 랜더와 재 랜더 사이를 연결하기 위한 Hook으로 분리가 되어서 생길 수 있는 문제를 이어 줄수 있다.

의존성을 적어주지 않으면 태어날때부터 사라질때까지 똑같은 함수를 가진 레퍼런스가 된다.

## createRef vs useRef

### createRef
`DOM`을 실제로 레퍼런스로 연결해서 가지고 있는 것
`render`가 다시 되더라도 처음 연결된 요소를 그대로 가지고 있게된다.
처음 연결하면 `null` 값을 호출한다.
`render`가 다시 호출되는 함수에서 사용하면 `input` 태그는 값이 바뀌면 `render`를 다시 호출하고 레퍼런스를 다시 `createRef` 해주고 `render`과 완료된 후 연결되므로 중간 `console.log`는 `null`만 뜨게된다.

```js
// components/Example9
import React, { useState } from 'react';

function sum(persons) {
  console.log('sum...');
  return persons.map(person => person.age).reduce((l, r) => l + r, 0);
}

const Example9 = () => {
  const ref = React.createRef();
  const [value, setValue] = useState('');
  const [persons] = useState([{ name: 'Mark', age: 38 }, { name: 'Hanna', age: 27 }]);

  function change(e) {
    setValue(e.target.value);
  }

  const count = React.useMemo(() => {
    return sum(persons);
  }, [persons]);

  const click = React.useCallback(() => {
    console.log(persons);
  }, [persons]) // 언제 새로 만들어지는지 의존성을 넣어준다.

  console.log(ref.current); // 이 사이는 항상 null 이 발생한다.

  return (
    <div>
      <input value={value} onChange={change} />
      <p ref={ref}>{count}</p>
      <button onClick={click}>Click</button>
    </div>
  );
};

export default Example9;
```

### useRef
최초 랜더시 값이 없으므로 `undefined`가 뜨지만
이후 연결된 `DOM`을 계속해서 사용한다.

`FunctionalComponent` 에서는 `useRef()` 를 사용한다.

```js
// components/Example9
import React, { useState } from 'react';

function sum(persons) {
  console.log('sum...');
  return persons.map(person => person.age).reduce((l, r) => l + r, 0);
}

const Example9 = () => {
  const ref = React.useRef();
  const [value, setValue] = useState('');
  const [persons] = useState([{ name: 'Mark', age: 38 }, { name: 'Hanna', age: 27 }]);

  function change(e) {
    setValue(e.target.value);
  }

  const count = React.useMemo(() => {
    return sum(persons);
  }, [persons]);

  const click = React.useCallback(() => {
    console.log(persons);
  }, [persons]) // 언제 새로 만들어지는지 의존성을 넣어준다.

  console.log(ref.current); // 이 사이는 항상 null 이 발생한다.

  return (
    <div>
      <input value={value} onChange={change} />
      <p ref={ref}>{count}</p>
      <button onClick={click}>Click</button>
    </div>
  );
};

export default Example9;
```
