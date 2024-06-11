## 리엑트를 위한 ES6 기본 문법 정리

### var 사용의 문제점

1. 혼란을 줄 수 있는 함수 레벨 스코프
2. 중복 선언 가능
3. 생략 가능
4. 호이스팅
   - 변수가 함수 내에서 정의 되었을 경우, 함수의 최상위로 변수가 선언 된다.
   - 함수 바깥에서 정의 되었을 경우, 전역 컨텍스트의 최상위로 변경 된다.
   - 선언(Declaration)과 할당(Assignment)를 이해 해야한다.

```jsx
// var.js

// 1.
(function () {
  if (true) {
    var variable = "function scope";
  }

  console.log(variable);
})();

// 2.
(function () {
  var variable = "function scope";
  var variable = "duplicated";

  console.log(variable);
})();

// 3.
(function () {
  variable = "no var";

  console.log(variable);
})();

console.log(variable);

// 4.
(function () {
  console.log(variable);
  var variable = "hoisted";
})();

// (function() {
//   var variable; // 선언
//   console.log(variable);
//   variable = "hoisted"; // 할당
// })();
```

### let

1. 블록 레벨 스코프
2. 중복 선언 불가
   + syntax error (런타임 시작하면서 문법적으로 문제가 있으므로 에러 출력)
3. 호이스팅 불가
   + syntax error (위에서 선언하지 않은 변수를 밑에서 참조할 수 없다.)

```jsx
// 1.
{
  let variable = "block scope";
  console.log(variable);
  // variable은 해당 스코프 내에서만 유효함
}

// 2.
// {
//   let variable = "block scope";
//   let variable = "duplicated";  // syntax error

//   console.log(variable);
// }

// 3.
{
  console.log(variable); // syntax error
  let variable = "hoisted";
}
```

### const

- 상수 선언 키워드
- Primitive (원시타입) : 테이터의 실제값 할당 (데이터 값이 복사된다.)
  - Boolean, number, String, null, undefined
  - 한번 선언 되면 변경 불가능
- Reference (참조타입) : 테이터의 위치 값만 할당 (데이터의 참조가 복사된다.)
  - Object (Array, function, object)
  - `const` 변수에 object를 할당하면 object를 가리키는 주소 **값**이 할당 되므로 주소 값은 불변이고 상수지만 그 object의 멤버 변수를 수정하는 행위는 가능함.

```jsx
// Primitive
let a = "a";
a = "b";
a;

const c = "c";
// c = "d";
c;

// Reference
let e = {
  foo: "foo",
};
e = {
  bar: "bar",
};
e;

const f = {
  foo: "foo",
};
f.foo = "bar";
f;
```

### Template string

```jsx
const name = "Mark";

console.log("안녕하세요. 제 이름은 " + name + " 입니다."); // 기존 방식

console.log(`안녕하세요. 제 이름은 ${name} 입니다.`); // template string
```

### Arrow function

- 자신의 this를 만들지 않는다.
- 생성자로 사용할 수 없다
- 항상 익명 함수
- 리턴만 있으면, {} 생략 가능
- 인자가 하나면, () 생략 가능

```jsx
function Foo() {
  this.name = "Mark";

  console.log(this.name); // "Mark"

  setTimeout(function () {
    console.log(this.name); // undefinded, 여기서 this는 해당 스코프에서 선언한 함수의 this
  }, 1000);

  const that = this;
  setTimeout(function () {
    console.log(that.name); // 위와 같은 문제를 해결하기 위해 이런 방식을 사용했다고 함
  }, 1000);

  setTimeout(() => {
    console.log(this.name); // Mark, Foo()의 this
  }, 1000);

  function Bar() {
    console.log(this.name);
  }

  Bar.bind(Foo);

  Bar(); // Mark
}

function func1() {
  return "func1";
}

const foo = new Foo();

const a = () => {
  return "return";
};
console.log(a()); // ret

const b = () => "ret"; // return만 있으면 {}, return 생략 가능
console.log(b()); // ret

const c = (props) => `ret ${props}`; // 인자가 하나면 () 생략 가능
console.log(c("props")); //return props
```

### bind
+ 함수의 this 로 인자로 넣는 "디스"를 사용하는 함수를 만들어 리턴

```jsx
function hello() {
  // 함수 내에서 this 는 global, window 또는 undefined 가 될 수 있다.
  console.log(`Hello! ${this.name}`);
}

const mark = {
  name: "Mark",
};
const helloMark = hello.bind(mark);
helloMark(); // Hello! Mark

const anna = {
  name: "Anna",
};
const helloAnna = hello.bind(anna);
helloAnna(); // Hello! Anna
```

### Destructuring assignment (구조 분해 할당)

- 객체에서 {name} 이런 식으로 가져와서 변수처럼 사용할 때 자주 사용하는 듯 하다.
- 배열은 순서를 지켜줘야 하고, 객체는 key 값으로 가져오는 듯?

```jsx
const foo = {
  a: "에이",
  b: "비이",
};

const { a, b } = foo;
console.log(a, b);

const bar = ["씨이", "디이"];

const [c, d] = bar;
console.log(c, d);

const { a: newA, b: newB } = foo; // 새로운 이름으로 할당
console.log(newA, newB);
```

### **Spread 와 Rest**

- **Spread** : Iterable object의 엘리먼트를 하나씩 분리하여 전개하는 방법
- **Rest Parameter :** 함수를 호출할 때 `spread` 연산자로 파라미터를 작성한 형태
- 함수 인자와 배열에서 주로 사용한다.
- 1 level depth만 복사가 가능하다 하는데 정확히는 객체의 주소를 복사하기 때문에 발생하는 문제인 듯하다.
- `arguments` 도 사용 가능 하지만 Arrow function 에서 사용할 수 없으며 사용을 자제해야 하는 듯 하다.
  - 명시적으로 선언하지 않고 사용 가능한듯 한데 역시 이런건 사용하지 않는 것이 바람직 할듯

```jsx
function sum(a, b, c) {
  return a + b + c;
}

console.log(sum(1, 2, 3));

const numbers = [2, 3, 4];

console.log(sum(...numbers));
```

```js
// 1 레벨 깊이
const obj = {a: 3, b: 4, C: 5};

const cloned = {...obj, a: 6}; // a의 값을 6으로 변경
cloned.c = 10; // c의 값을 10으로 변경

console.log(obj, cloned);

// 2 레벨 깊이
const obj1 = { a: { b: 100 } };

const obj1Cloned = { ...obj1 };
obj1Cloned.a.b = 200; // 1레벨 깊이로 원본의 값을 바꿔버린다.

console.log(obj1, obj1Cloned);
// {a:{b:200}} {a:{b:200}}

const obj2 = { a: { b: 100 } };

const obj2Cloned = {...obj2, a: {...obj2.a}};
obj2Cloned.a.b = 200;

console.log(obj2, obj2Cloned);
```

```js
// rest
function rest1(...args) {
    console.log(args);
}

rest1('Mark', 26, 'Korea');

function rest2(name, ...args) {
    console.log(name, args);
}

rest2('Mark', 26, 'Korea');
```

### callback

- 과거 비동기 처리를 위한 선택
- 그 유명한 콜백 지옥

```jsx
function foo(callback) {
  setTimeout(() => {
    // 로직
    callback();
  }, 1000);
}

foo(() => {
  console.log("end");
});

console.log("이것이 먼저 실행");
```

### Promise 객체

- then() 메서드 호출 하고 나면 새로운 Promise 객체가 리턴되고, 바로 then() 함수를 호출하는 방식을 Promise chaining 이라고 하는 듯 (가독성 높히기 위한 기법?)
- Promise 객체를 만들고, 로직 처리 후 성공과 실패를 알려준다.
- then 과 catch 를 통해 메인 로직에 전달한다.

```jsx
function foo() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 로직
      resolve();
    }, 1000);
  });
}

foo().then(() => {
  console.log("end");
});
console.log("이것이 먼저 실행");

// Promise chaining
foo()
  .then(function (result) {
    // (**)

    alert(result); // 1
    return result * 2;
  })
  .then(function (result) {
    // (***)

    alert(result); // 2
    return result * 2;
  })
  .then(function (result) {
    alert(result); // 4
    return result * 2;
  });
```

### async - await

- 기본적으로 Promise를 사용한다.
- async 키워드가 붙은 함수 안에서 await 키워드르 시용할 수 있음
- 비동기 처리를 동기 시퀀스(?) 처럼 코딩 한 것이 장점 인듯
- 가독성 좋고 try catch 문으로 exception 처리 하는듯

```jsx
// async - wait
// Promise 기반
(async function () {
  console.log("이것이 먼저 실행");

  try {
    await foo(); // Async 함수 안에서만 가능
    await bar();
  } catch (error) {
    // reject 처리
    console.log(error);
  }

  console.log("End");
})();
```

### Generator 객체

- function\* 으로 만들어진 함수를 호출하면 반환되는 객체이다.
- function\* 에서 yield 를 호출하여, 다시 제어권을 넘겨준다.
- 제너레이터 객체에 next() 함수를 호출하면, 다음 yield 지점까지 간다.
- 코루틴 공부하면서 많이 본 내용인데, 정확히 어떤식으로 사용해야 할지는 모르겠다.

```jsx
function foo() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 로직
      resolve();
    }, 1000);
  });
}

function* bar() {
  yield foo();
}

console.log(bar().next());

bar()
  .next()
  .value.then(() => {
    console.log("end");
  });
console.log("이것이 먼저 실행?");
```
```js
function* foo() {
    console.log(0,5);
    yield 1;
    console.log(1.5);
    yield 2;
    console.log(2.5);
    yield 3;
    console.log(3.5);
}

const g = foo(); // g가 제너레이터 객체가 된다.
console.log(g.next().value); // 0.5
console.log(g.next().value); // 1 1.5
console.log(g.next().value); // 2 2.5
console.log(g.next().value); // 3 3.5
console.log(g.next().value); // undefined
```
```js
// 핸들
let handle = null;

// 비동기 함수
function bar() {
    setTimeout(() => {
        handle.next('hello'); // handle을 1초후에 next 한다.
    }, 1000);
}

// 핸들을 통해 컨트롤을 넘기는 제너레이터 함수
function* baz() {
    const text = yield bar();
    console.log(text);
}

handle = baz(); // baz 함수의 결과를 handle에 담는다.
handle.next();

//{value: undefined, done: false}
// 1초후 hello
```

- 제너레이터의 예시로 내가 운전대를 잡고 yield 1 까지 진행을 한다.
  그리고 다음 사람에게(next) 운전대를 주고 다음 yield 2 까지 진행한다.
  해당 작업에 next를 주고 끝나면 다음 작업으로 넘어가는 형태이다.

----

## 리액트가 하는 일

## React keyword

+ __Angular__ vs __React__ vs __Vue__
+ View 를 다루는 라이브러리 (리액트가 주목하고자 하는건 브라우저에 얼마나 빠르고 잘 그릴 수 있는지 이다.)
+ Only Rendering & Update
    * NOT included another functionality(ex. http client, ...);
+ Component Based Development
    * 독립적인 코드 블럭(HTML + CSS + JavaScript)
    * 작업의 단위
+ Virtual DOM
    * 이제는 DOM 을 직접 다루지 않음
+ JSX
    * NOT Templates
    * transpile to JS(Babel, TypeScript)
+ CSR & SSR

----

Angular = 프레임워크
React = 라이브러리
Vue = 프레임워크와 라이브러리가 혼합되어있다.

프레임워크
  + 모든것이 다 들어있고 프레임워크가 돌아가는것에 내가 어느 부분만 끼워 넣으면 되는것
 
  라이브러리
  + 그 라이브러리가 다루는 기능을 우리가 사용하는것

ex) http client로 API를 호출할때, Angular는 내장 모듈을 사용하면 된다.
하지만 React와 Vue는 내장 모듈이 없으므로 라이브러리를 사용하거나 직접 작성해야한다.

----

### Component Tree ⇒ DOM Tree

트리 구조로 설계한 컴포넌트를 DOM 구조로 변경해준다는 이야기인가..?

이해를 위해 찾아보았다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/97bc0756-acfe-4cf9-9b30-514dfcdf4958/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/97bc0756-acfe-4cf9-9b30-514dfcdf4958/Untitled.png)

브라우저의 Workflow

**DOM Tree**

브라우저가 HTML을 전달 받으면, 브라우저의 Render engine이 이를 파싱하고 DOM node로 이루어진 트리를 만든다.

**Rendor Tree**

외부 CSS 파일과, 각 엘리먼트의 inline style을 파싱하여 Style rule을 만들고 DOM Tree에 따라 Render Tree를 만든다. (attachment)

**Layout (reflow)**

렌더 트리가 다 만들어 지고 나면, 각 노드들은 스크린의 좌표가 주어지고, 어디에 나타나야할 위치가 주어진다.

**Painting**

렌더링 된 요소에 색을 입히는 과정. 트리의 각 노드들을 거쳐가며 `paint()` 메소드를 호출.

DOM에 변화가 생기면 위의 과정이 반복됨.

#### 컴포넌트 예시

```HTML
<!-- HTMLElement -->

<img src="이미지 주소"/>
  
<button class="클래스 이름">버튼</button>

<!-- 내가 만든 컴포넌트 -->

<내가지은이름1 name="Mark" />

<내가지은이름 prop={false}>내용</내가지은이름>

<!--

- src, class, name, props 밖에서 넣어주는 데이터
- 문서(HTML), 스타일(CSS), 동작(JS) 를 합쳐서 내가 만든 일종의 태그

-->
```

### Client Side Rendering
+ JS 가 전부 다운로드 되어 리액트 애플리케이션이 정상 실행되지 전까지는 화면이 보이지 않음.
+ JS 가 전부 다운로드 되어 리액트 애플리케이션이 정상 실행된 후, 화면이 보이면서 유저가 인터렉션 가능


### **Server Side Rendering**
+ JS 가 전부 다운로드 되지 않아도, 일단 화면은 보이지만 유저가 사용할 수 없음.
+ JS 가 전부 다운로드 되어 리액트 애플리케이션이 정상 실행된 후, 유저가 사용 가능

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c8635847-dbbc-40fc-9991-706314ade859/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c8635847-dbbc-40fc-9991-706314ade859/Untitled.png)

## 본격적으로 리액트를 하기 전에 pre-setting

`npx live-server` - 실행한 해당 폴더에서 파일 서버로 동작

> npx는 최신 버전에 해당하는 패키지를 설치하여 실행하고, 실행된 이후에 해당 패키지를 제거합니다


## Rendering 이해하기

##### 리액트의 핵심 모둘 2개
```js
// 1. 리액트 컴포넌트 => HTMLElement 연결
import ReactDOM from 'react-dom';
// 2. 리액트 컴포넌트 만들기
import React from 'react';

// { React 컴포넌트 } - JS, JSX
// => <HTMLElement>

// "만들어진 리액트 컴포넌트"를 실제 HTMLElement에 연결할 때 ReactDOM 라이브러리를 이용한다.
```

**React**는 View를 만들기위한 라이브러리

**ReactDOM**은 UI를 실제로 브라우저에 렌더링 할 때 사용하는 라이브러리

### Use React, ReactDOM Library with CDN

[CDN 링크 - React](https://ko.reactjs.org/docs/cdn-links.html)

```jsx
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
```

**crossorigin** - 현재 문서와 다른 호스트에서 스크립트를 불러올 때 해당 스크립트를 어떻게 다룰 것인지 설정하는 속성

---

## Component의 이해

### ~~고전~~ 프론트 엔트

HTML 로 문서 구조를 잡고,

CSS 로 스타일을 입히고,

JavaScript 로 DOM 을 조작합니다.

```html
<!-- ex2.html : 고전 프론트엔드 -->
<body>
  <div id="root"></div>
  <button id="btn_plus">+</button>

  <script type="text/javascript">
    const root = document.querySelector("#root");
    const btn_plus = document.querySelector("#btn_plus");

    let i = 0;

    root.innerHTML = `<p>init : 0</p>`;

    btn_plus.addEventListener("click", () => {
      root.innerHTML = `<p>init : ${++i}</p>`;
    });
  </script>
</body>
```

### 컴포넌트를 활용한 프론트 엔드

컴포넌트를 정의하고, 실제 DOM 에 컴포넌트를 그려준다.

```html
<!-- ex3.html : 컴포넌트를 만들고, 실제 DOM 에 그린다. -->
<!DOCTYPE html>
<body>
  <div id="root"></div>
  <button id="btn_plus">+</button>

  <script type="text/javascript">
    // react 라이브러리가 하는 일
    const component = {
      message: "init",
      count: 0,
      render() {
        return `<p>${this.message} : ${this.count}</p>`;
      },
    };

    // react-dom 라이브러리가 하는 일
    function render(dom, component) {
      // 컴포넌트를 render 하고, DOM 에 그려준다.
      root.innerHTML = component.render();
    }

    render(document.querySelector("#root"), component);

    // 이벤트 핸들러 등록
    document.querySelector("#btn_plus").addEventListener("click", () => {
      // 외부에서 컴포넌트의 값을 변경하는 행위
      component.message = "update";
      component.count = component.count + 1;

      render(document.querySelector("#root"), component);
    });
  </script>
</body>
```

### React 프론트엔드

컴포넌트를 정의하고, 실제 DOM 에 컴포넌트를 그려준다.

```html
<!-- ex4.html : React 로 컴포넌트를 만들고, 실제 DOM 에 그린다. -->
<body>
  <div id="root"></div>
  <button id="btn_plus">+</button>

  <script
    crossorigin
    src="https://unpkg.com/react@16/umd/react.development.js"
  ></script>
  <script
    crossorigin
    src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
  ></script>

  <script type="text/javascript">
    const Component = (props) => {
      return React.createElement("p", null, `${props.message} ${props.count}`);
    };

    let i = 0;

    ReactDOM.render(
      React.createElement(Component, { message: "init", count: i }, null),
      document.querySelector("#root")
    );

    document.querySelector("#btn_plus").addEventListener("click", () => {
      i++;
      ReactDOM.render(
        React.createElement(Component, { message: "update", count: i }, null),
        document.querySelector("#root")
      );
    });
  </script>
</body>
```

```jsx
// 0. 새로운 React Element를 생성하고 반환
// React.createElement(
//   type, // 태그 이름 문자열(ex: 'div' or 'span') | React 컴포넌트(a class or function) | React.Fragment
//   [props], // 리액트 컴포넌트에 넣어주는 데이터 객체
//   [...children] // 자식으로 넣어주는 요소들
// )

//1. 태그 이름 문자열 type
ReactDOM.render(
  React.createElement("h1", null, `type 이 "태그 이름 문자열" 입니다.`),
  document.querySelector("#root")
);

//2. React 컴포넌트 type
const Component = (props) => {
  return React.createElement("p", null, `type 이 "React 컴포넌트" 입니다.`);
};

ReactDOM.render(
  React.createElement(Component, null, null),
  document.querySelector("#root")
);

//3. React Fragment type
ReactDOM.render(
  React.createElement(React.Fragment, null, `type 이 "React Fragment" 입니다.`),
  document.querySelector("#root")
);

//4. props 를 통해 데이터를 주입
const Component = (props) => {
  return React.createElement(
    "p",
    null,
    `message 는 "${props.message}" 입니다.`
  );
};

ReactDOM.render(
  React.createElement(Component, { message: "이것은 메세지 입니다." }, null),
  document.querySelector("#root")
);

//5. props 에 들어가는 children
const Component = (props) => {
  return React.createElement(
    "p",
    null,
    `message 는 "${props.message}" 입니다.`,
    `props.children 은 "${props.children}" 입니다.`
  );
};

ReactDOM.render(
  React.createElement(
    Component,
    { message: "이것은 메세지 입니다." },
    "이것은 children 입니다."
  ),
  document.querySelector("#root")
);

//6. 리액트 엘리먼트에 style 추가
ReactDOM.render(
  React.createElement(
    "h1",
    { style: { color: "red" } },
    `type 이 "태그 이름 문자열" 입니다.`
  ),
  document.querySelector("#root")
);

//7. 복잡한 컴포넌트
ReactDOM.render(
  React.createElement(
    "div",
    { style: { backgroundColor: "red", width: 100, height: 100 } },
    React.createElement(
      "div",
      { style: { backgroundColor: "green", width: 50, height: 50 } },
      null
    ),
    React.createElement(
      "div",
      { style: { backgroundColor: "yellow", width: 50, height: 50 } },
      null
    )
  ),
  document.querySelector("#root")
);
```


#### React Component 만드는 법 

컴포넌트 : 컴포넌트는 독립적인 단위모듈이다.

Hook을 간단하게 요약하면 class를 쓰지 않고, function에서 state를 운용할 수 있는 기능이다.

__Hooks 이전__
+ 컴포넌트 내부에 상태가 있다면?
    * class
+ 컴포넌트 내부에 상태가 없다면?
    * 라이프사이클을 사용해야 한다면? (class)
    * 라이프사이클에 관계 없다면? (function)

__Hooks 이후__
```js
//Class 컴포넌트
import React from 'react';

class ClassComponent extends React.Component {
    render() { // render() 함수를 통해 그림
        return (<div>Hello</div>);
    }
}

// 사용
<ClassComponent />
```

```js
//Functional 컴포넌트
import React from 'react';

function FunctionalComponent() {
    return <div>Hello</div>;
}

const FunctionalComponent = () => <div>Hello</div>;

// 사용
<FunctionalComponent />
```

```html
<body>
  <script
    crossorigin
    src="https://unpkg.com/react@16/umd/react.development.js"
  ></script>
  <script
    crossorigin
    src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
  ></script>
  <script type="text/javascript">
    // Global 에 React 와 ReactDOM 객체가 생성
    console.log(React);
    console.log(ReactDOM);
  </script>
</body>
```

----

## JSX 문법

```jsx
const element = <h1>Hello, world!</h1>;

// 이것과 동일
const element = React.createElement("h1", null, "Hello, world!");
```

### JSX 를 쓰는 이유

+ React.createElement VS JSX
    * 가독성 완승
+ babel과 같은 컴파일 과정에서 문법적 오류를 인지하기 쉬움

## JSX 문법

- 최상위 요소가 하나여야 합니다.
- 최상위 요소 리턴하는 경우, ( ) 로 감싸야 합니다.
- 자식들을 바로 랜더링하고 싶으면, <>자식들</> 를 사용합니다. => Fragment
- 자바스크립트 표현식을 사용하려면, {표현식} 를 이용합니다.
- if 문은 사용할 수 없습니다.
- 삼항 연산자 혹은 && 를 사용합니다.
- style 을 이용해 인라인 스타일링이 가능합니다.
- class 대신 className 을 사용해 class 를 적용할 수 있습니다.
- 자식요소가 있으면, 꼭 닫아야 하고, 자식요소가 없으면 열면서 닫아야 합니다.
  - <p>어쩌구</p>
  - <br />

```jsx
<!-- ex7.html : JSX 문법 -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <div id="root"></div>
    <script
      crossorigin
      src="https://unpkg.com/react@16/umd/react.development.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
    ></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <script type="text/babel">
      // 1. 최상위 요소가 하나여야 합니다.
      // 2. 최상위 요소 리턴하는 경우, ( ) 로 감싸야 합니다.
      //   const Comp1 = props => {
      //       return (
      //         <h1>제목</h1>
      //         <h2>부제목</h2>
      //       );
      //   }
      //   const Comp2 = props => {
      //     return (
      //       <div>
      //         <h1>제목</h1>
      //         <h2>부제목</h2>
      //       </div>
      //     );
      //   };

      // 3. 자식들을 바로 랜더링하고 싶으면, <>자식들</> 를 사용합니다. => Fragment
      //   const Comp3 = props => {
      //     return (
      //       <>
      //         <h1>제목</h1>
      //         <h2>부제목</h2>
      //       </>
      //     );
      //   };

      // 4. 자바스크립트 표현식을 사용하려면, {표현식} 를 이용합니다.
      //   const Comp4 = props => {
      //     return (
      //       <div>
      //         <h1>제목</h1>
      //         <h2>{props.children}</h2>
      //       </div>
      //     );
      //   };

      // 5. if 문은 사용할 수 없습니다.
      // 삼항 연산자 혹은 && 를 사용합니다.
      //   const Comp5 = props => {
      //     return (
      //       <div>
      //         <h1>제목</h1>
      //         <h2>{props.children}</h2>
      //         {props.isShow ? '있다' : '없다.'}
      //         {props.isShow && '있을 때만 나온다'}
      //       </div>
      //     );
      //   };

      // 6. style 을 이용해 인라인 스타일링이 가능합니다.
      //   const Comp6 = props => {
      //     return (
      //       <div>
      //         <h1
      //           style={{
      //             color: 'red',
      //           }}
      //         >
      //           제목
      //         </h1>
      //         <h2>부제목</h2>
      //       </div>
      //     );
      //   };

      // 7. class 대신 className 을 사용해 class 를 적용할 수 있습니다.
      //   const Comp7 = props => {
      //     return (
      //       <div>
      //         <h1 className="title">제목</h1>
      //         <h2>부제목</h2>
      //       </div>
      //     );
      //   };

      // 8. 자식요소가 있으면, 꼭 닫아야 하고, 자식요소가 없으면 열면서 닫아야 합니다.
      // <p>어쩌구</p>
      // <br />
      //   const Comp7 = props => {
      //     return (
      //       <div>
      //         <h1 className="title">제목</h1>
      //         <br />
      //         <h2>부제목</h2>
      //       </div>
      //     );
      //   };
    </script>
  </body>
</html>
```

----

## Babel 이해하기

최신 버전의 자바스크립트 문법을 브라우저가 이해하지 못하기 때문에 브라우저가 이해할 수 있는 문법으로 변환

### babel-polyfill

프로그램이 처음에 시작될 때 현재 브라우저에서 지원하지 않는 함수를 검사해서 각 object의 prototype에 붙여주는 역할을 한다

### .babelrc

.babelrc 파일을 프로젝트 root 폴더에 생성 후 세팅 / 자세한 것은 나중에

**plugin** - ES6의 각 문법들

**preset** - pllugin 여러개가 묶여 있는 개념

대표적으로 es2015 preset, react preset

### babel-cli

보통 webpack으로 빌드하지만 cli로 빌드 할 수 도 있음.

### prototyping

```jsx
<div id="output"></div>

<!-- Load Babel -->
<!-- v6 <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script> -->
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

<!-- Your custom script here -->
<script type="text/babel">
const getMessage = () => "Hello World";
document.getElementById('output').innerHTML = getMessage();
</script>
```

----

## props와 state

**Props** 는 컴포넌트 외부에서 컴포넌트에게 주는 데이터.

- **props는 읽기 전용** - 모든 React 컴포넌트는 props와 관련한 동작을 할 때 순수 함수처럼 동작해야한다.

```jsx
<Component p="properties" />; // props 설정

class Component extends React.Component {
  static defaultProps = {
    p: "default props",
  }; // 초기값 설정

  render() {
    return (
      <div> {this.props.p} </div> // this.props.p로 접근
    );
  }
}
```

**State** 는 컴포넌트 내부에서 변경할 수 있는 데이터.

- `this.setState({});`
  - state는 캡슐화 되어 있어 setState 함수로만 변경 가능.

```jsx
class Component extends React.Component {
	constructor(props) {
		super(props);
		this.state = {s: 'default state'};
	} // 초기값 설정

	render() {
		return {
			<div> {this.state.s} </div> // this.state.s로 접근
		}
	}
}
```

둘 다 변경이 발생하면, 렌더가 다시 일어날 수 있다.

__두가지를 제외하고 어떤 데이터가 있을때 그 데이터가 변하는건 해당 컴포넌트에 영향을 주지 않는다.__

UI를 변경해야될 데이터가 있다면, 그 데이터는 Props 혹은 State로 존재해야한다.
컴포넌트에 존재하는 데이터가 UI의 변화에 영향을 주지 않으면 Props나 State로 사용하지 않아도 된다. => Render가 자주 발생한다.



__Render 함수__
Props 와 State 를 바탕으로 컴포넌트를 그린다.
그리고 두가지가 변경되면, 컴포넌트를 다시 그린다.
컴포넌트를 그리는 방법을 기술하는 함수이다.

---- 

##### ClassComponent Props

```js
// ClassComponent.jsx
import React from "react";

export default class ClassComponent extends React.Component { // this값은 App.js에서 할당되어 React.Component에서 받아온다.
    render() { // Render 될때 console.log 를 찍고 리턴으로 ClassComponent를 그린다.
        console.log(this.props); // 클래스 이므로 this.props를 사용할 수 있다. 
        return <p>ClassComponent</p>
    }
}
```

```js
// App.js
import React from "react";
import "./App.css";
import ClassComponent from "./components/ClassComponent";

function App() {
    const props = {name: 'Kang', age:26}; // <ClassComponent {...props}> 아래와 같이 들어간다.
    return (
        <div className="App">
            <ClassComponent name="Kang" age={26} /> // {name: 'Kang', age: 26} => props 직접 지정
            
            <ClassComponent name="Kang" age={26}>
                자식들 // key가 children인 값에 들어간다.
            </ClassComponent>
        </div>
    )
}
```
Props는 기본적으로 children이 default로 세팅되어있다.
컴포넌트는 재사용이 가능하므로 여러번 선언도 가능하다.

위 코드를 실행하면 콘솔로그에 
1. 첫 번째 ClassComponent = Object => age: 26, children: "자식들", name: "Kang"이 뜬다.
2. 두 번째 ClassComponent = Object => age: 26, name="Kang" 이 뜬다. (children이 없다.)

실행결과를 통해 Props는 default로 children이 들어갈 수 있다 (안 들어갈수도 있다.)

__Class Component에서는 this.props로 접근한다.__

```js
import React from "react";

export default class ClassComponent extends React.Component {
    render() {
        console.log(this.props);
        if(this.props.age > 29) { // props를 받아와 조건문을 통해 render를 다르게 그릴 수 있다.
            return <p>ClassComponent : 30대 이상</p>
        } else {
            return <p>ClassComponent : 20대 이하</p>
        }
    }
}
```

----

##### FunctionalComponent Props

```js
// FunctionalComponent.jsx
import React from "react";

// Function 키워드를 가진 컴포넌트
export default function FunctionalComponent({name, age, children}) {
    console.log(name, age, children);
    return (
        <p>
            나의 이름은 {name} 입니다. 나이는 {age} 입니다.
        </p>
    );
}

// 전체를 가지고 오는 방법
const FunctionalComponent = (props) => { // 함수를 바로 실행하므로 인자로 props가 꽃힌다.
    console.log(props) // Object {name:"Kang", age:26}
    return <p>FunctionalComponent</p>
}

// 구조분해할당을 하는 방법
const FunctionalComponent = ({name, age, children}) => {
    console.log(name, age, children); // 구조분해할당도 위와 동일하다. (Kang 26)
    return <p>나의 이름은 {name} 입니다. 나이는 {age} 입니다.</p>
}

export default FunctionalComponent;
    // console.log(this.props); => ArrowFunction은 this를 가지지 않고 자신의 고유한 값을 가지고 있어서 사용불가능하다.
```

```js
// App.js
import React from "react";
import "./App.css";
import FunctionalComponent from "./components/FunctionalComponent";

function App() {
    return (
        <div className="App">
            <FunctionalComponent name="Kang" age={26}/> // Kang 26 undefined
            <FunctionalComponent name="Test" age={38}> // Test 38 강아지
                강아지
            </FunctionalComponent>
        </div>
    )
}
```

Props Key값과 자식들의 요소가 컴포넌트를 만들어 다른사람들에게 줄때 가장 중요한 키포인트다.

__Props의 Key 값의 이름이 없을 경우 알려주는 툴__
1. flow (facebook 오픈소스) => 컴포넌트의 type이 맞지 않으면 오류를 알려준다.
2. Typescript => 잘못 들어가거나 안들어간 내용이 있으면 오류를 알려준다.

```js
<Component p="프롭스"/> // 형태로 넣어준다.
this.props.p // Class에서 프롭스에 접근하는 방법.
```

----

##### default props 
Props를 직접 설정하지 않아도 기본적으로 사용되는 Props만 먼저 적어줄 수 있다.

```js
// ClassComponent.jsx
export default class ClassComponent extends React.Component { // ClassCompinet가 React.Componet를 상속받는다.
    static defaultProps = { // Class 메소드(변수) 라고 부른다. (함수면 클래스 함수)
        // ClassComponent.defaultProps 랑 동일하다.
        isFemale: false,
    };

    render() { // 인스턴스 메소드(변수)
        console.log(this.props);
        if (this.props.age > 29) {
            return <p>ClassComponent : 30대 이상</p>;
        } else {
            return <p>ClassComponent : 20대 이하</p>;
        }
    }
```

```js
// FunctionalComponent
export default function FunctionalComponent({name, age, children, isFemale}) {
    console.log(name, age, children);
    return (
        <p>
            FunctionalComponent : 나의 이름은 {name} 입니다. 나이는 {age} 입니다.
        </p>
    )
}

FunctionalComponent.defaultProps = {isFemale: false};
```

defaultProps를 오브젝트 형태로 지정해 놓으면 설정을 하지 않아도 기본값으로 사용할 수 있다.

```js
// App.js
<ClassComponent name="Kang" age={26}> // 설정을 하지 않아도 isFemale이 기본으로 들어있다.
        자식들
</ClassComponent>
// isFemale={ture} 을 프롭스로 넣어서 값을 변경할수도 있다.
```

isFemale을 적지 않으면 false, 지정해주면 true로 변경된다.

처음에 리액트가 나왔을때 FunctionalComponent 에서는 State를 변경할 수 없었다.
Hooks이 등장하면서 컴포넌트 내부와 관계없이 Class, Function 상관없이 State를 변경할 수 있게 되었다.
=> Hooks 교육전 state 변경 사항이 있으면 class로 한다.

----

#### State

```js
class Component extends React.Component {
    state = { // 컴포넌트 내부에 오브젝트 형태로 선언한다.
        s: "스테이트",
    };
    render() {
        return (
            <div>{this.state.s}</div> // 형태로 사용한다.
        )
    }
}
```

```js
// ClassComponent.jsx
export default class ClassComponent extends React.Component {
    // 1. state의 형태를 정한다.
    state = { // Hook을 들어가기 전까지는 class에만 있다고 가정한다.
        count : 0, // 최초로 render 될때 이 형태를 가지게 된다.
    };
    render() {
        console.log(this.state); // {count : 0}
    }
}
```

__state와 props 모두 object 형태를 가지고 있다.__
state는 내부에서 가지고 있는 값이고
props는 외부에서 내부로 들어온 값이다.

```js
// ClassComponent.jsx
export default class ClassComponent extends React.Component {
    // 1. state의 형태를 정한다.
    state = { // Hook을 들어가기 전까지는 class에만 있다고 가정한다.
        count : 0, // 최초로 render 될때 이 형태를 가지게 된다.
    };
    date = {
        count : 0,
    };
    componentDidMount() { // 컴포넌트가 최초에 그려진 직후
        setInterval(() => {
            console.log(this.state, this.data++); // {count : 0}, {count : 0}
        }, 1000); // 1초에 한번씩 로그가 찍힌다.
    }
    render() {
    }
}
```

위 코드는 데이터가 1씩 증가하지만 숫자가 올라가면서 render 함수는 돌아가지 않는다.
state.count는 값이 증가하면 render 함수가 돈다.

```js
console.log(this.state++, this.data++);
```
만약 직접적으로 state 값을 증가시키려고 한다면, setState() 함수를 사용하라고 오류가 뜬다.

```js
    componentDidMount() { // 컴포넌트가 최초에 그려진 직후
        setInterval(() => {
            console.log(this.state, this.data++); // {count : 0}, {count : 0}
        }, 1000); // 1초에 한번씩 로그가 찍힌다.

        this.setState() //명시적으로 setState가 호출 되었을때만 render()를 돌린다.
    }
```

```js
// 잘못된 방법

// 새로운 State를 넣는다.
// 1. 이전의 state 와 다른 객체를 넘긴다.
const obj = { count:0 };
obj.count++;
this.setState(obj);
// 다른 데이터 값을 가지지만 결국 가리키는 객체는 같은 객체이다.
```

```js
// 올바른 방법

const obj = { count: 0 };
const newObj = { count: obj.count + 1 }; // newObj는 다른오브젝트이다.
this.setState(newObj); // state 변경을 위해 새 오브젝트를 넣어준다.
// state가 변경되면서 render가 다시 돈다.
```

```js
    componentDidMount() { // 컴포넌트가 최초에 그려진 직후
        setInterval(() => {
            console.log(this.state, this.data++);
        }, 1000);
        this.setState({ count: this.state.count + 1 }) // 1초에 한번씩 state.count의 값을 1씩 증가시키고 render()를 발생시킨다.
        
        // this.setState((state)= > ({count: state.count + 1}));
        // 이전 state를 받아서 새로운 state를 반환하는 함수
        // 데이터가 많아질때 편한 방법이다. {...state, count: state.count + 1}
    }
```

----

#### Event Handling

```js
// 평소에 사용하는 방법
return <button>버튼</button>

button.addEventListener("click", () => {
});
```

```js
// 위와 동일한 작성방법
return <button onClick={() => { // 카멜케이스는 Strict(엄격) 하게 Click 이 버튼에게 할당될 수 있는지 점검하기 위해서 사용한다. 
    console.log("클릭");
}}> 버튼 </button>
```

----

멤버 함수 만드는 법 1.
```js
click1() {
    console.log(this); // 컴포넌트 인스턴스의 this를 가리킨다.
    // click1의 this로 계산을해서 undefined가 발생한다.
}
```

멤버 함수 만드는 법 2.
```js
click2 = () => { // 상위의 this로 계산을해 정상적으로 출력된다.
    console.log(this);
}
```

```js
this.click1 = this.click1.bind(this); //bind를 통해 this를 상위요소를 선택하게 할 수 있다.

return ( 
    <button onClick={this.click1}>
        버튼1 // undefined 가 발생한다.
    </button>
    <button onClick={this.click2}>
        버튼2
    </button>
)
```

1. camelCase 로만 사용할 수 있다.
    + onClick, onMouseEnter
2. 이벤트에 연결된 자바스크립트 코드는 함수이다.
    + 이벤트={함수} 와 같이 쓴다.
3. 실제 DOM 요소들에만 사용 가능하다.
    + 리액트 컴포넌트에 사용하면, 그냥 props로 전달한다.

----

## Lifecycle API

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a5c845d8-bd7d-4405-86d1-87a8a8782e13/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a5c845d8-bd7d-4405-86d1-87a8a8782e13/Untitled.png)

### Component 생성 및 마운트

- constructor
- componentWillMount
- render
- componentDidMount

### Component props, state 변경

- componentWillReceiveProps
  - props 새로 지정했을때 바로 호출
  - **state** 의 변경에는 반응하지 않는다.
    - props의 값에 따라 state를 변경해야 한다면
      - setstate를 이용해 state를 변경
      - 그러면 다음 이벤트로 각각 가는 것이 아닌 한번에 변경
- shouldComponentUpdate
  - props, state 중 하나라도 변경 되면 호출
  - newProps 와 newState를 인자로 호출
  - return type은 boolean
    - true면 render
    - false
- compoonentWillUpdate
  - 컴포넌트가 재 렌더링 되기전에 불림
  - setState 같은 것을 쓰면 안됨
- render
- componentDidUpdate
  - 컴퍼넌트가 재 렌더링을 마치면 불림

---

### Component Lifecycle (< v16.3 이전)

#### Component Lifecycle
처음 브라우저에 컴포넌트가 보일때 => 탄생
Props와 State에 의해서 변화 (중간단계)
다쓴 컴포넌트가 화면에서 사라질때 => 죽음

Declarative 디클레러티브
라이프사이클의 타이밍에 맞춰서 발동되는걸 선언 해놓는것

Mounting => 탄생
Updation => 업데이트
Unmounting => 죽음

###### Component 생성 및 마운트 (< v16.3)
constructor => 1. 생성자 (state 등 설정)
componentWillMount => 2. Mount가 일어나기 직전
render (최초 랜더) => Mount(포함)가 발생하고 그린다.
componentDidMount => 4. Mount가 일어난 직후
render => componentDidMount 에서 props 혹은 state 상태가 변경되면 계속 발생한다.

##### ComponentDidMount
1. 타이머
2. 데이터를 로드 (서버에서 가져오기)
서버에서 모든 데이터를 한번에 묶어서 내려오는게 아니고 필요할 때 마다 데이터를 콜 해서 가져오는 것으로 바꼈다.

뷰를 보여주기 전에 콜을 하면 뷰가 느려지거나 어떤 상황이 발생할지 모른다.
그래서 뷰를 먼저 보여주고 데이터를 받아와 render를 다시 바꿔준다는 것을 이해한 상태에서 진행.

##### Component 언마운트 (< v16.3)
componentWillUnmount => 함수가 하나만 존재한다.
조금 있으면 Unmount 될거니까 필요한건 여기서 처리해.
Unmount가 되면 더이상 바꿀 수 없다. => 컴포넌트가 사라짐

결국은 state가 바뀌면 없어지는 형태가 아닌 이상 있는 것을 없애는건 불가능하다.

1. 타이머가 있으면 타이머를 없앤다.
2. 보낸 리퀘스트를 오지말라고 abort() [비정상종료, 호스트 환경에 제어를 리턴] 시킨다.

##### Component props, state 변경 (< v16.3)
```js
// props 변경시 시작점
componentWillReceiveProps
// (nextProps) Props만 들어온 상태에서는 이곳을 거쳐 shouldComponentUpdate로 넘어간다.

// state 변경시 시작점
shouldComponentUpdate // 중요 아예 없으면 true와 동일하다 무조건 update
// (nextProps, nextState) return 불린타입(true, false);
// return이 false면 더이상 이부분부터 라이프사이클이 진행되지 않는다.
// 최적화를 위한 타이밍을 정할 수 있다.

componentWillUpdate // 업데이트 이후 사라짐 (설명x)
render
componentDidUpdate // 업데이트 이후 사라짐 (설명x)
```

----
순서대로 진행 

```js
constructor

componentWillMount => __getDerivedStateFromProps__ // 최초 render 직전에 발생
// 최초에 Props를 통해 State를 만들어낸다.

render
componentDidMount

componentWillReceiveProps =>  __getDerivedStateFromProps__
// Props가 바뀌었을때 state를 만들어줘야 필요성이 있을때

shouldComponentUpdate
render

componentWillUpdate => getSnapshotBeforeUpdate
// Update 직전에 UI가 Render에 의해 변하기 전에 스냅샷을 뜬다.
// 스냅샷은 componentDidUpdate에서 사용한다.

(dom에 적용) 
// UI가 바뀐다고 바로 적용되지 않는다
// 실제로 render 함수는 불리지만 DOM을 변경할지 말지는 리액트가 결정하고 바뀐다.
// 변경점이 없어서 DOM에 적용할 내용이 없을때 대비

componentDidUpdate
componentWillUnmount
```

```js
// getDerivedStateFromProps

static getDerivedStateFromProps(props) { // static 함수이다. 인자로 props를 받는다.
    //this.setState() // 클래스 함수에서 인스턴트 함수를 호출할 수 없다.
    return {
        age: props.age + 1,
    }; //return은 state를 반환한다.
}
```


```js
// getDerivedStateFromProps
getSnapshotBeforeUpdate(prevProps, prevState) { // DOM에 적용된 직후에 사용
    if(prevState.list.length === this.state.list.length) return
    const list = document.querySelector("#list");
    return list.scrollHeight - list.scrollTop;
}

// componentDidUpdate
componentDidUpdate(prevProps, prevState, snapshot) { // 위에서 받은 snapshot 수치가 들어온다.
    if (snapshot === null) return;
    const list = document.querySelector("#list");
    list.scrollTop = list.scrollHeight - snapshot; // 이전 수치를 이용해서 다룰 수 있다.
}

// snapshot 수치는 이전 DOM 상태의 수치를 가지고 적용시켜줄 수 있다.
// 실제로는 이렇게 다룰 일이 많지 않다.
```
----

16.3 까지는 애매모호 했다. (상태만 알려준다.)
그 이후는 확신하게 바꼈다 ("여기는 뭘 하는데야" 를 알려준다.)

```js
state = {
    hasError: false,
};

componentDidCatch(error, info) { // 새로 추가된 라이프사이클 오류시 다른 화면으로 렌더할 수 있게 도와준다.
    // Display fallback UI
    this.setState({ hasError: true }); // 를 통해서 에러발생시 다른요소를 렌더할 수 있게 해준다.
}

render() {
    if (this.state.hasError) {
        return <div>에러화면</div>
    }
}
// 본인의 에러는 알지 못하고 자신의 자식들만 알 수 있다.
// 에러를 뿜는 요소가 componentDidCatch를 가지고 있으면 안된다.
```
