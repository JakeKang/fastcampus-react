# Redux Advanced

## Async Action with Redux

### 비동기 작업을 어디서 하느냐 ? 가 젤 중요

- 액션을 분리합니다.

  - Start

  - Success

  - Fail

  - ... 등등

- dispatch 를 할때 해줍니다.

  - 당연히 리듀서는 동기적인 것 => Pure

  - dispatch 도 동기적인 것

### 비동기 처리를 위한 액션 추가 (예시)

```js
// 액션 정의
export const START_RECEIVE_BOOKS = "START_RECEIVE_BOOKS";
export const END_RECEIVE_BOOKS = "END_RECEIVE_BOOKS";
export const ERROR_RECEIVE_BOOKS = "ERROR_RECEIVE_BOOKS";

// 액션 생성자 함수
export function startReceiveBooks() {
  return {
    type: START_RECEIVE_BOOKS,
  };
}

export function endReceiveBooks(books) {
  return {
    type: END_RECEIVE_BOOKS,
    books,
  };
}

export function errorReceiveBooks() {
  return {
    type: ERROR_RECEIVE_BOOKS,
  };
}
```

### mapDispatchToProps => dispatch

```js
const mapDispatchToProps = (dispatch) => ({
  requestBooks: async (token) => {
    dispatch(startLoading());
    dispatch(clearError());
    try {
      const res = await axios.get("https://api.marktube.tv/v1/book", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setBooks(res.data));
      dispatch(endLoading());
    } catch (error) {
      console.log(error);
      dispatch(setError(error));
      dispatch(endLoading());
    }
  },
});
```

```js
// books.jsx
import React, { useEffect } from "react";

const Book = (props) => <div>title : {props.title}</div>;

const Books = ({ token, loading, error, books, requestBooks }) => {
  useEffect(() => {
    requestBooks(token); // 컨테이너로 로직을 옮겼음.
  }, [token, requestBooks]);
  return (
    <div>
      {loading && <p>loading...</p>}
      {error !== null && <p>{error.message}</p>}
      {books.map((book) => (
        <Book title={book.title} key={book.bookId} />
      ))}
    </div>
  );
};

export default Books;
```

## 리덕스 미들웨어

### 리덕스 미들웨어?
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

## redux-promise-middleware

### import promise from 'redux-promise-middleware';

```js
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware"; // import

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk, promise)) // 미들웨어 설정
);

export default store;
```

### payload 가 Promise

```js
// actions/index.js
export const setBooksPromise = (token) => ({
  type: BOOKS,
  payload: axios.get("https://api.marktube.tv/v1/book", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
});
```

### 액션의 type 에 접미사를 붙인 액션을 자동 생성하고 자동으로 dispatch 시킴

```js
// actions/index.js
export const BOOKS = "BOOKS";
export const BOOKS_PENDING = "BOOKS_PENDING";
export const BOOKS_FULFILLED = "BOOKS_FULFILLED";
export const BOOKS_REJECTED = "BOOKS_REJECTED";

// reducers/loading.js
export default function loading(state = initialState, action) {
  switch (action.type) {
    case BOOKS_PENDING:
      return true;

    case BOOKS_FULFILLED:
      return false;

    case BOOKS_REJECTED:
      return false;

    default:
      return state;
  }
}
```

### payload 로 들어오는 데이터를 활용하여 표현

```js
{
  type: 'BOOKS_PENDING'
}

{
  type: 'BOOKS_FULFILLED'
  payload: {
    ...
  }
}

{
  type: 'BOOKS_REJECTED'
  error: true,
  payload: {
    ...
  }
}
```

```js
// reducers/books.js

const books = (state = initialState, action) => {
  switch (action.type) {
    case BOOKS_FULFILLED: {
      return [...action.payload.data]
    }

  ...
}
```

## react-router 와 redux 함께 쓰기

### reducer 에 router 라는 state 를 combine

```js
// src/reducers/index.js

import { combineReducers } from "redux";
import books from "./books";
import loading from "./loading";
import error from "./error";
import { connectRouter } from "connected-react-router";

const reducers = (history) =>
  combineReducers({
    books,
    loading,
    error,
    router: connectRouter(history),
  });

export default reducers;
```

### store 에 routerMiddleware 를 추가

```js
// src/store.js

import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

export const history = createBrowserHistory();

const store = createStore(
  reducers(history),
  composeWithDevTools(
    applyMiddleware(routerMiddleware(history), thunk, promise)
  )
);

export default store;
```

### Router => ConnectedRouter

```js
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import withAuth from "./hocs/withAuth";
import { history } from "./store";
import { ConnectedRouter } from "connected-react-router";

function App() {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/" component={withAuth(Home)} />
        <Route component={NotFound} />
      </Switch>
    </ConnectedRouter>
  );
}

export default App;
```

### history.push() 대신 dispatch(push())

```js
const SigninForm = ({ dispatch }) => {
  async function click() {
    const email = emailInput.current.state.value;
    const password = passwordInput.current.state.value;

    try {
      setIsLoading(true);
      const res = await axios.post("https://api.marktube.tv/v1/me", {
        email,
        password
      });
      console.log(res.data);
      setIsLoading(false);
      localStorage.setItem("token", res.data.token);
      // history.push("/");
      dispatch(push("/"));
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      // error feedback
      message.error(error.response.data.error);
    }
  }
  ...
}

export default connect()(SigninForm);
```

## redux-saga

### 리덕스 사가

- 미들웨어 입니다.
- 제너레이터를 만들어 내는 제네레이터 생성 함수를 이용합니다.​
- 리덕스 사가 미들웨어를 설정하고,
- 내가 만든 사가 함수를 실행한 뒤,
- 디스패치하면 된다.

```js
// src/sagas.js

import {
  BOOKS_FETCH_REQUESTED,
  BOOKS_FETCH_SUCCEEDED,
  BOOKS_FETCH_FAILED,
} from "./actions";
import { call, put, takeEvery } from "redux-saga/effects";
import * as axios from "axios";

async function getBooks(token) {
  const response = await axios.get("https://api.marktube.tv/v1/book", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

// BOOKS_FETCH_REQUESTED 액션으로 시작
function* fetchBooks(action) {
  try {
    const books = yield call(getBooks, action.payload.token);
    yield put({ type: BOOKS_FETCH_SUCCEEDED, books });
  } catch (e) {
    yield put({ type: BOOKS_FETCH_FAILED });
  }
}

// BOOKS_FETCH_REQUESTED 액션을 실행할 수 있도록 등록하는 함수
function* mySaga() {
  yield takeEvery(BOOKS_FETCH_REQUESTED, fetchBooks);
}

export default mySaga;
```

```js
// src/actions/index.js

import * as axios from "axios";

export const BOOKS_FETCH_REQUESTED = "BOOKS_FETCH_REQUESTED";
export const BOOKS_FETCH_SUCCEEDED = "BOOKS_FETCH_SUCCEEDED";
export const BOOKS_FETCH_FAILED = "BOOKS_FETCH_FAILED";

export const setBooksSaga = (token) => ({
  type: BOOKS_FETCH_REQUESTED,
  payload: { token },
});
```

```js
// src/store.js

import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { createSagaMiddleware } from "redux-saga";
import mySaga from "./sagas";

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers(history),
  composeWithDevTools(
    applyMiddleware(routerMiddleware(history), thunk, promise, sagaMiddleware)
  )
);

sagaMiddleware.run(mySaga);

export default store;
```

```js
// src/containers/BooksContainer.js

const mapDispatchToProps = dispatch => ({
  requestBooks: async token => {...},
  requestBooksThunk: token => {...},
  requestBooksPromise: token => {...},
  requestBooksSaga: token => {
    dispatch(setBooksSaga(token));
  }
});

```

```js
// src/reducers/loading.js

import {
  ...
  BOOKS_FETCH_REQUESTED,
  BOOKS_FETCH_SUCCEEDED,
  BOOKS_FETCH_FAILED
} from "../actions";

const initialState = false;

const loading = (state = initialState, action) => {
  console.log("loading reducer", action);
  switch (action.type) {
    case BOOKS_FETCH_REQUESTED:
      return true;
    case BOOKS_FETCH_SUCCEEDED:
    case BOOKS_FETCH_FAILED:
      return false;
    default:
      return state;
  }
};

export default loading;

```

```js
// src/reducers/books.js

export default function books(state = initialState, action) {
  switch (action.type) {
    case BOOKS_FETCH_SUCCEEDED:
      return [...action.books]
    }
    ...
  }
}

```

```js
// src/sagas.js

/// BOOKS_FETCH_REQUESTED 액션을 실행할 수 있도록 등록하는 함수
function* mySaga() {
  yield takeEvery(BOOKS_FETCH_REQUESTED, fetchBooks);
  // yield takeLatest(BOOKS_FETCH_REQUESTED, fetchBooks);
}

export default mySaga;
```
