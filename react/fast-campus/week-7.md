# Javascript Unit Test

Test driven development

js 테스트 프레임워크

- runner
- jest
- mocha (nodejs 에서 제일 유명)
- jasmine

jest

- expect
-

unit test pattern

- given when then pattern
  - given 기본적으로 주어진 것
  - when
  - then
- aaa pattern

리액트 컴포넌트 테스트

# React Testing

## JavaScript Unit Test

### Unit Test

- 사람을 믿으시겠습니까 ? 테스트 코드를 믿으시겠습니까 ?

  - 실제로는 사람이 아니라, 사람의 감 입니다.

  - 코드는 거짓말을 하지 않습니다.

- 통합테스트에 비해 빠르고 쉽습니다.

- 통합테스트를 진행하기 전에 문제를 찾아낼 수 있습니다.

  - 그렇다고, 통합테스트가 성공하리란 보장은 없습니다.

- 테스트 코드가 살아있는(동작을 설명하는) 명세가 됩니다.

  - 테스트를 읽고 어떻게 동작하는지도 예측 가능합니다.

- 소프트웨어 장인이 되려면 TDD 해야죠..

  - 선 코딩 후, (몰아서) 단위테스트가 아니라

### facebook/jest

- 리액트의 영향이 크겠지만 가장 핫한 테스트 도구

- 👩🏻‍💻 Easy Setup

- 🏃🏽 Instant Feedback

  - ​고친 파일만 빠르게 테스트 다시 해주는 기능 등

- 📸 Snapshot Testing

  ​- 컴포넌트 테스트에 중요한 역할을 하는 스냅샷

```js
mkdir jest-example

cd jest-example

npm init -y

npm i jest -D
```

### package.json

```json
{
  "name": "jest-example",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "jest"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "jest": "^24.9.0"
  }
}
```

### example.test.js

```js
test("adds 1 + 2 to equal 3", () => {
  expect(1 + 2).toBe(3);
});
```

### it (= test), describe, expect

```js
describe("expect test", () => {
  it("37 to equal 37", () => {
    const received = 37;
    const expected = 37;
    expect(received).toBe(expected);
  });

  it("{age: 37} to equal {age: 37}", () => {
    const received = {
      age: 37,
    };
    const expected = {
      age: 37,
    };
    expect(received).toBe(expected);
  });

  it("{age: 37} to equal {age: 37}", () => {
    const received = {
      age: 37,
    };
    const expected = {
      age: 37,
    };
    expect(received).toEqual(expected);
  });
});
```

### .to~

```js
describe(".to~ test", () => {
  it(".toBe", () => {
    expect(37).toBe(37);
  });
  it(".toHaveLength", () => {
    expect("hello").toHaveLength(5);
  });
  it(".toHaveProperty", () => {
    expect({ name: "Mark" }).toHaveProperty("name");
    expect({ name: "Mark" }).toHaveProperty("name", "Mark");
  });
  it(".toBeDefined", () => {
    expect({ name: "Mark" }.name).toBeDefined();
  });
  it(".toBeFalsy", () => {
    expect(false).toBeFalsy();
    expect(0).toBeFalsy();
    expect("").toBeFalsy();
    expect(null).toBeFalsy();
    expect(undefined).toBeFalsy();
    expect(NaN).toBeFalsy();
  });
  it(".toBeGreaterThan", () => {
    expect(10).toBeGreaterThan(9);
  });
});
```

```js
describe(".to~ test", () => {
  it(".toBeGreaterThanOrEqual", () => {
    expect(10).toBeGreaterThanOrEqual(10);
  });
  it(".toBeInstanceOf", () => {
    class Foo {}
    expect(new Foo()).toBeInstanceOf(Foo);
  });
  it(".toBeNull", () => {
    expect(null).toBeNull();
  });
  it(".toBeTruthy", () => {
    expect(true).toBeTruthy();
    expect(1).toBeTruthy();
    expect("hello").toBeTruthy();
    expect({}).toBeTruthy();
  });
  it(".toBeUndefined", () => {
    expect({ name: "Mark" }.age).toBeUndefined();
  });
  it(".toBeNaN", () => {
    expect(NaN).toBeNaN();
  });
});
```

### .not.to~

```js
describe(".not.to~ test", () => {
  it(".not.toBe", () => {
    expect(37).not.toBe(36);
  });

  it(".not.toBeFalsy", () => {
    expect(true).not.toBeFalsy();
    expect(1).not.toBeFalsy();
    expect("hello").not.toBeFalsy();
    expect({}).not.toBeFalsy();
  });

  it(".not.toBeGreaterThan", () => {
    expect(10).not.toBeGreaterThan(10);
  });
});
```

### async test with done callback

```js
describe("use async test", () => {
  it("setTimeout without done", () => {
    setTimeout(() => {
      expect(37).toBe(36);
    }, 1000);
  });

  it("setTimeout with done", (done) => {
    setTimeout(() => {
      expect(37).toBe(36);
      done();
    }, 1000);
  });
});
```

### async test with promise

```js
describe("use async test", () => {
  it("promise then", () => {
    function p() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(37);
        }, 1000);
      });
    }
    return p().then((data) => expect(data).toBe(37));
  });

  it("promise catch", () => {
    function p() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error("error"));
        }, 1000);
      });
    }
    return p().catch((e) => expect(e).toBeInstanceOf(Error));
  });
});
```

```js
describe("use async test", () => {
  it("promise .resolves", () => {
    function p() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(37);
        }, 1000);
      });
    }
    return expect(p()).resolves.toBe(37);
  });

  it("promise .rejects", () => {
    function p() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error("error"));
        }, 1000);
      });
    }
    return expect(p()).rejects.toBeInstanceOf(Error);
  });
});
```

### async test with async-await

```js
describe("use async test", () => {
  it("async-await", async () => {
    function p() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(37);
        }, 1000);
      });
    }

    const data = await p();
    return expect(data).toBe(37);
  });
});
```

```js
describe("use async test", () => {
  it("async-await, catch", async () => {
    function p() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error("error"));
        }, 1000);
      });
    }

    try {
      await p();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
```

## React Component Test

```
npx create-react-app react-component-test

cd react-component-test

npm test
```

### App.test.js

```js
import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

### 어떤 파일을 테스트 해주나요?

- `__tests__` 폴더 안의 .js 파일

- .test.js 로 끝나는 파일

- .spec.js 로 끝나는 파일

### Button 컴포넌트

- 컴포넌트가 정상적으로 생성된다.
- "button" 이라고 쓰여있는 엘리먼트는 HTMLButtonElement 이다.
- 버튼을 클릭하면, p 태그 안에 "버튼이 방금 눌렸다." 라고 쓰여진다.
- 버튼을 클릭하기 전에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.
- 버튼을 클릭하고 5초 뒤에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.
- 버튼을 클릭하면, 5초 동안 버튼이 비활성화 된다.

### 컴포넌트가 정상적으로 생성된다.

```js
// src/components/Button.test.js

import React from "react";
import Button from "./Button";
import { render } from "@testing-library/react";

describe("Button 컴포넌트 (@testing-library/react)", () => {
  it("컴포넌트가 정상적으로 생성된다.", async () => {
    render(<Button />);
  });
});
```

```js
// src/components/Button.jsx

import React from "react";

const Button = () => <></>;

export default Button;
```

### "button" 이라고 쓰여있는 엘리먼트는 HTMLButtonElement 이다.

```js
describe("Button 컴포넌트", () => {
  // ...

  it(`"button" 이라고 쓰여있는 엘리먼트는 HTMLButtonElement 이다.`, () => {
    const { getByText } = render(<Button />);

    const buttonElement = getByText("button");

    expect(buttonElement).toBeInstanceOf(HTMLButtonElement);
  });
});
```

```js
// src/components/Button.jsx

import React from "react";

const Button = () => <button>button</button>;

export default Button;
```

### 버튼을 클릭하면, p 태그 안에 "버튼이 방금 눌렸다." 라고 쓰여진다.

```js
describe("Button 컴포넌트 (@testing-library/react)", () => {
  // ...

  it(`버튼을 클릭하면, p 태그 안에 "버튼이 방금 눌렸다." 라고 쓰여진다.`, () => {
    const { getByText } = render(<Button />);

    const button = getByText("button");
    fireEvent.click(button);

    const p = getByText("버튼이 방금 눌렸다.");
    expect(p).not.toBeNull();
    expect(p).toBeInstanceOf(HTMLParagraphElement);
  });
});
```

```js
// src/components/Button.jsx

import React from "react";

const Button = () => (
  <>
    <button>button</button>
    <p>버튼이 방금 눌렸다.</p>
  </>
);

export default Button;
```

### 버튼을 클릭하기 전에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.

```js
describe("Button 컴포넌트 (@testing-library/react)", () => {
  // ...

  it(`버튼을 클릭하기 전에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.`, () => {
    const { getByText } = render(<Button />);

    const p = getByText("버튼이 눌리지 않았다.");
    expect(p).not.toBeNull();
    expect(p).toBeInstanceOf(HTMLParagraphElement);
  });
});
```

```js
// src/components/Button.jsx

import React, { useState } from "react";

const Button = () => {
  const [message, setMessage] = useState("버튼이 눌리지 않았다.");

  function click() {
    setMessage("버튼이 방금 눌렸다.");
  }

  return (
    <>
      <button onClick={click}>button</button>
      <p>{message}</p>
    </>
  );
};

export default Button;
```

### 버튼을 클릭하고 5초 뒤에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.

```js
jest.useFakeTimers();

describe("Button 컴포넌트 (@testing-library/react)", () => {
  // ...

  it(`버튼을 클릭하고 5초 뒤에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.`, async () => {
    const { getByText } = render(<Button />);

    const button = getByText("button");
    fireEvent.click(button);
    jest.advanceTimersByTime(5000);

    const p = getByText("버튼이 눌리지 않았다.");
    expect(p).not.toBeNull();
    expect(p).toBeInstanceOf(HTMLParagraphElement);
  });
});
```

### 버튼을 클릭하면, 5초 동안 버튼이 비활성화 된다.

```js
jest.useFakeTimers();

describe("Button 컴포넌트 (@testing-library/react)", () => {
  // ...

  it(`버튼을 클릭하면, 5초 동안 버튼이 비활성화 된다.`, () => {
    const { getByText } = render(<Button />);

    const button = getByText("button");
    fireEvent.click(button);

    expect(button.disabled).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(button.disabled).toBeFalsy();
  });
});
```

```js
// src/components/Button.jsx

import React, { useState, useEffect, useRef } from "react";

const Button = () => {
  const [message, setMessage] = useState("버튼이 눌리지 않았다.");
  const timer = useRef(null);

  function click() {
    if (timer.current !== null) clearTimeout(timer);
    setMessage("버튼이 방금 눌렸다.");
    timer.current = setTimeout(() => {
      setMessage("버튼이 눌리지 않았다.");
    }, 5000);
  }

  useEffect(() => {
    return () => {
      if (timer.current !== null) clearTimeout(timer.current);
    };
  }, []);

  return (
    <>
      <button onClick={click} disabled={message === "버튼이 방금 눌렸다."}>
        button
      </button>
      <p>{message}</p>
    </>
  );
};

export default Button;
```

## enzyme 활용하기

```
npm i enzyme enzyme-adapter-react-16 -D
```

### 컴포넌트가 정상적으로 생성된다.

```js
// src/components/Button.enzyme.test.js

import React from "react";
import Enzyme, { shallow } from "enzyme";

import Adapter from "enzyme-adapter-react-16";
import Button from "./Button";

Enzyme.configure({ adapter: new Adapter() });

describe("Button 컴포넌트 (enzyme)", () => {
  it("컴포넌트가 정상적으로 생성된다.", () => {
    shallow(<Button />);
  });
});
```

### 버튼 엘리먼트에 써있는 텍스트는 "button" 이다.

```js
describe("Button 컴포넌트 (enzyme)", () => {
  // ...

  it(`버튼 엘리먼트에 써있는 텍스트는 "button" 이다.`, () => {
    const wrapper = shallow(<Button />);

    const button = wrapper.find("button");
    expect(button.text()).toBe("button");
  });
});
```

### 버튼을 클릭하면, p 태그 안에 "버튼이 방금 눌렸다." 라고 쓰여진다.

```js
describe("Button 컴포넌트 (enzyme)", () => {
  // ...

  it(`버튼을 클릭하면, p 태그 안에 "버튼이 방금 눌렸다." 라고 쓰여진다.`, () => {
    const wrapper = shallow(<Button />);

    const button = wrapper.find("button");
    button.simulate("click");

    const p = wrapper.find("p");
    expect(p.text()).toBe("버튼이 방금 눌렸다.");
  });
});
```

### 버튼을 클릭하기 전에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.

```js
describe("Button 컴포넌트 (enzyme)", () => {
  // ...

  it(`버튼을 클릭하기 전에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.`, () => {
    const wrapper = shallow(<Button />);

    const p = wrapper.find("p");
    expect(p.text()).toBe("버튼이 눌리지 않았다.");
  });
});
```

### 버튼을 클릭하고 5초 뒤에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.

```js
jest.useFakeTimers();

describe("Button 컴포넌트 (enzyme)", () => {
  // ...

  it(`버튼을 클릭하고 5초 뒤에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.`, async () => {
    const wrapper = shallow(<Button />);

    const button = wrapper.find("button");
    button.simulate("click");

    jest.advanceTimersByTime(5000);

    const p = wrapper.find("p");
    expect(p.text()).toBe("버튼이 눌리지 않았다.");
  });
});
```

### 버튼을 클릭하면, 5초 동안 버튼이 비활성화 된다.

```js
jest.useFakeTimers();

describe("Button 컴포넌트 (enzyme)", () => {
  // ...

  it(`버튼을 클릭하면, 5초 동안 버튼이 비활성화 된다.`, () => {
    const wrapper = shallow(<Button />);

    const button = wrapper.find("button");
    button.simulate("click");

    expect(wrapper.find("button").prop("disabled")).toBeTruthy();

    jest.advanceTimersByTime(5000);

    expect(wrapper.find("button").prop("disabled")).toBeFalsy();
  });
});
```

## 리덕스의 테스트

### Test 대상

- 액션 생성 함수
- 리듀서
- 컨테이너

```js
import {
  setBooks,
  startLoading,
  endLoading,
  setError,
  clearError,
  SET_ERROR,
  CLEAR_ERROR,
  START_LOADING,
  END_LOADING,
  SET_BOOKS,
} from "./";

describe("actions", () => {
  describe("books", () => {
    it("setBooks(books) should create action", () => {
      const books = [];
      expect(setBooks(books)).toEqual({ type: SET_BOOKS, books });
    });
  });

  describe("loading", () => {
    it("startLoading() should create action", () => {
      expect(startLoading()).toEqual({ type: START_LOADING });
    });

    it("endLoading should create action", () => {
      expect(endLoading()).toEqual({ type: END_LOADING });
    });
  });

  describe("error", () => {
    it("setError() should create action", () => {
      const error = new Error();
      expect(setError(error)).toEqual({ type: SET_ERROR, error });
    });

    it("clearError should create action", () => {
      expect(clearError()).toEqual({ type: CLEAR_ERROR });
    });
  });
});
```

### 리듀서 테스트 1

```js
import books from "./books";

describe("books reducer", () => {
  let state = null;

  beforeEach(() => {
    state = books(undefined, {});
  });

  afterEach(() => {
    state = null;
  });

  it("should return the initialState", () => {
    expect(state).toEqual([]);
  });
});
```

### 리듀서 테스트 2

```js
import books from "./books";
import { setBooks } from "../actions";

describe("books reducer", () => {
  ...

  it("setBooks action should return the newState", () => {
    const booksMock = [
      {
        bookId: 1,
        ownerId: "7d26db27-168c-4c6a-bd9a-9e20677b60b8",
        title: "모던 자바스크립트 입문",
        message: "모던하군요"
      },
      {
        bookId: 2,
        ownerId: "7d26db27-168c-4c6a-bd9a-9e20677b60b8",
        title: "책 Mock",
        message: "메세지 Mock"
      }
    ];
    const action = setBooks(booksMock);
    const newState = books(state, action);
    expect(newState).toEqual(booksMock);
  });
});

```

```
npm i redux-mock-store enzyme-to-json -D
```

### jest

```js
{
  ...
  "jest": {
    "snapshotSerializers": [
      "enzyme-to-json/serializer"
    ]
  }
}
```

### 컨테이너 테스트

```js
import React from "react";
import Enzyme, { mount } from "enzyme";
import BooksContainer from "./BooksContainer";
import configureMockStore from "redux-mock-store";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("BookContainer", () => {
  const mockStore = configureMockStore();

  // 가짜 스토어 만들기
  let store = mockStore({
    books: [],
    loading: false,
    error: null,
    token: "",
    router: {
      location: {
        pathname: "/",
      },
    },
  });

  it("renders properly", () => {
    const component = mount(<BooksContainer store={store} />);
    expect(component).toMatchSnapshot();
  });
});
```

### Snapshot

```js
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`BookContainer renders properly 1`] = `
<Connect(Books)
  store={
    Object {
      "clearActions": [Function],
      "dispatch": [Function],
      "getActions": [Function],
      "getState": [Function],
      "replaceReducer": [Function],
      "subscribe": [Function],
    }
  }
>
  <Books
    books={Array []}
    error={null}
    loading={false}
    requestBooksPromise={[Function]}
    requestBooksSaga={[Function]}
    requestBooksThunk={[Function]}
    store={
      Object {
        "clearActions": [Function],
        "dispatch": [Function],
        "getActions": [Function],
        "getState": [Function],
        "replaceReducer": [Function],
        "subscribe": [Function],
      }
    }
  >
    <div />
  </Books>
</Connect(Books)>
`;
```

# Redux Advanced (2)

## Ducks Pattern

- src/redux
  - create.js

* src/redux/modules

  - module1.js

  - module2.js

  - ...

  - reducer.js (or index.js)

```js
// src/redux/modules/books.js

import BookService from "../../services/BookService";

// 액션 타입 정의 ("app 이름"/"reducer 이름"/"로컬 ACTION_TYPE") => 겹치지 않게 하기 위함
const PENDING = "reactjs-books-review/books/PENDING";
const SUCCESS = "reactjs-books-review/books/SUCCESS";
const FAIL = "reactjs-books-review/books/FAIL";

// 리듀서 초기값
const initialState = {
  books: [],
  loading: false,
  error: null,
};

// 액션 생성자 함수
const start = () => ({ type: PENDING });
const success = (books) => ({ type: SUCCESS, books });
const fail = (error) => ({ type: FAIL, error });

// thunk 함수
export const getBooks = (token) => async (dispatch) => {
  dispatch(start());
  try {
    await sleep(2000);
    const res = await BookService.getBooks(token);
    dispatch(success(res.data));
  } catch (error) {
    dispatch(fail(error));
  }
};

// 리듀서
const books = (state = initialState, action) => {
  switch (action.type) {
    case PENDING:
      return {
        books: [],
        loading: true,
        error: null,
      };
    case SUCCESS:
      return {
        books: [...action.books],
        loading: false,
        error: null,
      };
    case FAIL:
      return {
        books: [],
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default books;

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
```

```js
// src/redux/modules/auth.js

import UserService from "../../services/UserService";

const PENDING = "reactjs-books-review/auth/PENDING";
const SUCCESS = "reactjs-books-review/auth/SUCCESS";
const FAIL = "reactjs-books-review/auth/FAIL";

const initialState = {
  token: null,
  loading: false,
  error: null,
};

// 액션 생성자 함수
const start = () => ({ type: PENDING });
const success = (token) => ({ type: SUCCESS, token });
const fail = (error) => ({ type: FAIL, error });

// thunk 함수
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(start());
    const res = await UserService.login(email, password);
    const { token } = res.data;
    localStorage.setItem("token", token);
    dispatch(success(token));
  } catch (error) {
    dispatch(fail(error));
  }
};

export const logout = (token) => async (dispatch) => {
  // 서버에 알려주기
  try {
    await UserService.logout(token);
  } catch (error) {
    console.log(error);
  }
  // 토큰 지우기
  localStorage.removeItem("token");
  // 리덕스 토큰 지우기
  dispatch(success(null));
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SUCCESS:
      return {
        token: action.token,
        loading: false,
        error: null,
      };
    case FAIL:
      return {
        token: null,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default auth;
```

```js
// src/redux/modules/reducer.js

import { combineReducers } from "redux";
import auth from "./auth";
import books from "./books";

const reducer = combineReducers({
  auth,
  books,
});

export default reducer;
```

```js
// src/redux/create.js

import { createStore, applyMiddleware } from "redux";
import reducer from "./modules/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

export default function create(token) {
  const initialState = {
    books: undefined,
    auth: {
      token,
      loading: false,
      error: null,
    },
  };

  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  );

  return store;
}
```

```js
// src/index.js

import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import create from "./redux/create";
import { Provider } from "react-redux";

const token = localStorage.getItem("token");
const store = create(token);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

```js
// src/containers/BooksContainer.jsx

import { connect } from "react-redux";
import Books from "../components/Books";
import { getBooks } from "../redux/modules/books";

const mapStateToProps = (state) => ({
  token: state.auth.token,
  books: state.books.books,
  loading: state.books.loading,
  error: state.books.error,
});

const mapDispatchToProps = (dispatch) => ({
  getBooks: (token) => {
    dispatch(getBooks(token));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Books);
```

```js
// src/components/Books.jsx

import React from "react";
import { useEffect } from "react";

const Books = ({ token, books, loading, error, getBooks }) => {
  useEffect(() => {
    getBooks(token);
  }, [token, getBooks]);

  if (error !== null) {
    return <div>에러다</div>;
  }

  return (
    <>
      {loading && <p>로딩 중...</p>}
      <ul>
        {books.map((book) => (
          <li key={book.bookId}>{book.title}</li>
        ))}
      </ul>
    </>
  );
};

export default Books;
```

## Connect with Hooks

```js
// src/containers/BooksContainer.jsx

import { connect } from "react-redux";
import Books from "../components/Books";
import { getBooks } from "../redux/modules/books";

const mapStateToProps = (state) => ({
  token: state.auth.token,
  books: state.books.books,
  loading: state.books.loading,
  error: state.books.error,
});

const mapDispatchToProps = (dispatch) => ({
  getBooks: (token) => {
    dispatch(getBooks(token));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Books);
```

```js
// src/containers/BooksContainer.jsx

import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Books from "../components/Books";
import { getBooks as getBooksAction } from "../redux/modules/books";

const BooksContainer = (props) => {
  const token = useSelector((state) => state.auth.token);
  const { books, loading, error } = useSelector((state) => state.books);

  const dispatch = useDispatch();

  const getBooks = useCallback(() => {
    dispatch(getBooksAction(token));
  }, [token, dispatch]); // token 을 보낼 필요 없다.

  return (
    <Books
      {...props}
      books={books}
      loading={loading}
      error={error}
      getBooks={getBooks}
    />
  );
};

export default BooksContainer;
```

```js
// src/containers/BooksContainer.jsx

import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Books from "../components/Books";
import { getBooks as getBooksAction } from "../redux/modules/books";

const BooksContainer = (props) => {
  const { books, loading, error } = useSelector((state) => state.books);

  const dispatch = useDispatch();

  const getBooks = useCallback(() => {
    dispatch(getBooksAction()); // token 을 thunk 안에서 처리
  }, [dispatch]);

  return (
    <Books
      {...props}
      books={books}
      loading={loading}
      error={error}
      getBooks={getBooks}
    />
  );
};

export default BooksContainer;
```

```js
// src/redux/modules/books.js

// thunk 함수
export const getBooks = () => async (dispatch, getState) => {
  const state = getState();
  const token = state.auth.token;
  dispatch(start());
  try {
    await sleep(2000);
    const res = await BookService.getBooks(token);
    dispatch(success(res.data));
  } catch (error) {
    dispatch(fail(error));
  }
};
```

## redux-actions

- createAction, createActions
- handleAction, handleActions
- combineActions

### createAction

```js
// src/redux/modules/books.js

import { createAction } from "redux-actions";

const start = createAction("START");
const success = createAction("SUCCESS", (books) => ({ books }));
const fail = createAction("FAIL");

console.log(start());
console.log(success(["book"]));
console.log(fail(new Error()));
```

### createActions

```js
// src/redux/modules/books.js

import { createActions } from "redux-actions";

const { start, success, fail } = createActions(
  {
    SUCCESS: (books) => ({ books }),
  },
  "START",
  "FAIL",
  {
    prefix: "reactjs-books-review/books",
  }
);

console.log(start());
console.log(success(["book"]));
console.log(fail(new Error()));
```

### handleActions

```js
// src/redux/modules/books.js

import { handleActions } from "redux-actions";

const books = handleActions(
  {
    START: () => ({
      books: [],
      loading: true,
      error: null,
    }),
    SUCCESS: (state, action) => ({
      books: action.payload.books,
      loading: false,
      error: null,
    }),
    FAIL: (state, action) => ({
      books: [],
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  {
    prefix: "reactjs-books-review/books",
  }
);
```

## Project

```
npm i react-helmet
```

### Head.jsx

```js
import React from "react";
import { Helmet } from "react-helmet";

export default function Head() {
  return (
    <Helmet>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />
      <meta charSet="utf-8" />
      <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
      <title>Marktube</title>
      <meta name="description" content="description" />
      <meta name="keyword" content="marktube" />
      <meta property="og:url" content="https://" />
      <meta property="og:title" content="title" />
      <meta property="og:type" content="website" />
      <meta property="og:description" content="description" />
      <meta property="og:image" content="" />
      <meta property="og:image:width" content="600" />
      <meta property="og:image:height" content="315" />
    </Helmet>
  );
}
```

### Layout.jsx

```js
import React from "react";
import Head from "./Head";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";

const StyledDiv = styled.div`
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 30px;
  margin-bottom: 50px;
`;

export default function ({ token, children }) {
  return (
    <div>
      <Head />
      <Header token={token} />
      <StyledDiv>{children}</StyledDiv>
      <Footer />
    </div>
  );
}
```

### Header.style.js

```js
import { Layout } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledHeader = styled(Layout.Header)`
  background-color: white;
`;

export const StyledLink = styled(Link)`
  font-family: Roboto;
  font-size: 18px;
  color: #642828;
  text-transform: uppercase;
  text-align: center;

  &:hover {
    color: #642828;
  }
`;

export const StyledHome = styled.div`
  width: 120px;
  height: 64px;
  float: left;
  margin-right: 20px;
`;
```

### Header.jsx

```js
import React from "react";
import { StyledHeader, StyledHome, StyledLink } from "./Header.style";
import Navs from "./Navs";

function Header({ token }) {
  return (
    <StyledHeader>
      <StyledHome>
        <StyledLink to="/">MARKTUBE</StyledLink>
      </StyledHome>
      <Navs token={token} />
    </StyledHeader>
  );
}

export default Header;
```

### Navs.style.js

```js
import React from "react";
import * as axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { Menu } from "antd";
import styled from "styled-components";

const StyledMenu = styled(Menu).attrs(() => ({
  theme: "light",
  mode: "horizontal",
}))`
  line-height: 64px;
  height: 64px;
`;

const MenuItem = styled(Menu.Item)``;

const StyledLink = styled(Link)`
  font-family: Roboto;
  font-size: 18px;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.65);
  text-transform: uppercase;
  text-align: center;
`;

const StyledLogoutButton = styled.div`
  font-family: Roboto;
  font-size: 18px;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.65);
  text-align: center;

  &:hover {
    color: #1890ff;
  }
`;

const StyledMenuSubMenu = styled(Menu.SubMenu)`
  width: 200px;
  float: right;
  text-align: center;
`;

const StyledUser = styled.div`
  font-family: Roboto;
  font-size: 18px;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.65);
`;

function Navs({ token, history }) {
  const logout = async () => {
    console.log("로그아웃");
    try {
      await axios.delete("https://api.marktube.tv/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
    localStorage.removeItem("token");
    history.push("/signin");
  };
  return (
    <StyledMenu>
      <MenuItem key="1">
        <StyledLink to="/add">Add Book</StyledLink>
      </MenuItem>
      {token && (
        <StyledMenuSubMenu key="9" title={<StyledUser>{"User"}</StyledUser>}>
          <MenuItem key="10">
            <StyledLink to="/profile">My Profile</StyledLink>
          </MenuItem>
          <MenuItem key="14">
            <StyledLogoutButton onClick={logout}>SIGN OUT</StyledLogoutButton>
          </MenuItem>
        </StyledMenuSubMenu>
      )}
    </StyledMenu>
  );
}

export default withRouter(Navs);
```

### Navs.jsx

```js
import React from "react";
import * as axios from "axios";
import { withRouter } from "react-router-dom";
import {
  StyledMenu,
  MenuItem,
  StyledLink,
  StyledMenuSubMenu,
  StyledUser,
  StyledLogoutButton,
} from "./Navs.style";

function Navs({ token, history }) {
  // ...
  return (
    <StyledMenu>
      <MenuItem key="1">
        <StyledLink to="/add">Add Book</StyledLink>
      </MenuItem>
      {token && (
        <StyledMenuSubMenu key="2" title={<StyledUser>{"User"}</StyledUser>}>
          <MenuItem key="3">
            <StyledLink to="/profile">My Profile</StyledLink>
          </MenuItem>
          <MenuItem key="4">
            <StyledLogoutButton onClick={logout}>SIGN OUT</StyledLogoutButton>
          </MenuItem>
        </StyledMenuSubMenu>
      )}
    </StyledMenu>
  );
}

export default withRouter(Navs);
```

### Footer.style.js

```js
import { Layout } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledFooter = styled(Layout.Footer)`
  width: 100%;
  padding-top: 60px;
  padding-left: 100px;
  padding-right: 100px;
  padding-bottom: 60px;
  background-color: #0a222e;
`;

export const StyledFooterColDiv = styled.div`
  width: 200px;
  margin-left: auto;
  margin-right: auto;
`;

export const FooterTitle = styled.h3`
  font-family: Roboto;
  font-weight: bold;
  font-size: 20px;
  line-height: 1.79;
  color: white;
`;

export const StyledLink = styled(Link)`
  font-family: Roboto;
  font-weight: 300;
  font-size: 16px;
  line-height: 2.03;
  color: white;
  text-transform: uppercase;
`;

export const StyledAnchor = styled.a`
  font-family: Roboto;
  font-weight: 300;
  font-size: 16px;
  line-height: 2.03;
  color: white;
  text-transform: uppercase;
`;

export const StyledInfoArea = styled.div`
  height: 60px;
  margin-top: 30px;
  overflow: hidden;
`;

export const StyledCopyright = styled.div`
  float: left;
  font-family: Roboto;
  font-size: 16px;
  font-weight: 300;
  text-align: left;
  color: #ffffff;
  margin-top: 40px;
`;

export const StyledSNS = styled.div`
  float: left;
  margin-top: 30px;
  margin-left: 50px;
`;
```

### Footer.jsx

```js
import React from "react";
import { Row, Col } from "antd";
import facebook from "../images/footer_facebook.png";
import linkedin from "../images/footer_linkedin.png";
import {
  StyledLink,
  StyledFooter,
  StyledFooterColDiv,
  FooterTitle,
  StyledAnchor,
  StyledInfoArea,
  StyledCopyright,
  StyledSNS,
} from "./Footer.style";

const FooterLink = ({ to, children }) => (
  <div
    style={{
      paddingTop: 3,
      paddingBottom: 3,
    }}
  >
    <StyledLink to={to}>{children}</StyledLink>
  </div>
);

const SNSLink = ({ href, imgSrc, alt }) => (
  <StyledSNS>
    <a href={href} target="_BLANK" rel="noopener noreferrer">
      <img
        src={imgSrc}
        style={{
          height: 30,
        }}
        alt={alt}
      />
    </a>
  </StyledSNS>
);

const FooterAnchor = ({ children }) => (
  <div
    style={{
      paddingTop: 3,
      paddingBottom: 3,
    }}
  >
    {children}
  </div>
);

export default function Footer() {
  return (
    <StyledFooter>
      <Row>
        <Col span={6}>
          <StyledFooterColDiv>
            <FooterTitle>MARKTUBE</FooterTitle>
            <FooterLink to="/pricing">PRICING</FooterLink>
            <FooterLink to="/faq">FAQ</FooterLink>
            <FooterLink to="/contactus">Contact Us</FooterLink>
          </StyledFooterColDiv>
        </Col>
        <Col span={6}>
          <StyledFooterColDiv>
            <FooterTitle>POLICIES</FooterTitle>
            <FooterLink to="/terms-and-conditions">
              TERMS & CONDITIONS
            </FooterLink>
            <FooterLink to="/privacy-policy">PRIVACY POLICY</FooterLink>
            <FooterLink to="/refund-policy">REFUND POLICY</FooterLink>
          </StyledFooterColDiv>
        </Col>
        <Col span={6}>
          <StyledFooterColDiv>
            <FooterTitle>OUR SERVICES</FooterTitle>
            <FooterLink to="/our-services?scroll=advanced-search">
              SEARCH
            </FooterLink>
          </StyledFooterColDiv>
        </Col>
        <Col span={6}>
          <StyledFooterColDiv>
            <FooterTitle>Additional</FooterTitle>
            <FooterAnchor>
              <StyledAnchor
                href="https://medium.com/@2woongjae"
                target="_BLANK"
              >
                MY BLOG
              </StyledAnchor>
            </FooterAnchor>
          </StyledFooterColDiv>
        </Col>
      </Row>
      <StyledInfoArea>
        <StyledCopyright>© 2019 MARKTUBE RIGHTS RESERVED.</StyledCopyright>
        <SNSLink
          href="https://www.facebook.com/2woongjae"
          imgSrc={facebook}
          alt="facebook"
        />
        <SNSLink
          href="https://www.linkedin.com/in/2woongjae"
          imgSrc={linkedin}
          alt="linkedin"
        />
      </StyledInfoArea>
    </StyledFooter>
  );
}
```

### Home.jsx

```js
import React from "react";
import withAuth from "../hocs/withAuth";
import BookListContainer from "../containers/BookListContainer";
import Layout from "../components/Layout";

function Home({ token }) {
  return (
    <Layout token={token}>
      <BookListContainer token={token} />
    </Layout>
  );
}

export default withAuth(Home);
```

### Add.jsx

```js
import React from "react";
import withAuth from "../hocs/withAuth";
import BookAddContainer from "../containers/BookListContainer";
import Layout from "../components/Layout";

function Add({ token }) {
  return (
    <Layout token={token}>
      <BookAddContainer token={token} />
    </Layout>
  );
}

export default withAuth(Add);
```

### BookAddContainer.jsx

```js
import { connect } from "react-redux";
import BookAdd from "../components/BookAdd";

const mapStateToProps = (state) => ({
  loading: state.loading,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(BookAdd);
```

### BookAdd.style.js

```js
import { Input, Button } from "antd";
import styled from "styled-components";

export const StyledDiv = styled.div`
  width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

export const InputTitle = styled.div`
  font-family: Roboto;
  font-size: 12px;
  font-weight: bold;
  margin-top: ${(props) => props.top || "40"}px;
  text-align: left;
  padding-left: 40px;
`;

export const InputArea = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const StyledInput = styled(Input)`
  width: 520px;
  border-radius: 1px;
  border-width: 1px;
  font-family: Roboto;
  margin-left: 40px;
  margin-right: 40px;
`;

export const ButtonArea = styled.div`
  text-align: right;
  padding-right: 40px;
  margin-top: 20px;
`;

export const StyledButton = styled(Button)`
  border-color: #28546a;
  background-color: #28546a;
  text-transform: uppercase;
  border-radius: 1px;
  border-width: 2px;
  color: white;
  width: 120px;
  &:hover {
    background-color: #28546a;
    color: white;
  }
`;

export const StyledSpan = styled.span.attrs(() => ({
  children: "*",
}))`
  color: #971931;
`;
```

### BookAdd.jsx

```js
import React from "react";
import { PageHeader, message, Icon } from "antd";
import {
  StyledDiv,
  InputTitle,
  StyledSpan,
  InputArea,
  StyledInput,
  ButtonArea,
  StyledButton,
} from "./BookAdd.style";

class BookAdd extends React.Component {
  _titleInput = React.createRef();
  _messageInput = React.createRef();
  _authorInput = React.createRef();
  _urlInput = React.createRef();

  render() {
    const { back, loading } = this.props;
    return (
      <>
        <PageHeader
          onBack={back}
          title={
            <div>
              <Icon type="form" /> Add Book
            </div>
          }
          subTitle="Add Your Faborite Book"
        />
        <StyledDiv>
          <InputTitle>
            Title
            <StyledSpan />
          </InputTitle>
          <InputArea>
            <StyledInput placeholder="Title" ref={this._titleInput} />
          </InputArea>
          <InputTitle top={10}>
            Comment
            <StyledSpan />
          </InputTitle>
          <InputArea>
            <StyledInput placeholder="Comment" ref={this._messageInput} />
          </InputArea>
          <InputTitle top={10}>Author</InputTitle>
          <InputArea>
            <StyledInput placeholder="Author" ref={this._authorInput} />
          </InputArea>
          <InputTitle top={10}>URL</InputTitle>
          <InputArea>
            <StyledInput placeholder="URL" ref={this._urlInput} />
          </InputArea>
          <ButtonArea>
            <StyledButton size="large" loading={loading} onClick={this._click}>
              추가하기
            </StyledButton>
          </ButtonArea>
        </StyledDiv>
      </>
    );
  }
  _click = async () => {
    // ...
  };
}
export default BookAdd;
```
