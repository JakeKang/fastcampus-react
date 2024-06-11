## 패스트캠퍼스 React

### Study

##### React에서 자주 사용하는 ES6 문법

+ const let
    * let : 블록 레벨 스코트, 중복선언 호이스팅 X
    * const : let은 변경가능, const는 변경 불가능

+ template strign
    * 백틱(``)을 이용한 문자열 및 ${자바스크립트 표현식}

+ arrow function
    * 자신의 this를 만들지 않는다.
    * 생성자로 사용할 수 없다.
    * 항상 익명 함수
    * 리턴만 있으면, {} 생략
    * 인자가 하나면, () 생략

```js
// 익명 함수를 변수에 대입해서 사용
const a = () => {
    return '리턴'l
};

// 리턴이 바로 표현 가능하면 생략
const b => () => '리턴';

// 매개변수가 한개면 () 생략
const c = props => `리턴 ${props}`;
```

+ .bind(this)
    * 함수의 this로 인자로 넣은 "디스"를 사용하는 함수를 만들어 리턴
```js
function hello() {
    console.log(`안녕하세요 ${this.name}`);
}

const kang = {
    name: 'Kang',
};

const helloKang = hello.bind(Kang);
helloKang(); // 안녕하세요 Kang.
```
+ Destructuring assignment
    * 구조분해 할당
```js
const foo = {
    a: '에이',
    b: '비이',
};

const {a, b} = foo;
console.log(a, b);
```
+ Spread 와 Rest
    * ...
    * 배열, 객체
    * 1 레벨 깊이 복사
```js
const obj = { a: { b: 100 } };

const objCloned = { ...obj };
objCloned.a.b = 200;

console.log(obj, objCloned) // { a {b: 200} }  { a {b : 200} }

const obj2Cloned = { ...obj, a: { ...obj.a }};
obj2Cloned.a.b = 200;
console.log(obj, objCloned) // {a {b:100} } { a {b:200} }
```

+ Promise
    * Promise 객체를 만들고, 로직 처리 후 성공과 실패를 알려준다.
    * then 과 catch 를 통해 메인 로직에 전달한다.

+ async await
    *  기본적으로 Promise를 사용한다.
    * then 과 catch 를 통해 메인 로직에 전달한다.
    * async 키워드가 붙은 함수 안에서만 await 키워드를 사용할 수 있다.

```js
// Promise
function foo() {
    return new Promise((resolve, reject) => { // 완료시 resolve 실패시 reject
        setTimeout(() => {
            //로직
            resolve();
        }, 1000);
    });
}

(async () => {
    await foo();
    console.log("end");
    console.log("이것이 먼저 실행");
})();
```

+ Generator
    * `function*` 으로 만들어진 함수를 호출하면 반환되는 객체이다.
    * `function*` 에서 yield 를 호출하여, 다시 제어권을 넘겨준다.
    * 제너레이터 객체에 next() 함수를 호출하면, 다음 yield 지점까지 간다.

```js
// generator.js

function* foo() {
  console.log(0.5);
  yield 1;
  console.log(1.5);
  yield 2;
  console.log(2.5);
  yield 3;
  console.log(3.5);
}

const g = foo();
console.log(g.next().value); // 0.5
console.log(g.next().value); // 1 1.5
console.log(g.next().value); // 2 2.5
console.log(g.next().value); // 3 3.5
console.log(g.next().value); // undefined
```

##### React Concept
__Keyword__
* __Angular__ vs __React__ vs __Vue__
* View 를 다루는 라이브러리
* Only Rendering & Update
    * NOT included another functionality(ex. http client, ..);
* Component Based Development
    * 독립적인 코드 블럭(HTML + CSS + JavaScript)
    * 작업의 단위
* Virtual DOM
    * DOM을 직접 다루지 않음
* JSX
    * NOT Templates
    * transpile to JS(Babel, TypeSrcipt);
* CSR & SSR


```html
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

Componet Tree => DOM Tree

##### Virtual DOM?
    * DOM 을 직접 제어하는 겨우
        * 바뀐 부분만 정확히 바꿔야 한다.
    * DOM 을 직접 제어하지 않는 경우
        * 가상의 돔 트리를 사용해서,
        * 이전 상태와 이후 상태를 비교하여,
        * 바뀐 부분을 찾아내서 자동으로 바꾼다.


##### CSR VS SSR
* CSR
    * JS 가 전부 다운로드 되어 리액트 애플리케이션이 정상 실행되기 전까지는 화면이 보이지 않음
    * JS 가 전부 다운로드 되어 리액트 애플리케이션이 정상 실행된 후, 화면이 보이면서 유저가 인터렉션 가능 => 권장
* SSR
    * JS 가 전부 다운로드 되지 않아도,
    일단 화면은 보이지만 유저가 사용할 수 없음.
    * JS 가 전부 다운로드 되어 리액트 애플리케이션이 정상 실행된 후, 유저가 사용가능

#### 리액트가 하는 일
```js
// 리액트 핵심 모듈 2개

// 1. 리액트 컴포넌트 => HTMLElement 연결
import ReactDOM from 'react-dom';

// 2. 리액트 컴포넌트 만들기
import React from 'react';
```

```js
ReactDOM.render (
<HelloMessage name="Taylor" />,
document.getElemnetById('hello-example'),
);
```

```js
class HelloMessage extends React.Component {
    render() {
        return (
            <div>
                Hello {this.props.name}
            </div>
        );
    }
}
```

"만들어진 리액트 컴포넌트"를 실제 HTMLElement에 연결할 때 React DOM 라이브러리를 이용한다.

CDN 을 통한 리액트 라이브러리 사용
{ React 컴포넌트 } 만들 때 사용하는 API 모음이 있다.

`<script>` 태그를 통해  CDN Links 를 연결한다.

고전 프론트엔드의 경우 HTML로 문서 구조를 잡고 CSS 로 스타일을 입히고 JavaScript로 DOM을 조작한다.

컴포넌트를 활용한 프론트엔드의 경우 컴포넌트를 정의하고, 실제 DOM에 컴포넌트를 그려준다.

JSX 문법으로 작성된 코드는 순수한 JavaScript로 컴파일 하여 사용하는데 이때 Babel의 지원을 받는다.

```js
import React, {Component} from ' react';

class HelloWorld extends Component {
    render() {
        return (
            <h1>Hello World</h1>
        )
    }
}

class App extends Componet
    render() {
        return (
            <div>
                <helloWorld />
            </div>
        )
    }

export default App;
```

```js
import React, {Component} from ' react';

class App extends Componet
    render() {

        const name = "개발자";
        const age = 20;

        const style = {
            backgroundColor: "red",
        };

        return (
            <div>
                <h1 style={style}>
                    이름은 {name}<br/>
                    나이는 {age} 입니다.
                </h1>
            </div>
        )
    }

export default App;
```

##### CRA
```
npx create-react-app tic-tac-toe
```

npm 5.2.0 이상부터 함께 설치된 커맨드라인 명령어
* 프로젝트의 로컬에 설치된 패키지의 실행 커맨드를 사용하려면,
    * package.json의 npm scripts에 명령어를 추가하여 사용해야 했다.
    * npx 로 바로 실행 가능
* 전역으로 실행하고 싶은 패키지가 있을 경우,
    * npm i -g 를 이용하여, 전역에 꼭 설치해서 사용해야 가능했다.
    * npx 로 최신 버전의 패키지를 받아 바로 실행 가능

npm start로 개발 용 서버를 띄운다 포트 :3000
소스 코드 수정시 다시 컴파일하고 웹페이지를 자동 새로고침 한다.

Project 폴더 바로 아래 build 라는 폴더가 만들어지고, 그 안에 production 배포를 위한 파일들이 생성된다.
```
npm install serve -g
serve -s build
// serve 패키지를 전역으로 설치하고 build 폴더를 지정하여 실행

-s 옵션은 어떤 라우팅으로 요청해도 index.html 을 응답하도록 한다.
```

eject를 이용하면 cra 로 만든 프로젝트에서 cra 를 제거한다. 돌이킬 수 없기 때문에 결정하기 전에 신중해야 한다. 보통 cra 내에서 해결이 안되는 설정을 추가해야 할 때 쓴다.

##### Hooks 이전
* 컴포넌트 내부에 상태가 있다면? Class
* 컴포넌트 내부에 상태가 없다면?
    * 라이프사이클을 사용해야 한다면?
        * Class
    * 라이프사이클에 관계 없다면?
        * function

###### 라이프사이클
컴포넌트가 DOM 위에 생성되기 전 후 및 데이터가 변경되어 상태를 업데이트하기 전 후로 실행되는 메소드들

###### Hook
React 16.8에 새롭게 추가되면서 Class를 작성할 필요 없이 상태 값과 여러 React의 기능을 사용할 수 있다.

```js
// class 컴포넌트

import React from 'react';

class ClassComponent extends React.Component {
    render() {
        return (<div>Hello</div>);
    }
}

// 사용시
<ClassComponent />
```

```js
// function 컴포넌트

import React from 'react';

function FunctionalComponent() {
    return <div>Hello</div>;
}

const FuncionalComponent = () => <div>Hello</div>;

//사용시
<FunctionalComponent />
```

##### Props 와 State
* Props
    * 컴포넌트 외부에서 컴포넌트에게 주는 데이터
* State
    * 컴포넌트 내부에서 변경할 수 있는 데이터
* 둘 다 변경이 발생하면, `render()`가 다시 일어날 수 있다.

`render()` 컴포넌트를 그리는 방법을 기술하는 함수이다.
Props 와 State 를 바탕으로 컴포넌트를 그린다.
