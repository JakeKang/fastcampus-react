const LOCALSTORAGE_KEY = 'token';

export default class TokenService {
  static get() {
    return localStorage.getItem(LOCALSTORAGE_KEY);
  }

  static save(token) {
    localStorage.setItem(LOCALSTORAGE_KEY, token);
  }

  static remove() {
    localStorage.removeItem(LOCALSTORAGE_KEY);
  }
}
