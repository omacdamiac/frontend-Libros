import { CONST_STORAGE } from '../const/constStorage';

export class UTILS {
  /**
   * SET
   * */
  static setStorageUsername(username) {
    sessionStorage.setItem(CONST_STORAGE.USERNAME, username.email);
  }
  static setStorageLogueoDate(date) {
    sessionStorage.setItem(CONST_STORAGE.DATE, date);
  }
  static setStorageRol(rol) {
    sessionStorage.setItem(CONST_STORAGE.ROL, rol);
  }
  static setStorageTOKEN(token) {
    sessionStorage.setItem(CONST_STORAGE.TOKEN, token);
  }
  static setStorageName(name) {
    sessionStorage.setItem(CONST_STORAGE.NAME, name);
  }
  /**
   * GET
   * */
  static getSessionToken() {
    return sessionStorage.getItem(CONST_STORAGE.TOKEN);
  }

  /**
   * UTILS
   * */
  static clearToken() {
    sessionStorage.removeItem(CONST_STORAGE.TOKEN);
  }
  static removeItem(item) {
    sessionStorage.removeItem(item);
  }

  static logout() {
    UTILS.clearToken();
    CONST_STORAGE.ITEMS.forEach((itemN: string) => {
      UTILS.removeItem(itemN);
    });
  }
}
