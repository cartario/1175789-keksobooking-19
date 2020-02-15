'use strict';

(function () {

  // валидация

  // находим нужные поля
  var adForm = document.querySelector('.ad-form');
  var adFormTitle = adForm.querySelector('#title');
  var adFormPrice = adForm.querySelector('#price');

  var roomsInputElement = adForm.querySelector('select[name="rooms"]');
  var capacityInputElement = adForm.querySelector('select[name="capacity"]');

  // обязательны для заролнения
  adFormTitle.required = true;
  adFormPrice.required = true;

  // валидация цены
  adFormPrice.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < 4) {
      target.setCustomValidity('укажите ссумму в интервале 1 000 - 1 000 000');
    } else {
      target.setCustomValidity('');
    }
  });

  // вначале отключает все инпуты
  var setDisabledValue = function (options, array) {
    for (var a = 0; a < options.length; a++) {
      // выключает каждую опцию
      options[a].disabled = false;
      // проверка, если значеник текущей опции отсутствует в array, тогда включает текущую опцию
      if (array.indexOf(options[a].value) > -1) {
        options[a].disabled = true;
      }
    }
  };


  var setSelectedValue = function (options, array) {
    for (var b = 0; b < options.length; b++) {
      if (array.indexOf(options[b].value) > -1) {
        options[b].selected = true;
      }
    }
  };

  // по умолчанию в опции количество гостей доступно  - для 1 гостя и выбрана доступная опция
  setDisabledValue(capacityInputElement, ['0', '2', '3']);
  setSelectedValue(capacityInputElement, ['1']);

  // зависимость количества гостей от количества комнат
  var availableCapacity = function () {
    var roomsInputValue = roomsInputElement.value;
    switch (roomsInputValue) {
      case '1':
        setDisabledValue(capacityInputElement, ['0', '2', '3']);

        // устанавливает элементу статус - выбрано
        capacityInputElement[0].selected = true;
        break;
      case '2':
        setDisabledValue(capacityInputElement, ['0', '3']);
        capacityInputElement[1].selected = true;
        break;
      case '3':
        setDisabledValue(capacityInputElement, ['0']);
        capacityInputElement[2].selected = true;
        break;
      case '100':
        setDisabledValue(capacityInputElement, ['1', '2', '3']);
        capacityInputElement[3].selected = true;
        break;
    }
  };

  // слушает изменения в поле количество комнат
  roomsInputElement.addEventListener('change', availableCapacity);

})();
