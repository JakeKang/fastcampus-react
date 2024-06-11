import React from 'react';
import useWindiwWidth from '../hooks/useWindowWidth';
import Example9 from '../components/Example9';

export default function NotFound() {
  const width = useWindiwWidth();

  return (
    <div>
      <h1>NotFound {width}</h1>
      <Example9 />
    </div>
  );
}
