import React from 'react';
import BookListContainer from '../containers/BookListContainer';
import useAuth from '../hooks/useAuth';

function Home() {
  useAuth(true);
  return (
    <div>
      <h1>Home</h1>
      <BookListContainer />
    </div>
  );
}

export default Home;
