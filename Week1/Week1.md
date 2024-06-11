## 패스트캠퍼스(FASTCAMPUS)

## React로 구현하는 웹 애플리케이션 프로젝트 12기

### 1주차
[1주차 슬라이드쇼](https://slides.com/woongjae/react-camp-1)

1.강의실 화이트보드에 출석코드 확인.
2.강의평가 진행하면서 출석코드 입력.

해당 프로젝트 폴더로 이동해서
npm ci 입력 시 package-lock.json의 모든 데이터를 다운받아옴

### 리액트 시작하기

----

#### 리액트를 위한 JS 문법 정리

###### var의 문제
1. 헷갈리는 함수 레벨 스코프
2. 중복 선언이 가능
3. 생략도 가능
4. 호이스팅

##### let은 var의 문제를 해결
1. 블록 레벨 스코프
2. 중복 선언 => syntax error (런타임 시작하면서 문법적으로 문제가 있으므로 에러 출력)
3. 호이스팅 => syntax error (위에서 선언하지 않은 변수를 밑에서 참조할 수 없게 되어있다.)

```js
// 중복선언 => SyntaxError
{
let variable = "block scope";
let variable = "duplicated";
console.log(variable);
}
// 호이스팅 => ReferenceError
console.log(variable);
let variable = "hoisted";
```

##### let은 변경 가능, const는 불가능
```js
//Primitive
let a = 'a';
a = 'b';
a;

const c = 'c';
c = 'd'; //TypeError
c;

//Reference
let e = {
    foo: 'foo',
};
e = {
    bar : 'bar',
};
e;

const f = {
    foo: 'foo',
};
// f = {
//  foo : 'bar',
// }; TypeError
f.foo = 'bar'; // 값을 바꾸는건 허용
f;
}
```
Primitive Type(원시타입) : 데이터의 실제값 할당 (데이터 값이 복사)
종류 : Boolean, number, String, null, undefined [Object 타입을 제외한 나머지]

Reference Type(참조타입) : 데이터의 위치 값만 할당 (데이터의 참조가 복사)
종류 : Object (array, function, object)

const를 사용하는 이유 => 다른사람에게 얘는 밑에서 가리키는 대상이 바뀌지 않는다고 확신을 시켜주는 것

----

##### template string
```js
const name = "Kang";

console.log('안녕하세요. \n' + name + '입니다.'); // 예전

console.log(`안녕하세요. ${name}입니다.`); // template string
```

----
##### arrow function
+ 자신의 this를 만들지 않는다.
+ 생성자로 사용할 수 없다.
+ 항상 익명 함수
+ 리턴만 있으면, {} 생략
+ 인자가 하나면, () 생략

```js

// 익명 함수를 변수에 대입해서 사용
const a = () => {
    return '리턴';
};

console.log(a());

// 리턴이 바로 표현 가능하면, { return } 생략
const b = () = > '리턴';

console.log(b());

// 매개변수가 한개면 () 생략
const c = props => `리턴 ${props}`;

console.log(c('프롭스'));
```

----

##### 함수 .bind(디스)
+ 함수의 this 로 인자로 넣는 "디스"를 사용하는 함수를 만들어 리턴

```js
function hello() {
    console.log(`안녕하세요 ${this.name}`);
}

const kang = {
    name: 'Kang',
};

const helloKang = hello.bind(Kang);

helloKang();

const Kim = {
    name: 'Kim",
};

const helloKim = hello.bind(Kim);

helloKim();
```

##### Destructuring assignment
```js
const foo = {
    a: '에이',
    b: '비이',
};

const { a, b } = foo;
console.log(a, b);

const bar = ['씨이', '디이'];

const [c, d] = bar;
console.log(c, d);

const {a: newA, b: newB } = foo;
console.log(newA, newB);
```

##### Spread와 Rest
```js
function sum(a, b, c) {
    return a + b + c;
}
console.log(sum(1, 2, 3));

const numbers = [2, 3, 4];
console.log(sum(...numbers)); // spread
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
// {a:{b:100}} {a:{b:200}}
```

```js
// rest
function rest1(...args) {
    console.log(args);
}

rest1('Kang', 26, 'Korea');

function rest2(name, ...args) {
    console.log(name, args);
}

rest2('Kang', 26, 'Korea');
```
----

##### callback
과거 비동기 처리를 위한 선택
```js
function foo(callback) {
    setTimeout(() => {
        //로직
        callback();
    }, 1000);)
}

foo(() => {
    console.log('end');
});
console.log('이것이 먼저 실행');
```
----

##### Promise 객체의 등장
+ Promise 객체를 만들고, 로직 처리 후 성공과 실패를 알려준다.
+ then과 catch를 통해 메인 로직에 전달한다.
```js
function foo() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            //로직
            resolve();
        }, 1000);
    });
}

foo().then(() => {
    console.log('end');
});
console.log('이것이 먼저 실행');
```
----

##### aysnc - await
+ 기본적으로 Promise를 사용한다.
+ then과 catch를 통해 메인 로직에 전달한다.
+ async 키워드가 붙은 함수 안에서만 await 키워드를 사용할 수 있다.

```js
function foo() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            //로직
            resolve();
        }, 1000);
    });
}

(async () => {
    await foo(); // 비동기 함수 실행 (Promise를 리턴)
    console.log('end'); // 위에서 resolve가 되야 실행된다.
    console.log('이것이 먼저 실행');
})();
```

----

##### Generator 객체
+ `function*` 으로 만들어진 함수를 호출하면 반환되는 객체
+ `function*` 에서 yield 를 호출하여, 다시 제어권을 넘겨준다.
+ 제너레이터 객체에 next() 함수를 호출하면, 다음 yield 지점까지 간다.

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

예시로 운전대를 내가 잡고 yield(일드) 1까지 진행 다음 사람에게(next) 운전대를 주고 yield 2까지 진행한다.
React에서 제너레이터 객체를 잘 활용하는 라이브러리로 redux-saga가 있다.

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
---

#### React Concept

##### Keyword
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

---

Angular = 프레임워크
React = 라이브러리
Vue = 프레임워크와 라이브러리가 혼합되어있다.

프레임워크 => 모든것이 다 들어있고 프레임워크가 돌아가는것에 내가 어느 부분만 끼워 넣으면 되는것
라이브러리 => 그 라이브러리가 다루는 기능을 우리가 사용하는것

ex) http client로 API를 호출할때, Angular는 내장 모듈을 사용하면 된다.
하지만 React와 Vue는 내장 모듈이 없으므로 라이브러리를 사용하거나 직접 작성해야한다.

---

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

__Client Side Rendering__
+ JS 가 전부 다운로드 되어 리액트 애플리케이션이 정상 실행되지 전까지는 화면이 보이지 않음.
+ JS 가 전부 다운로드 되어 리액트 애플리케이션이 정상 실행된 후, 화면이 보이면서 유저가 인터렉션 가능

__Server Side Rendering__
+ JS 가 전부 다운로드 되지 않아도, 일단 화면은 보이지만 유저가 사용할 수 없음.
+ JS 가 전부 다운로드 되어 리액트 애플리케이션이 정상 실행된 후, 유저가 사용 가능

----

#### React 라이브러리

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

#### JSX 문법
JSX 문법으로 작성된 코드는 순수한 JavaScript로 컴파일 하여 사용한다. => Babel

##### JSX를 사용하는 이유
+ React.createElement VS JSX
    * 가독성 완승
+ babel과 같은 컴파일 과정에서 문법적 오류를 인지하기 쉬움

#### Creact React APP
[CRA](https://create-react-app.dev/)

```
npx create-react-app tic-tac-toe
// 리액트앱을 만들기 위해 필요한 기본적인 모든 패키지를 다운 받는다.
```

__npx__
npm 5.2.0 이상부터 함께 설치된 커맨드라인 명령어

__npx의 필요 이유__
+ 프로젝트 로컬에 설치된 패키지의 실행 커맨드를 사용하려면
    * packge.json의 npm scripts에 명령어를 추가하여 사용해야 했다.
    * npx 로 바로 실행 가능
+ 전역으로 실행하고 싶은 패키지가 있을 경우
    * npm i -g 를 이용하여, 전역에 꼭 설치해서 사용해야 가능했다.
    * npx 로 최신 버전의 패키지를 받아 바로 실행 가능

##### npx create-react-app tic-tac-toe
npx create-react-app 프로젝트이름

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

#### props 와 state

+ Props 는 컴포넌트 외부에서 컴포넌트에게 주는 데이터
+ State 는 컴포넌트 내부에서 변경할 수 있는 데이터
__둘 다 변경이 발생하면, 랜더가 다시 일어날 수 있다.__

__Render 함수__
Props 와 State 를 바탕으로 컴포넌트를 그린다.
그리고 두가지가 변경되면, 컴포넌트를 다시 그린다.
컴포넌트를 그리는 방법을 기술하는 함수이다.

> 7.11...여기까지 진행

###### props 와 state 추가정리
+ props 는 부모 컴포넌트가 자식 컴포넌트에게 주는 값, 자식 컴포넌트에서는 props를 받아오기만 하고, 받아온 props를 직접 수정할 수 없다.
+ state 는 컴포넌트 내부에서 선언하며 내부에서 값을 변경할 수 있다.
