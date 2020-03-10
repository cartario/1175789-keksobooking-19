'use strict';
(function () {

  // ограничение кол-ва меток
  var PINS_LIMIT = 5;

  // находит нужные поля
  var filter = document.querySelector('.map__filters');
  var filterItems = filter.querySelectorAll('select, input');
  var typeSelect = filter.querySelector('#housing-type');
  var roomSelect = filter.querySelector('#housing-rooms');
  var guestsSelect = filter.querySelector('#housing-guests');
  var priceSelect = filter.querySelector('#housing-price');
  var featuresSelect = filter.querySelector('#housing-features');

  // задает массив цен
  var PriceRange = {
    ANY: {MIN: 0, MAX: Infinity},
    LOW: {MIN: 0, MAX: 10000},
    MIDDLE: {MIN: 10000, MAX: 50000},
    HIGH: {MIN: 50000, MAX: Infinity}
  };


  // создает пустые массивы для данных
  var data = [];
  var filteredData = [];

  // получает данные из map
  var activateFiltration = function (pinsData) {
    // создает копию данных
    data = pinsData.slice(0);

    // активирует форму фильтр
    activateFilter();

    //
    return pinsData.slice(0, PINS_LIMIT);

  };

  var activateFilter = function () {

    // пробегает по полям фильтра и отклюячает состояние disabled
    filterItems.forEach(function (it) {
      it.disabled = false;
    });

    onFilterChange();

    // слушает изменения на форме-фильтр и производит манипуляции в ф-ии onFilterChange
    filter.addEventListener('change', onFilterChange);
  };

  // реагирует на изменения в полях фильтра
  var onFilterChange = function () {

    // создает копию данных
    filteredData = data.slice(0);


    // запускает ф-ю фильтрации по типу выбранного жилья
    filteredData = filteredData.filter(function (it) {
      return filtrationByType(it) && filtrationByRoom(it) && filtrationByGuests(it) && filtrationByPrice(it) && filtrationByFeatures(it);
    });


    // удаляет отрисованные ранее пины
    window.map.removePins();

    // удаляет карточку
    window.map.removeCard();

    // отрисовка данных filteredData с ограничением кол-во пинов
    window.pin.renderPinMaps(filteredData.slice(0, PINS_LIMIT));
  };

  // фильтрует по типу жилья
  var filtrationByType = function (it) {

    // возвращает any или совпадение it.offer.type с инпутом
    return typeSelect.value === 'any' || it.offer.type === typeSelect.value;
  };

  var filtrationByRoom = function (it) {
    return roomSelect.value === 'any' || it.offer.rooms.toString() === roomSelect.value;
  };

  var filtrationByGuests = function (it) {

    return guestsSelect.value === 'any' || it.offer.guests.toString() === guestsSelect.value;

  };

  var filtrationByFeatures = function (it) {

    // создает пустой массив для хранения выбранных чекбоксов
    var features = [];

    // находит выбранные
    var checkedFeatures = featuresSelect.querySelectorAll('input:checked');

    // каждый выбранный чекбокс записывает в массив
    checkedFeatures.forEach(function (item) {
      features.push(item.value);

    });

    // пробегает по каждому элементу из выбранных чекбоксов
    return features.every(function (element) {

      // возвращает сопвадения
      return it.offer.features.includes(element);
    });


  };

  var filtrationByPrice = function (it) {

    // текущая выбранная категория цен
    var filteringPrice = PriceRange[priceSelect.value.toUpperCase()];

    // сравнивает текущую категорию с ценой
    return it.offer.price >= filteringPrice.MIN && it.offer.price <= filteringPrice.MAX;


  };

  window.filter = {
    activateFiltration: activateFiltration
  };

})();
