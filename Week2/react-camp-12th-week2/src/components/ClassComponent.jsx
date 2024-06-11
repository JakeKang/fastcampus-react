import React from "react";

// import {ClassComponent} from './ClassComponent';
// export class ClassComponent extends React.Component {

// }

// import ClassComponent from './ClassComponent';
export default class ClassComponent extends React.Component {
  // 1. state 의 형태를 정합니다.
  state = {
    count: 0,
  };
  data = {
    count: 0,
  };

  static defaultProps = {
    isFemale: false,
  };
  componentDidMount() {
    setInterval(() => {
      console.log("timer", this.state.count, this.data.count++);
    }, 1000);
  }
  render() {
    // console.log(this.props, this.state);
    // if (this.props.age > 29) {
    //   return <p>ClassComponent : 30대 이상</p>;
    // } else {
    //   return <p>ClassComponent : 20대 이하</p>;
    // }

    return (
      <button>버튼</button>
    )
  }
}

// <ClassComponent />
