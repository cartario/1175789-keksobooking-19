'use strict';
(function () {

  // 1.Выводить на карту не более 5 меток. Установка фильтра по количеству должна
  // происходить сразу после получения данных с сервера;

  // 2.Запрограммировать фильтр «Тип жилья». Помните, независимо от того сколько объявлений
  // соответствует фильтру «Тип жилья» на карте не должно отображаться больше 5 объявлений.

  // 3.При изменении любого фильтра скрывать открытую карточку объявления.

  // any
  // palace
  // flat
  // bungalo
  // house

  // ограничение кол-ва меток
  var PINS_LIMIT = 5;

  // находит нужные поля
  var filter = document.querySelector('.map__filters');
  var filterItems = filter.querySelectorAll('select, input');
  var typeSelect = filter.querySelector('#housing-type');

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
    filteredData = filteredData.filter(filtrationByType).concat(data);


    // удаляет отрисованные ранее пины
    window.map.removePins();

    // удаляет карточку
    window.map.removeCard();

    // отрисовка данных filteredData с ограничением кол-во пинов
    window.pin.renderPinMaps(filteredData.slice(0, PINS_LIMIT));
  };

  // фильтрует по типу жилья
  var filtrationByType = function (it) {
    return it.value === 'any' ? true : typeSelect.value === it.offer.type;
  };


  window.filter = {
    activateFiltration: activateFiltration
  };

})();
