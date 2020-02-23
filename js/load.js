'use strict';

(function () {

  // создает урл
  var urlData = 'https://js.dump.academy/keksobooking/data';

  window.load = function (onSuccess, onError) {
    // создает обьект конструктор
    var xhr = new XMLHttpRequest();

    // устанавливает тип json
    xhr.responseType = 'json';

    // слушает событие load (скачать с сервера)
    xhr.addEventListener('load', function () {

      // создает переменную ошибки
      var error;
      // в случае если статус обьекта xhr равен...
      switch (xhr.status) {
        case 200:
          // запускает функцию с параметром ответа сервера
          onSuccess(xhr.response);
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
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

    // время ожидания, мс
    xhr.timeout = 10000;

    // открывает запрос
    xhr.open('GET', urlData);

    // запускает запрос
    xhr.send();
  };

  // будет выводить в консоль сообщение ошибки
  var onError = function (message) {
    console.error(message);
  };

  // будет хранить в переменной данные с сервера
  var onSuccess = function (data) {
    var adverts = data;
    for (var i = 0; i < adverts.length; i++) {
      console.log(adverts[i].author);
    }

  };


  // запускает функцию загрузки
  window.load(onSuccess, onError);


})();
