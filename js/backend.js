'use strict';

(function () {

  var TIMEOUT_MS = 10000;
  var statusCode = {
    OK: 200,
    NOT_URL: 404,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    INTERNAL_ERR: 500
  };

  // create module7-task3

  // создает урл
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';

  var getData = function (onSuccess, onError) {

    // создает обьект конструктор
    var xhr = new XMLHttpRequest();

    // устанавливает тип json
    xhr.responseType = 'json';

    // время ожидания, мс
    xhr.timeout = TIMEOUT_MS;

    // слушает событие load (скачать с сервера)
    xhr.addEventListener('load', function () {
    // создает переменную ошибки
      var error;
      // в случае если статус обьекта xhr равен...
      switch (xhr.status) {
        case statusCode.OK:
          // запускает функцию с параметром ответа сервера
          onSuccess(xhr.response);
          break;
        case statusCode.BAD_REQUEST:
          error = 'Неверный запрос';
          break;
        case statusCode.UNAUTHORIZED:
          error = 'Пользователь не авторизован';
          break;
        case statusCode.NOT_URL:
          error = 'ошибка в написании ссылки';
          break;
        case statusCode.INTERNAL_ERR:
          error = 'ошибка в написании ссылки';
          break;

        // в случае ошибок выводится сообщение: статус + текст статуса
        default:
          error = 'Статус ответа: ' + xhr.status + xhr.statusText;
      }
      // в случае ошибок запускает функцию
      if (error) {
        onError(error);
      }
    });

    // реакция на обрыв соединения
    xhr.addEventListener('error', function () {
      onError('Проверьте подключение интернета');
    });

    // реакция на ожидание
    xhr.addEventListener('timeout', function () {
      onError(xhr.timeout / 1000 + ' сек:    ' + 'Время вышло, прыщага ');
    });

    return xhr;

  };

  var upload = function (data, onSuccess, onError) {
    var xhr = getData(onSuccess, onError);
    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  var load = function (onSuccess, onError) {
    var xhr = getData(onSuccess, onError);
    // открывает запрос
    xhr.open('GET', URL_LOAD);
    // запускает запрос
    xhr.send();

  };

  window.backend = {
    load: load,
    upload: upload
  };

})();
