export const START_GET_BOOKS = 'START_GET_BOOKS';
export const SUCCESS_GET_BOOKS = 'SUCCESS_GET_BOOKS';
export const FAIL_GET_BOOKS = 'FAIL_GET_BOOKS';

// 처음 로딩할때
export const startGetBooks = () => ({
  type: START_GET_BOOKS,
});

// 리퀘스트, 리스폰스
export const successGetBooks = (books) => ({
  type: SUCCESS_GET_BOOKS,
  books,
});

// 오류 발생
export const failGetBooks = (error) => ({
  type: FAIL_GET_BOOKS,
  error,
});