# CRA(Create React App)로 프로젝트 구성하기

---

[Create React App · Set up a modern web app by running one command.](https://facebook.github.io/create-react-app/)

[Create-react-app V2 릴리즈! 무슨 변경 사항이 있을까?](https://velog.io/@velopert/create-react-app-v2)

[Create-React-App에서 Eject사용안하기(customize-cra, react-app-rewired)](https://medium.com/@jsh901220/create-react-app%EC%97%90%EC%84%9C-eject%EC%82%AC%EC%9A%A9%EC%95%88%ED%95%98%EA%B8%B0-customize-cra-react-app-rewired-10a83522ace0)

----

```bash
npx create-react-app tic-tac-toe
```

## npx

npm 5.2.0 이상부터함께설치된커맨드라인명령어

## npx가 필요한 이유

- 프로젝트의로컬에설치된패키지의실행커맨드를사용하려면,
  - package.json의 npm scripts에 명령어를 추가하여 사용해야 했다.
  - `npx`로 바로 실행가능
- 전역으로 실행하고 싶은 패키지가 있을 경우,
  - `npm i -g`를 이용하여, 전역에 꼭 설치해서 사용해야 가능했다.
  - `npx`로 최신버전의 패키지를 받아 바로 실행가능

----

### Package.json

```json
{
  "name": "react-router-example",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "query-string": "^6.8.1",
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "react-router-dom": "^5.0.1",
    "react-scripts": "3.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

- 리액트핵심모듈
  - "react": "^16.8.6""
  - react-dom": "^16.8.6"
- cra 를사용하는데필요한모듈
  - "react-scripts": "3.0.1"

----

## Scripts

### npm start

- react-scripts start
- 개발용 서버를 띄울 때 사용
- 소스 코드가 수정 되었을 때, 다시 컴파일 하고 웹페이지를 새로 고

### npm run build

- react-scripts build
- 최적화된 프로덕션 빌드로 작성.
  - Project 폴더 아래 Build 폴더가 만들어지고 그 안에 Production 배포를 위한 파일들이 생성됨

### Serve

단일 페이지, Application, Static file을 제공할때 사용

정적 배포와 동일하게 동작하므로 정적 프로젝트 개발할 때 적합.

```bash
npm install -g serve
serve -s build
```

- server 라는 패키지를 전역으로 설치
- serve 명령어를 -s 옵션으로 build폴더를 지정하여 실행
  - -s 옵션은 어떤 라우팅으로 요청해도 index.html을 응답
    - -s : single (single page application)

### npm test

- react-scripts test
- Jest를 통해 test code를 실행

### npm run eject

- react-scripts eject
- CRA로 만든 프로젝트에서 CRA를 제거함
- 한번 Eject 하면 돌이킬 수 없음
- 보통 CRA 내에서 해결 안되는 설정을 추가할 때 사용

```json
{
  "name": "react-example",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@babel/core": "7.4.3",
    "@svgr/webpack": "4.1.0",
    "@typescript-eslint/eslint-plugin": "1.6.0",
    "@typescript-eslint/parser": "1.6.0",
    "babel-eslint": "10.0.1",
    "babel-jest": "^24.8.0",
    "babel-loader": "8.0.5",
    "babel-plugin-named-asset-import": "^0.3.2",
    "babel-preset-react-app": "^9.0.0",
    "camelcase": "^5.2.0",
    "case-sensitive-paths-webpack-plugin": "2.2.0",
    "css-loader": "2.1.1",
    "dotenv": "6.2.0",
    "dotenv-expand": "4.2.0",
    "eslint": "^5.16.0",
    "eslint-config-react-app": "^4.0.1",
    "eslint-loader": "2.1.2",
    "eslint-plugin-flowtype": "2.50.1",
    "eslint-plugin-import": "2.16.0",
    "eslint-plugin-jsx-a11y": "6.2.1",
    "eslint-plugin-react": "7.12.4",
    "eslint-plugin-react-hooks": "^1.5.0",
    "file-loader": "3.0.1",
    "fs-extra": "7.0.1",
    "html-webpack-plugin": "4.0.0-beta.5",
    "identity-obj-proxy": "3.0.0",
    "is-wsl": "^1.1.0",
    "jest": "24.7.1",
    "jest-environment-jsdom-fourteen": "0.1.0",
    "jest-resolve": "24.7.1",
    "jest-watch-typeahead": "0.3.0",
    "mini-css-extract-plugin": "0.5.0",
    "optimize-css-assets-webpack-plugin": "5.0.1",
    "pnp-webpack-plugin": "1.2.1",
    "postcss-flexbugs-fixes": "4.1.0",
    "postcss-loader": "3.0.0",
    "postcss-normalize": "7.0.1",
    "postcss-preset-env": "6.6.0",
    "postcss-safe-parser": "4.0.1",
    "react": "^16.8.6",
    "react-app-polyfill": "^1.0.1",
    "react-dev-utils": "^9.0.1",
    "react-dom": "^16.8.6",
    "resolve": "1.10.0",
    "sass-loader": "7.1.0",
    "semver": "6.0.0",
    "style-loader": "0.23.1",
    "terser-webpack-plugin": "1.2.3",
    "ts-pnp": "1.1.2",
    "url-loader": "1.1.2",
    "webpack": "4.29.6",
    "webpack-dev-server": "3.2.1",
    "webpack-manifest-plugin": "2.0.4",
    "workbox-webpack-plugin": "4.2.0"
  },
  "scripts": {
    "start": "node scripts/start.js",
    "build": "node scripts/build.js",
    "test": "node scripts/test.js"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "jest": {
    "collectCoverageFrom": ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
    "setupFiles": ["react-app-polyfill/jsdom"],
    "setupFilesAfterEnv": [],
    "testMatch": [
      "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
      "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
    ],
    "testEnvironment": "jest-environment-jsdom-fourteen",
    "transform": {
      "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
      "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
      "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
    },
    "transformIgnorePatterns": [
      "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
      "^.+\\.module\\.(css|sass|scss)$"
    ],
    "modulePaths": [],
    "moduleNameMapper": {
      "^react-native$": "react-native-web",
      "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
    },
    "moduleFileExtensions": [
      "web.js",
      "js",
      "web.ts",
      "ts",
      "web.tsx",
      "tsx",
      "json",
      "web.jsx",
      "jsx",
      "node"
    ],
    "watchPlugins": [
      "jest-watch-typeahead/filename",
      "jest-watch-typeahead/testname"
    ]
  },
  "babel": {
    "presets": ["react-app"]
  }
}
```

- react-scripts 는 사라짐
- 드러내지 않고 사용되던 각종 패키지가 package.json에 나타남
- Jest, Babel, ESLint 설정등이 추가됨
- 각종 설정 파일이 config폴더에 생성됨

# ESLint

---

자바스크립트 문법검사를 해주는데, 그 문법 검사에 대한 조건에 다양한 옵션을 정해줄 수 있다.

문법적으로 잘못된건 아니지만 코드 스타일에 제약을 가하고 싶을때 사용한다.
여러 스타일에 대한 룰이 적용된 유틸이며 CRA에 포함되어있다.

```
#package.josn
"eslintConfig" : {
    "extends" : "react-app", 을 선언하면 eslintConfig를 상속받아서 사용가능하다.
}
```

# Prettier

---

코드를 자동으로 정리를 해주는데 다른 도구들과의 주요 차이점은 코드 정리 규칙을 세부적으로 설정 할 수 있다.

코드 포맷터의 하나이다.
코드를 작성하고 저장만해도 설정된 룰에 따라 코드를 변경해준다.

.prettierrc
```
{
    "singleQuote": true,
    "trailingComma": "all"
}
```

파일을 설정하고 프로젝트 root에 넣어주면 설정대로 적용된다.
ESLint와 설정이 겹칠 수 있으므로 eslint-config-prettier 설정을 적용해준다.

```package.josn
"eslintConfig" : {
    "extends" : [
        "react-app",
        "prettier"
    ]
}
```

**Prettier Option**

[Options · Prettier](https://prettier.io/docs/en/options.html)


# husk
----

git에 commit, push 등 여러활동을 할때 hooks을 걸어 다른 활동을 같이 실행한다.
husk를 먼저설치하고 git을 설치해야 한다.
```package.json
"husky": {
    "hooks": {
        "pre-commit": "npm test" // 커밋시 확인 
    }
}

```

# lint-staged
----

```package.json
"lint-staged": {
    "*": { // 파일확장자
        "git add" // 파일의 확장자를 git add 하겠다.
    }
}
```
# React Developer Tools
---- 
브라우저에서 리액트를 디버깅할 수 있는 툴이다.
브라우저별로 맞는 확장프로그램을 설치한다.


# React의 라우팅 이해하기

---
React의 라우팅을 이해한다는건 react-router-dom을 사용하는 것이다.
React는 화면에 컴포넌트를 그리는것만 신경을 쓴다.

SPA를 제외한 웹애플리케이션은 URL을 통해서 서버와 소통한다.
SPA가 등장하면서 모든 페이지가 별도로 존재하지 않게 되었다.
=> 리액트를 한번이라도 실행하는 순간 모든 페이지가 내 브라우저에 저장된다.

저장된 페이지를 URL을 통해 구분해주는것

SPA 라우팅 과정
1. 브라우저에서 최초에 '/' 경로로 요청을 하면,
2. React Web App 을 내려준다.
3. 내려받은 React App 에서 '/' 경로에 맞는 컴포넌트를 보여준다.
4. React App 에서 다른 페이지로 이동하는 동작을 수행하면,
5. 새로운 경로에 맞는 컴포넌트를 보여준다.

## react-router-dom

```bash
npm i react-router-dom
```

- CRA에 기본 내장된 패키지가 아님
- facebookm의 공식 패키지도 아님
- 하지만 가장 대표적인 라우팅 패키지
- -S : -save
  - 패키지(plugin)를 ./node_moduels 디렉터리에 설치하고 ./package.json 파일의 dependencies 항목에 플러그인 정보가 저장 됩니다.
- -D : --save-dev
  - 패키지(plugin)를 ./node_moduels 디렉터리에 설치하고 ./package.json 파일의 devDependencies 항목에 플러그인 정보가 저장 됩니다.

### package.json 파일 내의 dependencies와 devDependencies의 차이점

1. 프로젝트를 개발/테스트하려는 것이 아니라 활용만 하려는 목적이라면 개발의존성을 설치하는 것이 불필요하므로, devDependencies의 패키지를 제외하고 설치할 수도 있다.
2. dependencies, devDependencies는 해당 패키지가 다른 패키지에 의존할 경우 의존성에 대한 항목이다
3. dependencies와 devDependencies의 차이는 배포용 패키지(실제 상품에서 사용할 패키지)와 개발용 패키지(목, 테스트 패키지 등)의 차이다.
4. dependencies 는 이 패키지에 의존하는 다른 프로젝트에서 구동시키기 위한 의존성이다. 즉, 이 패키지를 활용할 때 필요한 의존성을 명시한다. `npm install --save` 명령을 통해 패키지를 설치하면 이 항목에 프로젝트 정보가 저장된다. devDependencies 에는 이 패키지를 테스트하거나 개발할 때 필요한 패키지들을 명시한다. `npm install --save-dev` 명령을 통해 패키지를 설치하면 이 항목에 프로젝트 정보가 저장된다.
5. npm install할 때 dependencies는 항상 설치되고 devDepenencies는 `--production` 옵션을 붙이면 빠진다. `npm install “$package”` 명령어로 설치할 때는 `--dev` 옵션을 붙여야지만 설치된다.

**결론 : 개발 시 필요한 (컴파일러 같은) 라이브러리들은 devDependencies에 적어주고, 진짜 우리 프로젝트에서 기술스펙으로 사용되어야할 라이브러리들은 dependencies에 적어준다.**

[react-router v3 / v3 비교](https://www.notion.so/3a6bb91b09594819b294c202d9832421)

```jsx
import React from "react";
import "./App.css";

// 특정 경로에서 보여줄 컴포넌트
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Login from "./pages/Login";

// url을 파싱해주는 모듈
import queryString from "query-string";

// react-router-dom에서 제공하는 컴포넌트
import {
  BrowserRouter, // 라우트를 하기위해 최상위에 감싸주는 컴포넌트
  Route, // 라우트 컴포넌트 - 경로에 맞는 컴포넌트를 보여준다.
  Switch, // 순서대로 라우트를 보여주는 컴포넌트
  Link, // 라우팅을 위한 링크 컴포넌트 - 현재 경로를 바꿔준다.
  NavLink, // Navibar 특화 링크 컴포넌트
  Redirect, // 리다이렉트 컴포넌트
} from "react-router-dom";
```

### BrowserRouter

HTML5 히스토리 API (pushState, replaceState 및 popstate 이벤트)를 사용하여 UI를 URL과 동기화 된 상태로 유지하는<Router>.

```jsx
import { BrowserRouter } from "react-router-dom";

<BrowserRouter
  basename={optionalString}
  forceRefresh={optionalBool}
  getUserConfirmation={optionalFunc}
  keyLength={optionalNumber}
>
  <App />
</BrowserRouter>;
```

- **basename: string**
  - 모든 위치의 기본 URL
  - 앱이 서버의 하위 디렉토리에서 제공되는 경우 이를 하위 디렉토리로 설정해야한다.
  - 선행 슬래시(/)가 있어야하고 후행 슬래시(/)는 없어야한다.
- **getUserConfirmation: func**
  - 네비게이션을 확인하는데 사용하는 함수
  - 기본값 : `[window.confirm](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm)`.
- **forceRefresh: bool**
  - true : 라우터는 페이지 탐색시 전체 페이지를 새로 고침
  - HTML5 히스토리 API를 지원하지 않는 브라우저에서만 사용
- **keyLength: number**
  - `location.key`의 길이. 기본 값은 6
- **children: node**
  - 렌더링할 단일 엘리먼트 요소

### Route

현재 주소의 위치와 경로가일치할때 UI를 렌더링 하는 컴포넌트

- **component**

```jsx
<Route path="/user/:username" component={User} />;

// All route props (match, location and history) are available to User
function User(props) {
  return <h1>Hello {props.match.params.username}!</h1>;
}
```

- **render: func**

```jsx
// convenient inline rendering
<Route path="/home" render={() => <div>Home</div>}/>

// wrapping/composing
// You can spread routeProps to make them available to your rendered Component
const FadingRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={routeProps => (
    <FadeIn>
      <Component {...routeProps}/>
    </FadeIn>
  )}/>
)

<FadingRoute path="/cool" component={Something}/>
```

- **children: func**

```jsx
<ul>
  <ListItemLink to="/somewhere" />
  <ListItemLink to="/somewhere-else" />
</ul>;

const ListItemLink = ({ to, ...rest }) => (
  <Route
    path={to}
    children={({ match }) => (
      <li className={match ? "active" : ""}>
        <Link to={to} {...rest} />
      </li>
    )}
  />
);
```

- path: string | string[]
  - path-to-regexp@^1.7.0 이 이해하는 URL 경로 또는 경로 배열
- exact: bool
  - true 인 경우 경로가 location.pathname과 정확하게 일치하는 경우에만 동작
- strict: bool
  - true 인 경우 location.pathname과 일치하는 경우에 동작하지만 후행 슬러시가 있을 경우 이후 추가 URL 세그먼트가 있어도 일치함.
- sensitive: bool
  - true 인 경우 대소문자 구분

### Switch

로케이션과 일치하는 첫번째 하위 <Route> 또는 <Redirect> 렌더링
- 여러 `Route` 컴포넌트 중 순서대로 먼저 맞는 하나를 렌더링한다.
- 순서를 정해 `exact` 를 뺄 수 있는 로직을 만들 수 있다.
- 가장 마지막에 어디 `path` 에도 맞지 않으면 보여지는 컴포넌트를 설정해서, "Not Found" 페이지를 만들 수 있다.

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

### ErrorBoundaries
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

## JSX 링크로 라우팅 이동하기

### a태그

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

`HTML`을 로딩하면서 포함된 해당 `JS` 파일 등을 불러오게된다. 
그 과정에서 브라우저에 로딩이 발생한다.
`a태그`를 이용한 링크 이동도 동일하게 브라우저 로딩을 발생시킨다.

`SPA`에서는 클라이언트가 이미 존재하는데 다시 서버에가서 요청하고 페이지를 받아오는 상태와 맞지 않다.
서버에 다녀오지 않고 새로 바뀌는 주소에 해당하는 컴포넌트로 바꿔서 보여줘야 하고 주소창을 서버에 요청하지 않은 상태로 바꿔야 한다.

그러한 트릭을 이용하기 위해서 `react-router-dom`의 컴포넌트를 사용할 수 있다.

### Link

어플리케이션 내의 액세스 가능한 탐색 기능을 제공

```js
<Link to="/">Home</Link>
```
- 브라우저의 주소를 바꾸고
- 맞는 Route 로 화면을 변경한다.
- 로딩 및 네트워크 트래픽이 생기지 않는 상태에서 주소창과 컴포넌트를 교체한다.

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

### NavLink

렌더링 된 요소가 현자 URL과 일치 할 때 스타일 지정을 추가할 수 있는 <Link>
네비게이션 요소에 사용

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

### Redirect

새로운 위치로 이동할때 사용, 새로운 위치는 서버측 리다이렉션(HTTP 3xx)처럼 히스토리 스택의 현재위치보다 우선 적용 된다..
- TIP : `react-router-dom` 에서 보통 `import`시 대문자로 시작하면 컴포넌트 소문자는 함수이다.

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

## **라우트 파라미터 읽기**

라우트의 경로에 특정 값을 넣는 방법

1. `params` 를 사용하는 것
2. `query` 를 사용하는 것

라우트로 설정한 컴포넌트는, 3가지의 props 를 전달받는다

- `history` : 이 객체를 통해 `push`, `replace` 를 통해 다른 경로로 이동하거나 앞 뒤 페이지로 전환 할 수 있다.
- `location` : 이 객체는 현재 경로에 대한 정보를 지니고 있고 URL 쿼리 (`/about?foo=bar` 형식) 정보도 가지고 있다.
- `match` : 이 객체에는 어떤 라우트에 매칭이 되었는지에 대한 정보가 있고 params (`/about/:name` 형식) 정보를 가지고 있다.

## **withRouter**

라우트가 아닌 컴포넌트에서 라우터에서 사용하는 객체 - location, match, history 를 사용하려면, withRouter 라는 HoC 를 사용해야한다.

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


-----

### Computed property names

객체 이니셜 라이저 구문에 `[]` 안에 표현식으로 계산된 속성 이름을 지원함.

접근자 구문의 대괄호 표기법을 연상 시킨다.

```jsx
// Computed property names (ES2015)
var i = 0;
var a = {
  ["foo" + ++i]: i,
  ["foo" + ++i]: i,
  ["foo" + ++i]: i,
};

console.log(a.foo1); // 1
console.log(a.foo2); // 2
console.log(a.foo3); // 3

var param = "size";
var config = {
  [param]: 12,
  ["mobile" + param.charAt(0).toUpperCase() + param.slice(1)]: 4,
};

console.log(config); // {size: 12, mobileSize: 4}
```

# 이벤트 전파를 중단하는 4가지 방법

---

1. `event.preventDefault()`
2. `event.stopPropagation()`
3. `event.stopImmediatePropagation()`
4. `return false`

**이벤트 전파를 막는 event.stopPropagation()**

**같은 DOM에 걸린 다른 이벤트에도 전파를 막는 event.stopImmediatePropagation()**

**현재 이벤트의 기본 동작을 중단하는 event.preventDefault()**

**event.stopPropagation()과 event.preventDefault() 모두 수행한 것 같은 return FALSE**

----

###### react-router-dom 추가 간단한 설명 코드 [초급]

특정 경로에서 보여줄 컴포넌트를 준비한다.
'/'  =>  Home 컴포넌트
'/profile'  =>  Profile 컴포넌트
'/about'  =>  About 컴포넌트

pages 라는 폴더에 Home.jsx, Profile.jsx, About.jsx 파일이 생성되어있다.
```js
// Home.jsx
import React from "react";

export default function Home() {
    return <h1>Home</h1>
}
```
```js
// Profile.jsx
import React from "react";

export default function Profile() {
    return <h1>Profile</h1>
}
```

```js
// About.jsx
import React from "react";

export default function About() {
    return <h1>About</h1>
}
```

```js
//App.js
import React from "react";
import { BrowserRouter, Route } from "react-router-dom"; // BrowserRouter 컴포넌트
import "./App.css";
import Home from "./pages/Home";
import Profile from "./pages/Home";
import About from "./pages/Home";

function App() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Home} /> // 매칭 알고리즘 exact를 통해 path와 정확하게 맞을때만 그려준다.
            <Route path="/Profile" component={Profile} />
            <Route path="/About" component={About} />
        </BrowserRouter>
    );
}

export default App;
```

1. Route 컴포넌트에 경로(path) 와 컴포넌트 (component) 를 설정하여 나열해준다.
2. BrowserRouter 로 Route를 감싸준다.
3. 브라우저에서 요청한 경로에 Route 의 path 가 들어있으면 해당 컴포넌트를 보여준다.

----

#### Dynamic 라우팅

##### params
params : 가변 개수의 인수를 사용하는 메서드 매개 변수를 지정할 수 있다.
매개 변수 배열은 1차원 배열이어야 한다.

ID 값이 확실하게 들어와야한다.

```js
//App.js
import React from "react";
import { BrowserRouter, Route } from "react-router-dom"; // BrowserRouter 컴포넌트
import "./App.css";
import Home from "./pages/Home";
import Profile from "./pages/Home";
import About from "./pages/Home";

function App() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Home} />
            <Route path="/Profile" component={Profile} />
            <Route path="/Profile:id" component={Profile} />
            <Route path="/About" component={About} />
        </BrowserRouter>
    );
}

export default App;
```

```js
// Profile.jsx
import React from "react";

export default function Profile(props) {
    const id = Number(props.match.params.id)
    if (isNaN(id)) {
        return <h1>Profile List</h1>;
    }
    return <h1>Profile : {id}</h1>
    // /Profile/133 => Profile : 133
}
```

##### /about?name=mark 쿼리 형식 (get 파라미터)
get 파라미터는 있거나 없거나 둘다 동작해야한다.
그러므로 Route 에서는 설정하지 않는다.

```js
// About.jsx
import React from "react";
import queryString from "query-string"; // queryString 디폴트 함수를 제공하는 라이브러리

export default function About(props) {
    /*
    const params = new URLSearchParams(props.location.search); // 브라우저 호환성이 좋지 않다. (익스플로러)
    params.get("name"); // 없으면 null 있으면 name의 값
    */

    const { name } = queryString.parse(props.location.search);
    if(name === undefined) {
        return <h1>About : no name</h1>
    }
    return <h1>About : {name}</h1>
}
```

props location search (일반유틸 ?name=Kang 을 파싱하기 위한 도구)

1. new URLSearchParams(props.location.search);
2. const query = queryString.parse(props.location.search);
```
npm i query-string
```

###### 2020.07.28 추가 사항
## HOC (Higher Order Component)
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