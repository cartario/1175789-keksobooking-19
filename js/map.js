'use strict';

(function () {

  var map = document.querySelector('.map');

  // лимиты рамки
  var dragLimit = {
    X: {
      MIN: 0,
      MAX: 1200
    },
    Y: {
      MIN: 130,
      MAX: 630
    }
  };

  var setDisactiveMode = function (bul) {
    var adFormFieldsets = document.querySelectorAll('fieldset');
    var mapFilters = document.querySelector('.map__filters').querySelectorAll('select');

    for (var i = 0; i < adFormFieldsets.length; i++) {
      adFormFieldsets[i].disabled = bul;
    }

    for (var j = 0; j < mapFilters.length; j++) {
      mapFilters[j].disabled = bul;
    }
  };

  // деактивирует инпуты
  setDisactiveMode(true);

  var setActiveMode = function () {

    // удаляет класс
    map.classList.remove('map--faded');

    var adForm = document.querySelector('.ad-form');
    adForm.classList.remove('ad-form--disabled');

    // отрисовывает метки
    window.pin.renderPinMaps(window.data.adverts);

    // активирует инпуты
    setDisactiveMode(false);

    // отрисовывает метки
    window.pin.renderPinMaps(window.data.adverts);
  };

  // события

  // клик по главной метке
  var MainPin = map.querySelector('.map__pin--main');
  var onMainPinClick = function () {
    setActiveMode();
    MainPin.removeEventListener('mousedown', onMainPinClick);
  };
  MainPin.addEventListener('mousedown', onMainPinClick);

  // координаты главной метки
  var getMainPinCoord = function () {
    var x = MainPin.offsetLeft + window.data.PIN.WIDTH / 2;
    var y = MainPin.offsetTop + window.data.PIN.HEIGHT;
    return x + ', ' + y;
  };


  // enter на главной метке
  var onMainPinEnter = function (evt) {
    if (evt.key === 'Enter') {
      setActiveMode();
      MainPin.removeEventListener('keydown', onMainPinEnter);
    }
  };
  MainPin.addEventListener('keydown', onMainPinEnter);

  // перетаскивание
  MainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    // стартовые координаты метки
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };


    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      // расчитывает сдвиг
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      // перезаписывает стартовые координаты
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      // задает метке новые координаты
      var newCoords = {
        x: MainPin.offsetLeft - shift.x,
        y: MainPin.offsetTop - shift.y
      };


      // проверяет границы
      var checkCoords = function (coords) {
        if (coords.x < dragLimit.X.MIN) {
          coords.x = window.data.PIN.WIDTH / 2;
        }
        if (coords.x > dragLimit.X.MAX - window.data.PIN.WIDTH) {
          coords.x = dragLimit.X.MAX - window.data.PIN.WIDTH;
        }
        if (coords.y < dragLimit.Y.MIN) {
          coords.y = dragLimit.Y.MIN;
        }
        if (coords.y > dragLimit.Y.MAX) {
          coords.y = dragLimit.Y.MAX;
        }
        return coords;
      };

      // перезаписывает росле проверки
      newCoords = checkCoords(newCoords);

      // добавляет в атрибуты новые координаты
      // var mainPinPosition = {
      MainPin.style.left = newCoords.x + 'px';
      MainPin.style.top = newCoords.y + 'px';
      // };

      var setAddress = function (coords) {
        window.main.addressInput.value = coords.x + ', ' + coords.y;
      };

      // устанавливает адрес в инпут
      setAddress(newCoords);

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);


  });

  window.map = {
    dragLimit: dragLimit,
    getMainPinCoord: getMainPinCoord,
    map: map,
    MainPin: MainPin
  };

})();
