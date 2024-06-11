import React from 'react';
import { useEffect } from 'react';

export default function BookList({
  books,
  loading,
  error,
  getBooks,
}) {

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  return (
    <div>
    {loading && <div>로딩 중...</div>}
    {error !== null && <div>에러다!!!</div>}
      {books.map((book) => {
        return <div>{book.title}</div>
      })}
    </div>
  );
}