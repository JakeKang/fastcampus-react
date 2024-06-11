import React from 'react';
import useWindiwWidth from '../hooks/useWindowWidth';
import Example9 from '../components/Example9';
import PersonContext from '../contexts/PersonContext';

export default function NotFound() {
  const width = useWindiwWidth();
  const persons = React.useContext(PersonContext);

  return (
    <div>
      <h1>NotFound {width}</h1>
      <Example9 />
      <PersonContext.Consumer>
        {(value) => <p>{JSON.stringify(value)}</p>}
      </PersonContext.Consumer>
      <p>{JSON.stringify(persons)}</p>
    </div>
  );
}
