import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startGetBooks, successGetBooks, failGetBooks } from '../actions.js';
import { useCallback } from 'react';
import BookList from '../components/BookList';
import axios from 'axios';

export default function BookListContainer({ token }) {
  // mapStateToProps  
  const { books, loading, error } = useSelector(state => state.books);
  
  // mapDispatchToProps
  const dispatch = useDispatch();

  const getBooks = useCallback(async () => {
    try {
      dispatch(startGetBooks());
      await sleep(2000);
      const response = await axios.get('https://api.marktube.tv/v1/book', {
      headers: {
        Authorization: `Bearer ${token}`,
        },
      });
      const books = response.data;
      dispatch(successGetBooks(books));
      } catch (error) {
        dispatch(failGetBooks(error));
    }
  }, [dispatch, token]);

  return (
    <BookList 
      books={books} 
      loading={loading} 
      error={error}
      getBooks={getBooks}
    />
  );
}

  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }