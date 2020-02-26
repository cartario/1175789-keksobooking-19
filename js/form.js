'use strict';

(function () {

  // валидация

  // находим нужные поля
  var adForm = document.querySelector('.ad-form');
  var adFormTitle = adForm.querySelector('#title');
  var adFormPrice = adForm.querySelector('#price');

  var roomsInputElement = adForm.querySelector('select[name="rooms"]');
  var typeInputElement = adForm.querySelector('select[name="type"]');
  var capacityInputElement = adForm.querySelector('select[name="capacity"]');
  var timeInInput = adForm.querySelector('select[name="timein"]');
  var timeOutInput = adForm.querySelector('select[name="timeout"]');
  var adFormReset = adForm.querySelector('.ad-form__reset');

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.load.upload(new FormData(adForm), function () {
      window.main.setSuccessMessage();
    });
  });

  var onResetClick = function () {
    adForm.reset();
    window.map.setDisActiveMode(true);
    window.map.map.querySelector('.map__card').remove();

    window.main.addressInput.value = '595, 445';
    window.map.MainPin.style.left = 595 + 'px';
    window.map.MainPin.style.top = 445 + 'px';
  };

  adFormReset.addEventListener('click', onResetClick);


  // обязательны для заролнения
  adFormTitle.required = true;
  adFormPrice.required = true;


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

  // зависимость цены от типа жилья
  var setPriceOfType = function () {
    var typeInputValue = typeInputElement.value;
    switch (typeInputValue) {
      case 'flat':
        adFormPrice.value = false;
        adFormPrice.setAttribute('min', 1000);
        adFormPrice.setAttribute('placeholder', 1000);
        break;
      case 'bungalo':
        adFormPrice.value = false;
        adFormPrice.setAttribute('min', 0);
        adFormPrice.setAttribute('placeholder', 0);
        break;
      case 'house':
        adFormPrice.value = false;
        adFormPrice.setAttribute('min', 5000);
        adFormPrice.setAttribute('placeholder', 5000);
        break;
      case 'palace':
        adFormPrice.value = false;
        adFormPrice.setAttribute('min', 10000);
        adFormPrice.setAttribute('placeholder', 10000);
        break;
    }
  };

  // синхронизация времени
  // слушает инпут и в output записывает текущее значение
  timeInInput.addEventListener('change', function (evt) {
    timeOutInput.value = evt.target.value;
  });

  timeOutInput.addEventListener('change', function (evt) {
    timeInInput.value = evt.target.value;
  });

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

  // слушает изменения в поле тип жилья
  typeInputElement.addEventListener('change', setPriceOfType);

  // заполняет цену
  adFormPrice.value = false;
  adFormPrice.setAttribute('min', 1000);
  adFormPrice.setAttribute('placeholder', 1000);

})();
