import axios from 'axios';

const API_URL = 'https://api.marktube.tv/v1/book';

export default class BookService {
  // token
  // books
  static async getBooks(token) {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async addBook(token, book) {
    const response = await axios.post(API_URL, book, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async removeBook(token, bookId) {
    const response = await axios.delete(`${API_URL}/${bookId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async editBook() {}
}
