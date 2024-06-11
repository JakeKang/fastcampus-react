import React, { useState } from 'react';

function sum(persons) {
  console.log('sum...');
  return persons.map((person) => person.age).reduce((l, r) => l + r, 0);
}

const Example9 = () => {
  const ref = React.useRef();
  const [value, setValue] = useState('');
  const [persons] = useState([
    { name: 'Mark', age: 38 },
    { name: 'Hanna', age: 27 },
  ]);

  function change(e) {
    setValue(e.target.value);
  }

  const count = React.useMemo(() => {
    return sum(persons); // persons 바뀔때만 다시 계산해야 한다.
  }, [persons]);

  const click = React.useCallback(() => {
    console.log(persons);
  }, [persons]);

  console.log(ref.current);

  return (
    <div>
      <input value={value} onChange={change} />
      <p ref={ref}>{count}</p>
      <button onClick={click}>click</button>
    </div>
  );
};

export default Example9;
