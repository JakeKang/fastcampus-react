import React from "react";

export default function FunctionalComponent({ name, age, children, isFemale }) {
  console.log(name, age, children, isFemale);
  return (
    <p>
      FunctionalComponent : 나의 이름은 {name} 입니다. 나이는 {age} 입니다.
    </p>
  );
}

// FunctionalComponent.defalutProps = { isFemale: false };

// const FunctionalComponent = ({ name, age, children }) => {
//   console.log(name, age, children);
//   return (
//     <p>
//       FunctionalComponent : 나의 이름은 {name} 입니다. 나이는 {age} 입니다.
//     </p>
//   );
// };

// export default FunctionalComponent;

// <a href="/">hello</a>
