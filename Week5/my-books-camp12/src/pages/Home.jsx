import React from 'react';
import withAuth from '../hocs/withAuth';
import BookListContainer from '../containers/BookListContainer';

function Home({ token }) {
    return (
      <div>
        <h1>Home</h1>
        <BookListContainer token={token} />
      </div>
    );
}

export default withAuth(Home);