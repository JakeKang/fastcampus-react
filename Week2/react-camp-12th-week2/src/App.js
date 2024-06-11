import React from "react";
import "./App.css";
import ClassComponent from "./components/ClassComponent";
import FunctionalComponent from "./components/FunctionalComponent";

// 1. flow
// 2. TypeScript

function App() {
  // const props = {name: 'Mark', age: 38};

  // 1. {name: 'Mark', age: 38, children: 자식들} => props
  return (
    <div className="App">
      <ClassComponent namu="Mark" age={38} isFemale={true}>
        자식들
      </ClassComponent>
      <FunctionalComponent name="Anna" age={27} />
      <FunctionalComponent name="Mark" age={38}>
        강아지
      </FunctionalComponent>
    </div>
  );
}

export default App;
