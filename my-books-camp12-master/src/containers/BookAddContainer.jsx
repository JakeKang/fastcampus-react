import React from 'react';
import BookAdd from '../components/BookAdd';
import { useDispatch } from 'react-redux';
import { startAddBook } from '../redux/modules/books';

export default function BookAddContainer() {
  //   // mapStateToProps
  //   const { books, loading, error } = useSelector((state) => state.books);

  // mappDispatchToProps
  const dispatch = useDispatch();

  //   const getBooks = useCallback(() => {
  //     dispatch(startGetBooks());
  //     dispatch(startGetBooks());
  //     dispatch(startGetBooks());
  //   }, [dispatch]);

  const add = React.useCallback(
    (book) => {
      console.log(book);
      dispatch(startAddBook(book));
    },
    [dispatch],
  );

  return <BookAdd add={add} />;
}
