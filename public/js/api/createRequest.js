'use strict';

/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const handleError = (error) => {
    if (App.state !== 'init' && Object.keys(error).length) {
      let content = 'server sent mistake';
  
      if (typeof error === 'object') {
        content += Object.values(error).join(' ');
      } else {
        content += error;
      }
  
      if (/[^.]$/.test(content)) {
        content += '.';
      }
  
      console.error(content);
    }
}
  
  /**
   * Основная функция для совершения запросов
   * на сервер.
   * */
const createRequest = (options) => {
    if (!options) {
      throw new Error('parametr options of function createRequest not found');
    }
  
    let {url, headers, data, responseType, method, callback} = options;
    const xhr = new XMLHttpRequest();
  
    try {
      xhr.open(method, url);
      xhr.responseType = responseType;
      xhr.withCredentials = true;
  
      if (headers) {
        for (const [key, value] of Object.entries(headers)) {
          xhr.setRequestHeader(key, value);
        }
      }
  
      xhr.onloadend = () => {
        if (String(xhr.status).startsWith('2')) {
          callback(xhr.response?.error, xhr.response);
        } else {
          let content = 'server did not accept the request ';
          content += `mistake ${xhr.status}: ${xhr.statusText}.`;
          console.error(content);
        }
      }
  
      if (data === undefined) {
        xhr.send();
      } else {
        const formData = new FormData();
  
        for (const [key, value] of Object.entries(data)) {
          formData.append(key, value);
        }
  
        xhr.send(formData);
      }
    }
    catch (e) {
      console.error(e);
    }
};