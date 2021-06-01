'use strict';

/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static  URL = '/user';

  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch (e) {
      callback(e);
    }
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    createRequest({
      url: this.URL + '/current',
      responseType: 'json',
      method: 'GET',
      callback: (_, response) => {
        if (response?.user) {
          User.setCurrent(response.user);
        } else {
          User.unsetCurrent();
        }
        callback();
      }
    });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      url: this.URL + '/login',
      data: data,
      responseType: 'json',
      method: 'POST',
      callback: (error, response) => {
        if (error) {
          callback(error);
        } else {
          User.setCurrent(response.user);
          callback();
        }
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    createRequest({
      url: this.URL + '/register',
      data: data,
      responseType: 'json',
      method: 'POST',
      callback: (error, response) => {
        if (error) {
          callback(error);
        } else {
          User.setCurrent(response.user);
          callback();
        }
      }
    });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(data, callback) {
    createRequest({
      url: this.URL + '/logout',
      data: data,
      responseType: 'json',
      method: 'POST',
      callback: (error) => {
        if (error) {
          callback(error);
        } else {
          User.unsetCurrent();
          callback();
        }
      }
    });
  }
}