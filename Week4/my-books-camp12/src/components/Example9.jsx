import React, { useState } from 'react';

function sum(persons) {
  console.log('sum...');
  return persons.map((person) => person.age).reduce((l, r) => l + r, 0);
}

const Example9 = () => {
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

  return (
    <div>
      <input value={value} onChange={change} />
      <p>{count}</p>
    </div>
  );
};

export default Example9;
