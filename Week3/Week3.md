## 패스트캠퍼스 React

### Week3

사용 슬라이드
[Week3 라우팅](https://slides.com/woongjae/react-camp-3)
[Week4 컴포넌트 스타일링](https://slides.com/woongjae/react-camp-4)

#### Switch 와 NotFound

React-Router 에서 컴포넌트로 제공한다.

__Switch__
- 여러 `Route` 중 순서대로 먼저 맞는 하나만 보여준다.
- `exact` 를 뺄 수 있는 로직을 만들 수 있다.
- 가장 마지막에 어디 `path` 에도 맞지 않으면 보여지는 컴포넌트를 설정해서,
"Not Found" 페이지를 만들 수 있다.

```js
//...
import {BrowserRouter, Route, Switch} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/profile:id" exact component={Profile} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/about" exact component={About} />
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App
```

어떤 `Path`를 입력해도 `Home`으로 이동하기 때문에 `Home`에 `exact`를 사용해준다.

그리고 `Path`에 해당하는 주소가 없을때 이동하는 NotFound(임의의 컴포넌트) 페이지를 생성한다.

```js
//NotFound.jsx

import React from 'react';

export default function NotFound() {
    return <h1>페이지를 찾을 수 없습니다.</h1>
}
```

```js
//App.js
function App() {
  return ( // Switch를 사용시 낮은 값이 아래로 가게 한다.
  <BrowserRouter>
    <Switch>
      <Route path="/profile/:id" component={Profile} />
      <Route path="/profile" exact component={Profile}/>
      <Route path="/login" component={login}/>
      <Route path="/about" component={About}/>
      <Route path="/" exact component={Home}/>
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
  );
}
export default App;
```

----

#### ErrorBoundaries
자식 요소에서 문제가 생겼을때 다른 페이지를 보여줄 수 있다.

`{Errorpage}` 부분의 컴포넌트를 직접 만들 수 있고, 미리 만들어져있는 컴포넌트를 사용할 수 있다.

```js
//App.js
function App() {
  return ( // Switch를 사용시 낮은 값이 아래로 가게 한다.
  <ErrorBoundaries FallbackComponet={Errorpage}>
  <BrowserRouter>
    <Switch>
      <Route path="/profile/:id" component={Profile} />
      <Route path="/profile" exact component={Profile}/>
      <Route path="/login" component={login}/>
      <Route path="/about" component={About}/>
      <Route path="/" exact component={Home}/>
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
  </ErrorBoundaries>
  );
}
export default App;
```

----

#### JSX 링크로 라우팅 이동하기

##### a태그

```html
<a href="/">Home</a>
```

앱을 새로고침하면서 경로를 이동한다.

```js
//App.js
function App() {
  return ( 
  <BrowserRouter>
    <ul>
      <li>
        <a href="/">Home으로 가기</a>
      </li>
    </ul>
    <Switch>
      <Route path="/profile/:id" component={Profile} />
      <Route path="/profile" exact component={Profile}/>
      <Route path="/login" component={login}/>
      <Route path="/about" component={About}/>
      <Route path="/" exact component={Home}/>
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
```
위의 방법은 `HTML`을 로딩하고 다시 해당 `JS` 파일을 로딩하며 브라우저 로딩이 발생한다.

해당 링크의 `a태그`를 눌러도 동일하게 로딩이 발생하게된다.

`SPA`에서는 클라이언트가 이미 존재하는데 다시 서버에가서 요청하고 페이지를 받아오는 상태와 맞지 않다.

서버에 다녀오지 않고 새로 바뀌는 주소에 해당하는 컴포넌트로 바꿔서 보여줘야 하고 주소창을 서버에 요청하지 않은 상태로 바꿔야한다.

그러한 트릭을 이용하기 위해서 `react-router-dom`의 컴포넌트를 사용할 수 있다.

##### Link

```js
<Link to="/">Home</Link>
```
- 브라우저의 주소를 바꾸고
- 맞는 Route 로 화면을 변경한다.

```js
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

//App.js
function App() {
  return ( 
  <BrowserRouter>
    <ul>
      <li>
        <Link to="/">Home 으로 가기</Link>
      </li>
      <li>
        <Link to="/profile">profile로 가기</Link>
      </li>
      <li>
        <Link to="/profile/3">3번 유저로 가기</Link>
      </li>
      <li>
        <Link to="/about">About 으로 가기</Link>
      </li>
    </ul>
    <Switch>
      <Route path="/profile/:id" component={Profile} />
      <Route path="/profile" exact component={Profile}/>
      <Route path="/login" component={login}/>
      <Route path="/about" component={About}/>
      <Route path="/" exact component={Home}/>
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
```
브라우저 새로고침은 주소창을 기준으로 움직인다.

- SPA
`Link` 컴포넌트를 이용하면 로딩 및 네트워크 트래픽이 생기지 않는 상태에서 주소창과 컴포넌트를 교체해준다.

##### NavLink

- `activeClassName`, `activeStyle` 처럼 `active` 상태에 대한 스타일 지정이 가능하다.
- `Route` 의 `Path` 처럼 동작하기 때문에 `exact` 가 있다.

즉 경로가 같으면 `active` 상태가 활성화 된다. 
- react 코드의 path와 브라우저 주소창의 path가 동일하다는 의미

```js
<NavLink to="/" activeStyle={{fontSize: 5}}>
  Home으로 가기
</NavLink>
// to="/"가 리액트 내의 주소와 동일하면 폰트사이즈가 5가 된다.
```

```js
<NavLink to="/profile" activeClassName="hello">
  Profile로 가기
</NavLink>


// App.css
.hello {
  color: green;
}

// profile로 이동하면 컬러가 그린으로 변경된다.
```

----

#### JS로 라우팅 이동하기
```js
// App.js
// ...
import Login from "./pages/Login"

// ...
<Route path="/login" component={Login}/>

// Login.jsx
import React from "react";

export default function Login({history}) {
  return (
    <div>
      <h1>Login</h1>
      <button onClick={click}>로그인 하기</button>
    </div>
  )
  function click() {
    setTimeout(() => {
      //1번 방법 (로딩 발생)
      //window.location.href="/";
    history.push("/");
    // props.history.push 를 분해할당해서 history만 사용한다.
    }, 1000)
  } // 함수안에 있으므로 호이스팅 되므로 함수를 사용할 수 있다.
}
```
----

#### withRouter()
```js
// pages/Login.jsx
import React from "react";
import LoginButton from "../components/LoginButton";

export default function Login({history}) {
  return (
    <div>
      <h1>Login</h1>
      <LoginButton />
    </div>
  );
}
```

```js
// components/LoginButton.jsx
import React from 'react';

export default function LoginButton() {
  return <button onClick={click}>로그인 하기</button>

  function click() {
    setTimeout(() => {
      history.push('/');
    }, 1000)
  } 
}
```

`LoginButton`은 `props`를 받지 않았기에 `history`를 알지 못한다.

그러므로 `history.push`를 이용할 수 없다.

첫 번째 방법으로 부모가 자식에서 `props`를 직접 넘겨주는 방법.

```js
// pages/Login.jsx
<LoginButton history={history}/>

// components/LoginButton.jsx
import React from 'react';

export default function LoginButton({history}) {
  return <button onClick={click}>로그인 하기</button>

  function click() {
    setTimeout(() => {
      history.push('/');
    }, 1000)
  } 
}
```

부모요소가 많을 경우 자식요소에게 순차적으로 내려줘야 하는데 컴포넌트가 많아질 경우 문제가 발생할 수 있다.

두 번쨰 방법으로 `withRouter()` 를 사용하는 방법이있다.

```js
// pages/Login.jsx
import React from "react";
import LoginButton from "../components/LoginButton";

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <LoginButton />
    </div>
  );
}
```

```js
// components/LoginButton.jsx
import React from 'react';
import { withRouter } from "react-router-dom";

function LoginButton() {
  return <button onClick={click}>로그인 하기</button>

  function click() {
    setTimeout(() => {
      history.push('/');
    }, 1000)
  } 
}

export default withRouter(LoginButton); // withRouter 함수를 실행하여 LoginButton 함수를 넘겨준다.
```

부모가 자식요소에게 직접적으로 `Props`를 꽃아주지 않아도 `withRouter()` 함수를 통해 부모요소의 `Props`를 사용할 수 있다. 

----

#### HOC (Higher Order Component)
정통강자 => 요즘 리액트와 떨어진다.

`withRouter()`와 같은 요소들이 포함되며 최신 리액트에서는 `Hooks`을 이용해서 같은 일을 할 수 있다.

advanced technique in React for reusing component logic.
=> 리액트에서 안써도 상관없지만 있으면 좋다.
=> 컴포넌트의 로직을 다시 사용하기 위해서 쓴다. (재사용 가능)

not part of the React API
=> API와 전혀 상관없다

a pattern that emerges from React’s compositional nature.
=> 리액트의 조합적인 성격의 패턴이다. (컴포넌트의 조합 등)

```js
HOC = function(컴포넌트) { return 새로운 컴포넌트; }
```

`<컴포넌트>` 를 인자로 받아 `<새로운 컴포넌트>` 를 리턴하는 함수

A라는 컴포넌트를 받아 A를 복사 하는 형태가 아니라
받아서 다른 어딘가에 놓고 다시 주는 형태이다.

`HOC`의 원리는, 파라미터로 컴포넌트를 받아오고, 함수 내부에서 새 컴포넌트를 만든 다음에 해당 컴포넌트 안에서 파라미터로 받아온 컴포넌트를 렌더링하는 것이다.

자신이 받아온 `props` 들은 그대로 파라미터로 받아온 컴포넌트에게 다시 주입해주고, 필요에 따라 추가 `props`도 넣어준다.

###### withRouter(Component)
```js
withRouter(Component) -> NewComponent
```
withRouter로 컴포넌트를 받아와 새로운 형태의 컴포넌트를 내보낸다.

-----

##### HOC에 설정이 필요한 경우

###### connect (다시 다룰 예정)
```js
connect() -> function -> function(Component) -> NewComponent
```
1. `connect()`로 한번 호출하고 그 결과가 `function`이다.
2. 결과 `function(Component)` 에 내 컴포넌트를 넣는다.
3. 그 결과가 `NewComponent`가 된다.

```js
connect(설정)(Component) -> NewComponent
export default connect()(Component); // export 해서 사용하는 방법
```
위 과정을 축약하여 표현하면 이러한 과정을 거친다. 넣어준 컴포넌트가 설정의 과정을 거쳐서 새로운 컴포넌트로 반환된다.

###### createFragmentContainer
```js
createFragmentContainer(Component, 설정) -> NewComponent
```
동일하게 컴포넌트와 뒤에 설정을 넣으면 새로운 컴포넌트를 반환한다.

##### 사용하는 법
똑같은 로직을 짜고 있다는 느낌을 받을 때, `HOC`를 사용한다.
- cross-cutting concerns (횡단 관심사) : 로그인, DB에 API를 요청하는 등 전체 페이지에 동일한 작업을 반복적인 로직이 흘러갈때 사용한다.

- Don't Mutate teh original Component. Use Composition.
```js
// Mutate
Component; // 컴포넌트를 하나 받아온다.

class NewComponent extends Component {
  render() {
    super.render(); // 새 컴포넌트에 받아온 컴포넌트를 넣어서 데이터를 변경해서 사용하겠다.
  }
}
```

```js
// Composition
Component;

class NewComponent extends React.Component {
  render() {
    return <div>
      <Component/> // 받아온 컴포넌트를 사용하겠다.
    </div>
  }
}
```
- Pass Unrelated Props Through to the Wrapped Component
   - 부모가 직접 넣어준 Props를 Unrelated Props라고 부른다.
   - Wrapped Component 즉 자식 요소는 부모가 직접 넣어준 Props를 Pass만 해야한다.

###### 주의할점
- render 영역에서 사용하면 안된다.
- static 메소드가 있다면 항상 copy 해줘야 한다. (공식 문서에 static 메소드를 카피하는 방법 및 자동으로 복사 해주는 라이브러리를 지원해준다.)

----

#### Redirect
```js
import { Redirect } from "react-router-dom";
```

`react-router-dom` 에서 보통 `import` 해올때 대문자는 컴포넌트 소문자는 함수이다.

페이지가 `render` 될때 동작한다.

```js
//About.jsx
import React from "react";
import queryString from "query-string";
import { Redirect } from "react-router-dom";

export default function About(props) {
  const { name } = queryString.parse(props.location.search);

  if(name === undefined) {
    return <h1>About : no name</h1>
  }
  if(name === "redirect") {
    return <Redirect to="/"/>
  }
  return <h1>About : {name}</h1>
}
```

위 소스 코드에서 주소창에
`?name=Kang` 을 입력하면 `About : Kang` 페이지 아니면 `About : no name` 페이지를 보여준다. `?name=redirect` 입력시 Home으로 이동하는데 이때 특이한 점은 로딩 없이 컴포넌트를 불러온다는 점이다.

### Week4

### React Component Styling

#### Style Loaders
`Webpack` 이 파일 확장자에 맞는 `loader` 에게 위임한다.
`.js .jsx`는 `babel-loader`가 처리한 후 최종 배포용 파일에 포함 시킨다.
`.css` 는 `style-loader, css-loader`가 최종 배포용 파일에 포함 시킨다.

```js
import './App.css'; // css 
import styles from './App.module.css'; // module css
import './App.scss'; // scss
import styles from './App.module.sass'; // module sass
```
----

#### CSS, SASS

##### CSS
```js
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
</div>
```

```css
.App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
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
  color: #09d3ac;
}
```

위 방법을 아래로 변환할 수 있다.
```js
<div className="App">
  <header className="header">
    <img src={logo} className="logo" alt="logo" />
    <p>
      Edit <code>src/App.js</code> and save to reload.
    </p>
    <a
      className="link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn React
    </a>
  </header>
</div>
```

```css
.App {
  text-align: center;
}

.App .logo {
  height: 40vmin;
}

.App .header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App .link {
  color: #09d3ac;
}
```

CSS는 팀내 규칙을 정해 작성하는 방법을 따라야 한다.
규칙을 문서화해서 이름의 규칙을 제공해주는게 `BEM`이다.

##### SCSS
항상 컴파일해서 css 파일로 트랜스파일링 해줘야한다.
css를 함수 및 변수를 설정해서 사용할 수 있게 도와준다.

```
npm install node-sass // sass, scss 파일을 css 파일로 변화해준다.
```

```js
<div className="App">
  <header className="header">
    <img src={logo} className="logo" alt="logo" />
    <p>
      Edit <code>src/App.js</code> and save to reload.
    </p>
    <a
      className="link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn React
    </a>
  </header>
</div>
```

```css
.App {
  text-align: center;

  .logo {
    height: 40vmin;
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
    color: #09d3ac;
  }
}
```

#### CSS module, SCSS module
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

###### 버튼으로 간단한 예시
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

#### classNames
###### 버튼을 이용한 예제 심화
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

.loading {
  border: 2px solid grey;
  color: grey;
}

//Button.jsx
import React from "react";
import styles from "./Button.module.css";

export default class Button extends React.Component() { // Hooks 전이라 class로 변경
  state = {
    loading: false,
  };
  render() {
    return (
      <button className={this.state.loading 
      ? `${styles.button} ${styles.loading}` 
      : styles.button} 
      onClick={this.click}>
      {this.state.loading ? '버튼 로딩중' : '버튼'}
    </button>
    );
  }

  click = () => {
    // 로딩 상태 시작
    this.setState({loading: true});
    setTimeout(() => {
      // 로딩 상태 끝
      this.setState({loading: false});
    }, 1000);
  }
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

위의 복잡한 과정을 간소화 시킬 수 있다.

```
npm install classnames
```

##### classnames
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

.loading {
  border: 2px solid grey;
  color: grey;
}

//Button.jsx
import React from "react";
import styles from "./Button.module.css";
import classNames from "classnames";

export default class Button extends React.Component() { // Hooks 전이라 class로 변경
  state = {
    loading: false,
  };

  startLoading = () => {
    console.log('start');
    this.setState({loading : true});
    setTimout(() => {
      this.setState({loading : false});
    }, 1000);
  }

  render() {
    const { loading } = this.state;
    return (
      <button
      className = {
        loading ? classNames(styles.button, styles.loading) : styles.button
      }
      {...this.props}
      onclick={this.startLoading}
      />
    );
  }
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

##### classnames/bind
```js
//Button.jsx
import React from "react";
import styles from "./Button.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default class Button extends React.Component {
  state = {
    loading : false,
  };
  render() {
    const { loading } = this.state;
    return (
      <button
        className={cx("button", { loading })}
        onClick={this.click}
      >
      {this.state.loading ? "버튼 로딩 중" : "버튼"}
      </button>
    )
  }

  click = () => {
    this.setState({loading : true});
    setTimeout(() => {
      this.setTtate({loading: false});
    }, 1000)
  }
}
```

----

#### Styled Components
```
npx create-react-app styled-components-example

cd styled-components-example

npm i styled-components
```

스타일을 입혀서 컴포넌트를 제공해준다.

##### styled.<태그> `스타일`
```js
// components/Button.jsx
import React from 'react';
import styled from "styled-components";

// 함수 밖에서 사용 styled('button') 템플릿 스트링을 사용한다.
const StyledButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
`;

export default function Button() {
  return <StyledButton>버튼</StyledButton>
}
```

##### ${props => css`스타일`}
```js
import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;

  ${(props) =>
    if(props.primary) {
      return css`
    background: palevioletred;
    color: white;
  `};
`;

export default function Button() {
  return <StyledButton primary>버튼</StyledButton>
} // 버튼에 props를 달고 위의 스타일을 정의해주면 props 상태에서 위 스타일이 적용된다.
```

#### as="태그"
재미는 있는데 쓰지는 않는다.
```js
export default function Button() {
  return <StyledButton as="a" href="/">버튼</StyledButton>
} // as태그를 통해 버튼에 a태그를 넣어줄 수 있다.
```

#### ${props => props.color ||''}
```js
import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: ${(props) => props.padding || 0.25}em 1em;

  ${(props) =>
    if(props.primary) {
      return css`
    background: palevioletred;
    color: white;
  `};
`;

export default function Button() {
  return <StyledButton padding={5}>버튼</StyledButton>
} // css 내부 문자열을 표현식을 통해서 지정할 수 있다.
```

```js
// 다양한 css 선택자 지원
const StyledButton = styled.button`
  :hover {
    border: 1px solid black;
  }

  ::before {
    content: '@';
  }

  &:hover {
    border : 1px solid black;
  }
`;
```

#### createGlobalStyle
```js
import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
  button {
    color: black;
  }
`;

function App() {
  return (
    <GlobalStyle /> // 컴포넌트라서 render만 하면 된다.
    // GlobalStyle이라서 전역으로 적용시킬 수 있다.
  )
}
```

#### styled.태그.attr(props => ({속성들}))
```js
import styled from "styled-components";
const StyledA = styled.a.attrs(props => ({
  href: props.href,
  target: '_BLANK',
  rel: 'noopener noreferrer',
}))``;

function App() {
  return (
    <StyledA herf="https://naver.com">네이버 가기</StyledA>
  )
}
// 오브젝트를 리턴 받아 어트리뷰트를 기본값으로 설정해준다.
// 엘리먼트에 어트리뷰트가 디폴트로 박혀 들어가는 경우가 많아서 자주 사용할 수 있다.
```

#### keyframes
```js
import { keyframes } from 'styled-component';
```
를 통해서 keyframes 애니메이션도 적용시킬 수 있다.

---

### React Shadow
Shadow DOM : DOM을 다루는 다큐먼트 객체가 하나만 있다.
스타일 객체는 단일 다큐먼트에서 표현이된다.
리액트의 경우 스타일을 적용시키면 단인 다큐먼트에 적용되서 다 들어나 버리게 된다.

캡슐화 : Shadow DOM 안에서 설정한건 밖으로 영향을 미칠 수 없고 밖에서 설정된건 안으로 영향을 미칠 수 없다.

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

----

### Ant Design
토이프로젝트를 진행할때 많이 쓰이는 중국에서 제작한 라이브러리이다.
컴포넌트를 제공해주며 기본적으로 모든 컴포넌트가 디자인 되어있다.
사이트의 문서를 통해 사용법을 확인할 수 있다.

```
npm install antd
```

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

----

### 1차 과제 진행
`singin.jsx` PPT 보고 완성해오기 -> 여기서 부터 진행