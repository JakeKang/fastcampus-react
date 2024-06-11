---
# Style Loaders
---

`Webpack`에 설정 되어 파일 확장자에 따라 맞는 `loader` 에게 위임한다.
`.js .jsx`는 `babel-loader`가 처리한 후 최종 배포용 파일에 포함 시킨다.
`.css` 는 `style-loader, css-loader`가 css 파일을 읽어 읽은 파일들을 style 태그로 만들어 head 태그에 포함 시켜 최종 배포용 파일에 포함 시킨다.

```js
import './App.css'; // css 
import styles from './App.module.css'; // module css
import './App.scss'; // scss
import styles from './App.module.sass'; // module sass
```
----

# 컴포넌트 스타일링

---

[다양한 방식의 리액트 컴포넌트 스타일링 방식 CSS, Sass, CSS Module, styled-components](https://velog.io/@velopert/react-component-styling)

## 그냥 CSS

```jsx
// App.js
import "./App.css";

<div className="App">
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p>
      Edit <code>src/App.js</code> and save to reload.
    </p>
    <a
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn React
    </a>
  </header>
</div>;
```

```css
.App {
  text-align: center;
}

.App-logo {
  animation: App-logo-spin infinite 20s linear;
  height: 40vmin;
  pointer-events: none;
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

### **사용법**

- .js 파일에 css 파일을 import 해서 사용 (`import './App.css';`)
- Jsx 문법에서 태그에 `className="classname"` 형식으로 사용

### **특징**

- 전역적으로 CSS 타입이 적용할 수 있음.
- 일반적으로 HTML 파일 내에 import 하던 것을 전역적으로 import 할 수 있도록 하게 함.
- 보통은 이렇게 사용하는 것을 비추한다.
- 일반적으로 문제의 원인이 되곤 한다.

css를 작성할 때 가장 중요한 점은 중복되는 클래스명 생성하지 않는 것이고, 그것을 방지 하기 위해 꽤 다양한 방식이 사용되고 있는데 하나는 네이밍이고 하나는 CSS Selector의 활용이다.

1. 컴포넌트명-클래스 네이밍 (ex: 리액트의 `.App-header`)
2. BEM Naming
   1. [http://getbem.com/naming/](http://getbem.com/naming/)
   2. 컴포넌트마다 CSS 파일을 하나하나 만드는 상황에선 그렇게 권장 되지 않음.
3. CSS Selector를 활용

```css
.App {
  text-align: center;
}

/*.App 안에 들어있는 .logo*/
.App .logo {
  animation: App-logo-spin infinite 20s linear;
  height: 40vmin;
}

/* .App 안에 들어있는 header */
.App header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

/* .App 안에 들어있는 a 태그 */
.App a {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

## Sass (Syntactically Awesome Style Sheets: 문법적으로 짱 멋진 스타일시트) 사용하기

[Sass 강좌 - 한 눈에 보기](https://velopert.com/1712)

- node-sass 설치 (Sass 를 CSS로 변환)
- Scss(sass) 파일 생성후 import해서 사용

```bash
yarn add node-sass
```

```scss
.App {
  text-align: center;

  .logo {
    animation: App-logo-spin infinite 20s linear;
    height: 40vmin;
    pointer-events: none;
  }

  .header {
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }

  .link {
    color: #61dafb;
  }
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

## CSS/SASS Module

CSS와 SCSS는 사람이 하는 방식이라고 할때, 모듈 방식은 시스템이 하는 방식으로 제약을 건다고 할 수 있다.
- CSS, SCSS를 작성해서 모듈처럼 사용한다.
- CRA에서 지원하지 않았지만 현재는 지원하기 시작했다.
- CRA의 Adding a CSS Modules Stylesheet 문서에서 확인 가능하다.

```js
// App.js
import style from "./App.module.css"; // style에 App.module.css를 가져온다.

function App() {
  return (
    <div className={styles.App}> // App_App_16ZpL
      <div className={stlyes.logo}>
    </div>
  )
}

// App.module.css
.App {
  text-align: center;

  .logo {
    animation: App-logo-spin infinite 20s linear;
    height: 40vmin;
    pointer-events: none;
  }

  .header {
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }

  .link {
    color: #61dafb;
  }
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```
콘솔로 찍어보면 `[filename]\_[classname]\_\_[hash]` 로 받을 수 있다. `App_App_16ZpL`
className을 기준으로 사용하고 마지막 className을 사용한다.

###### 버튼을 이용한 간단한 예시

```js
//Button.module.css
.button {
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  font-size: 20px;
}

//Button.jsx
import React from "react";
import styles from "./Button.module.css";

export default function Button() {
  return <button className={style.button}>버튼</button>
}

//App.js
import React from "react";
import styles from "./App.module.scss";
import Button from "./components/Button";

function App() {
  return (
    <div ClassName={styles.App}>
      <Button />
    </div>
  )
}

export default App;
```

## classNames

classNames 는 CSS 클래스를 조건부로 설정 할 때 매우 유용한 라이브러리이다
CSS Module 을 사용 할 때 이 라이브러리를 함께 사용 한다면 여러 클래스를 적용할 때 편해진다.

```bash
npm i classnames
```

```jsx
import classNames from "classnames";

console.log(classNames("foo", "bar")); // "foo bar"
console.log(classNames("foo", "bar", "baz")); // "foo bar baz"

console.log(classNames({ foo: true }, { bar: true })); // "foo bar"
console.log(classNames({ foo: true }, { bar: false })); // "foo"
console.log(classNames(null, false, "bar", undefined, 0, 1, { baz: null }, "")); // "bar 1"
console.log(classNames(styles.button, styles.loading)); // Button_button__2Ce79 Button_loading__XEngF
```

여러가지 종류의 파라미터를 조합해 CSS 클래스를 설정 할 수 있게 되기 때문에, 컴포넌트에서 조건부로 클래스를 설정할때 굉장히 편하다. 예를 들어서 props 의 값에 따라 다른 스타일을 주게 하는게 쉬워진다.

```jsx
const MyComponent = ({ highlighted, theme }) => {
  <div className={classNames("MyComponent", { highlighted }, theme)}>
    Hello
  </div>;
};
```

```jsx
import React from "react";
import styles from "./Button.module.css";
import classNames from "classnames";

export default class Button extends React.Component {
  state = {
    loading: false,
  };

  startLoading = () => {
    console.log("start");
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  };

  render() {
    const { loading } = this.state;
    return (
      <button
        className={
          loading ? classNames(styles.button, styles.loading) : styles.button
        }
        {...this.props}
        onClick={this.startLoading}
      />
    );
  }
}
```

### import classNames from 'classnames/bind';

```jsx
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

console.log(cx("button", "loading")); // Button_button__2Ce79 Button_loading__XEngF
console.log(cx("button", { loading: false })); // Button_button__2Ce79
```

```jsx
import React from "react";
import styles from "./Button.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default class Button extends React.Component {
  state = {
    loading: false,
  };

  startLoading = () => {
    console.log("start");
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  };

  render() {
    const { loading } = this.state;
    return (
      <button
        className={cx("button", { loading })}
        {...this.props}
        onClick={this.startLoading}
      />
    );
  }
}
```

## 오늘 수업의 핵심

react 만으로 해결되지 않는 부분을 위해 무언가를 추가하는 것.

## styled-components

styled-components 는 현존하는 리액트 CSS-in-JS 관련 라이브러리 중에서 가장 잘나가는 라이브러리라고 한다. CSS-in-JS 는 이름이 그렇듯, 자바스크립트 파일 안에 CSS 를 작성하는 형태이다. 해외의 큰 기업 - Atlassian, Reddit, coinbase 등에서도 사용되고 있고, 국내에서도 사용하는곳이 꽤 있다고 한다. - [Channel.io](http://channel.io/), Huiseoul, Tumblebug 등..

```bash
npm i styled-components
```

### 스타일링 된 엘리먼트 만들기

1. `styled.{tag_name}`
2. `styled.('{tag_name}')`
3. `styled.({component})`

```jsx
import styled from "styled-components";

// 함수 밖에서 선언하며 템플릿 스트링을 사용한다.
const StyledButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
`;

export default StyledButton;
```

```jsx
import React from "react";
import StyledButton from "./components/StyledButton";

function App() {
  return (
    <div className="App">
      <p>
        <StyledButton>버튼</StyledButton>
      </p>
    </div>
  );
}

export default App;
```

### 예제

1. props로 넣어준 값을 직접 전달할 수 있다.
2. &문자를 사용하여 Sass 처럼 자기 자신 선택 가능하다 (중요!)
3. 특정 props의 값이 true일때 특정 스타일을 부여할 수 있다.
   1. `${props ⇒ css`{...styles}`}`

```jsx
import React from "react";
import styled, { css } from "styled-components";

const Box = styled.div`
  /* props 로 넣어준 값을 직접 전달해줄 수 있습니다. */
  background: ${(props) => props.color || "blue"};
  padding: 1rem;
  display: flex;
`;

const Button = styled.button`
  background: white;
  color: black;
  border-radius: 4px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 600;

  /* & 문자를 사용하여 Sass 처럼 자기 자신 선택 가능 */
  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }

  /* 다음 코드는 inverted 값이 true 일 때 특정 스타일을 부여해줍니다. */
  ${(props) =>
    props.inverted &&
    css`
      background: none;
      border: 2px solid white;
      color: white;
      &:hover {
        background: white;
        color: black;
      }
    `};
  & + button {
    margin-left: 1rem;
  }
`;

const StyledComponent = () => (
  <Box color="black">
    <Button>안녕하세요</Button>
    <Button inverted={true}>테두리만</Button>
  </Box>
);

export default StyledComponent;
```

### as='{tag_name}' / as={'{element}'}

스타일링된 엘리멘트를 특정 tag 로 변경 가능\

```jsx
import React from "react";
import StyledButton from "./components/StyledButton";

function App() {
  return (
    <div className="App">
      <p>
        <StyledButton as="a" href="/">
          a 태그 버튼
        </StyledButton>
        <StyledButton>버튼</StyledButton>
      </p>
    </div>
  );
}

export default App;
```

- :hover{{...styles}}
- ::before{{...styles}}
- &:hover{{...styles}}
- & ~ & {{...styles}}, & + & {{...styles}}
- &.{class_name} {{...styles}}
- .{class_name} {{...styles}}
- createGlobalStyle`{...styles}`

### styled.{tab_name}.attr(props => ({{...attributes}))

default attribute를 지정할 수 있다.

```jsx
import styled from "styled-components";

const StyledA = styled.a.attrs((props) => ({
  href: props.href || "https://www.fastcampus.co.kr",
  color: props.color || "palevioletred",
  target: "_BLANK",
}))`
  color: ${(props) => props.color};
`;

export default StyledA;
```

```jsx
import React from "react";
import StyledA from "./components/StyledA";

function App() {
  return (
    <div className="App">
      <p>
        <StyledA>링크</StyledA>
        <StyledA color="red">링크</StyledA>
      </p>
    </div>
  );
}

export default App;
```

### keyframes`{...keyframes_attr}`

```jsx
import styled, { keyframes } from "styled-components";

const slide = keyframes`
  from {
    margin-top: 0em;
  }

  to {
    margin-top: 1em;
  }
`;

const StyledButton = styled.button`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  animation: ${slide} 0.3s ease-in;
`;

export default StyledButton;
```

## ref

DOM을 컨트롤할 상황에 쓰임.

```jsx
import styled from "styled-components";

const StyledInput = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

export default StyledInput;
```

```jsx
import React from "react";
import StyledInput from "./components/StyledInput";

class App extends React.Component {
  inputRef = React.createRef();
  render() {
    return (
      <div className="App">
        <p>
          <StyledInput
            ref={this.inputRef}
            placeholder="Hover to focus!"
            onMouseEnter={() => {
              this.inputRef.current.focus();
            }}
          />
        </p>
      </div>
    );
  }
}

export default App;
```

- React.createRef() 로 ref 인스턴스 생성
- 컴포넌트의 props를 생성된 ref 전달
- this.{ref_name}.current ⇒ DOM 참조

###### Shadow DOM을 리액트로 가져온게 REACT SHADOW DOM 이다.

```
npm i react-shadow
```

```js
// components/ShadowButton.jsx
import React from 'react';
import root from 'react-shadow';

const style = `
button { // 문자열의 영역이다.
  color: red;
}
`;

export default function ShadowButton() {
  return (
    <root.div> // 감싸고 싶은 외각에 shadow를 설정한다.
      <button>버튼</button>
      <style>{style}</style> // 위의 스타일 문자열이 여기에 들어온다.
    </root.div>
  );
}

// App.js
// ...
import ShadowButton from 'components/ShadowButton';

function App() {
  return (
    <ShadowButton/>
  )
}
```

개발자 도구를 통해 보면 `<div> #shadow-root(open) <button>버튼</button><style>button{color:red}</style></div>` 라고 나온다. 버튼은 보이지만 style은 태그만 존재할뿐 css처럼 스타일만 지정한다.

상대적인 크기를 지정하는 속성인 em, rem 안먹힌다.
component의 root 사이즈를 정하는 방법이 생겼다 hem

# Ant Design
컴포넌트를 제공해주며 기본적으로 모든 컴포넌트가 디자인 되어있다.
사이트의 문서를 통해 사용법을 확인할 수 있다.

[](https://ant.design/)

```js
//index.js
import "antd/dist/antd.css"; // 가장 상위에서 전역으로 설정하기 위해 개인 설정 위에 넣는다.
import "./index.css";
```

```js
//App.js
import React from "react";
import { Calendar } from "antd";

function App() {
  return <div>
    <Calendar />
  </div>
}
```

##### modularized 1
```js
import DatePicker from "antd/es/date-picker";
import "antd/es/date-picker/style/css";
```
전체적인 CSS 디자인을 받는게 아닌 필요한 디자인만 가져와서 사용할 수 있다.
위 코드는 date-picker에 대한 스타일만 지정할 수 있다.

##### import { Row, Col } from 'antd';
```js
import React from 'react';
import { Row, Col } from 'antd';

const colStyle = () => ({
  height: 50,
  backgroundColor: 'red',
  opacity: Math.round(Math.random() * 10) / 10,
});

function App() {
  return (
    <div className="App">
      <Row>
        <Col span={12} style={colStyle()} />
        <Col span={12} style={colStyle()} />
      </Row>
      <Row>
        <Col span={8} style={colStyle()} />
        <Col span={8} style={colStyle()} />
        <Col span={8} style={colStyle()} />
      </Row>
      <Row>
        <Col span={6} style={colStyle()} />
        <Col span={6} style={colStyle()} />
        <Col span={6} style={colStyle()} />
        <Col span={6} style={colStyle()} />
      </Row>
    </div>
  );
}

export default App;
```
