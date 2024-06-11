import React from 'react';
import BookAddContainer from '../containers/BookAddContainer';
import useAuth from '../hooks/useAuth';

function Home() {
  useAuth(true);
  return (
    <div>
      <h1>Add</h1>
      <BookAddContainer />
    </div>
  );
}

export default Home;
