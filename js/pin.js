'use strict';

(function () {

  // поиск и наполнение инфой метки
  var createPinMap = function (pinData) {

    var similarPinTemplate = document.querySelector('#pin')// находит шаблон и его внут.блок
      .content
      .querySelector('.map__pin');
    var pinElement = similarPinTemplate.cloneNode(true);
    pinElement.querySelector('img').src = pinData.author.avatar;
    pinElement.querySelector('img').alt = pinData.offer.description;
    pinElement.style.left = pinData.location.x + 'px'; // в узле .map__pin заполняет данные в style.left (x) из locationX
    pinElement.style.top = pinData.location.y + 'px';

    // слушает метку и отрисовывает popup с данными выбранной метки
    pinElement.addEventListener('click', function () {
      var mapCardRemovable = window.map.map.querySelector('.map__card');

      // удаляет попап, если уже есть
      if (mapCardRemovable) {
        mapCardRemovable.remove();
      }

      // собственно отрисовка
      window.card.renderPopup(pinData);
    });
    return pinElement;
  };

  // отрисовка меток
  var renderPinMaps = function (array) {
    var mapPins = document.querySelector('.map__pins');
    var mapPinsFragment = document.createDocumentFragment();

    // пробегает по каждому обьявлению из массива
    for (var j = 0; j < array.length; j++) {

      // во фрагмент добавляет метку с данными из массива
      mapPinsFragment.appendChild(createPinMap(array[j]));
    }
    // добавляет фрагмент на страницу
    mapPins.appendChild(mapPinsFragment);


  };


  window.pin = {
    createPinMap: createPinMap,
    renderPinMaps: renderPinMaps
  };

  // ф-я активации запускает ф-ю отрисовки меток
  // ф-я отрисовки меток (параметр - массив данных), пробегает по массиву данных и добавляет фрагмент каждого
  // обьявления - запускает ф-ю создания метки
  // 1.ф-я создание метки (параметр - данные одной метки),
  // внутри функции устаноывлен обработчик, на клик по метке, который запускает ф-ю отрисовки картчки с тем же параметром
  // 2.ф-я отрисовки карточки (параметр - массив данных), внутри есть цикл по массиву данных

})();
