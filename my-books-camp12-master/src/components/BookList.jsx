import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function BookList({
  books,
  loading,
  error,
  getBooks,
  logout,
  removeBook,
}) {
  useEffect(() => {
    getBooks();
  }, [getBooks]);

  return (
    <div>
      <h2>Book List</h2>
      <p>
        <Link to="/add">Add</Link>
      </p>
      <p>
        <button onClick={logout}>Logout</button>
      </p>
      <div>
        {loading && <div>로딩 중...</div>}
        {error !== null && <div>에러다!!!</div>}
        {books.map((book) => {
          function remove() {
            removeBook(book.bookId);
          }
          return (
            <div
              key={book.bookId}
              style={{ border: '2px solid pink', marginBottom: 5 }}
            >
              <h3>
                {book.title} / {book.author}{' '}
                <button onClick={remove}>Delete</button>
              </h3>
              <p>{book.message}</p>
              <p>{book.url}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
