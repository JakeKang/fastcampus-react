## 패스트캠퍼스 React

### Week2

사용 슬라이드
Week1 => Props 와 State, Event Handling ,라이프사이클
[Week2](https://slides.com/woongjae/react-camp-2#/4)

#### Props 와 State

특정 컴포넌트의 UI의 모습을 어떤 상태일때 props와 state에 따라서 보여주는 케이스가 다르게 보인다.

Props는 외부에서 컴포넌트에게 뭐라고 써주는것
- 명쾌하게 외부에서 내부로 들어오는 어트리뷰트같은 성격
  
State는 자신이 가지고 있는 상태
- 외부에서는 보이지 않는다.

__두가지를 제외하고 어떤 데이터가 있을때 그 데이터가 변하는건 해당 컴포넌트에 영향을 주지 않는다.__

UI를 변경해야될 데이터가 있다면, 그 데이터는 Props 혹은 State로 존재해야한다.
컴포넌트에 존재하는 데이터가 UI의 변화에 영향을 주지 않으면 Props나 State로 사용하지 않아도 된다. => Render가 자주 발생한다.

Props를 변경하려면 상위 부모 컴포넌트에서 Props 바꿔서 넣어 줄려면 부모도 다시 Render해야 한다.

1. 본인의 State를 변경
2. 부모요소에서 바뀐 Props를 넣어준다.
2가지 중 하나만 실행되어도 Render가 발생한다.

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

----

#### 리액트 프로젝트 구성하기
npx create-react-app 원하는 이름
=> 프로젝트 기초 세팅파일을 다운받는다.

##### ESLint
문법적으로 잘못된건 아니지만 코드 스타일에 제약을 가하고 싶을때 사용한다.
여러 스타일에 대한 룰이 적용된 유틸이며 CRA에 포함되어있다.

```package.josn
"eslintConfig" : {
    "extends" : "react-app", 을 선언하면 eslintConfig를 상속받아서 사용가능하다.
}
```

##### Prettier
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

##### husk
git에 commit, push 등 여러활동을 할때 hooks을 걸어 다른 활동을 같이 실행한다.
husk를 먼저설치하고 git을 설치해야 한다.
```package.json
"husky": {
    "hooks": {
        "pre-commit": "npm test" // 커밋시 확인 
    }
}

```

##### lint-staged
```package.json
"lint-staged": {
    "*": { // 파일확장자
        "git add" // 파일의 확장자를 git add 하겠다.
    }
}
```

##### React Developer Tools
브라우저에서 리액트를 디버깅할 수 있는 툴이다.
브라우저별로 맞는 확장프로그램을 설치한다.

----

#### 리액트 라우팅 이해하기

##### React 의 라우팅 이해하기

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

```
npm i react-router-dom
```

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

###### Dymamic 라우팅 까지 진행