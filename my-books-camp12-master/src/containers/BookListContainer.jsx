import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startGetBooks, startRemoveBook } from '../redux/modules/books';
import { startLogout } from '../redux/modules/auth';
import { useCallback } from 'react';
import BookList from '../components/BookList';

export default function BookListContainer() {
  // mapStateToProps
  const { books, loading, error } = useSelector((state) => state.books);

  // mappDispatchToProps
  const dispatch = useDispatch();

  const getBooks = useCallback(() => {
    dispatch(startGetBooks());
  }, [dispatch]);

  const removeBook = useCallback(
    (bookId) => {
      dispatch(startRemoveBook(bookId));
    },
    [dispatch],
  );

  const logout = useCallback(() => {
    dispatch(startLogout());
  }, [dispatch]);

  return (
    <BookList
      books={books}
      loading={loading}
      error={error}
      getBooks={getBooks}
      removeBook={removeBook}
      logout={logout}
    />
  );
}
