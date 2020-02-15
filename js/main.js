'use strict';

var map = document.querySelector('.map');

// отрисовка popup
var renderPopup = function (data) {

  // находит попап
  var popupTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup');

  // клонирование шаблона
  var popup = popupTemplate.cloneNode(true);

  // закрытвает попап
  var popupClose = popup.querySelector('.popup__close');

  // по клику
  var onPopupCloseClick = function () {
    popup.remove();
    popupClose.removeEventListener('click', onPopupCloseClick);
  };
  popupClose.addEventListener('click', onPopupCloseClick);

  // по esc
  var onPopupCloseKeydown = function (evt) {
    if (evt.keyCode === 27) {
      popup.classList.add('hidden');
      document.removeEventListener('keydown', onPopupCloseKeydown);
    }
  };
  document.addEventListener('keydown', onPopupCloseKeydown);


  // наполнение данными
  for (var j = 0; j < window.data.TOTAL_ADVERTS; j++) {
    popup.querySelector('.popup__title').textContent = data.offer.title;
    popup.querySelector('.popup__text--address').textContent = data.offer.address;
    popup.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
    popup.querySelector('.popup__type').textContent = window.data.typeOfCard[data.offer.type];
    popup.querySelector('.popup__text--capacity').textContent = data.offer.room + ' комнаты для '
      + data.offer.guests + ' гостей';
    popup.querySelector('.popup__text--time').textContent = 'Заезд после' + data.offer.checkin
      + ', выезд до' + data.offer.checkout;
    popup.querySelector('.popup__features').textContent = '';
    popup.querySelector('.popup__description').textContent = data.offer.description;
    popup.querySelector('.popup__avatar').src = data.author.avatar;

    popup.querySelector('.popup__features').textContent = '';

    // добавляет фичи
    for (var i = 0; i < data.offer.features.length; i++) {
      var featuresItem = document.createElement('li');
      popup.querySelector('.popup__features').appendChild(featuresItem);
      featuresItem.classList.add('feature', 'feature--' + data.offer.features[i]);
    }

    // отрисовка фоток
    var popupPhotoTemplate = popup.querySelector('.popup__photo');
    popupPhotoTemplate.src = data.offer.photos[0];
  }

  // отрисовка фрагмента
  var popupFragment = document.createDocumentFragment();
  popupFragment.appendChild(popup);
  map.appendChild(popupFragment);

  // вставляет попап перед блоком
  map.insertBefore(popup, document.querySelector('.map__filters-container'));
};

// // создает фотки в карточке
// var createfragmentPhoto = function (data) {

//   // что и куда вставлять
//   var popupPhoto = document.querySelector('.popup__photo');
//   var popupPhotos = document.querySelector('.popup__photos');

//   for (var k = 1; k < PHOTOS.length; k++) {
//     // клонирует и присваивает каждой копии фотку
//     var popupPhotoItem = popupPhoto.cloneNode(true);
//     popupPhotoItem.src = data.offer.photos[k];

//     // создает фрагмент и отрисовывает
//     var photoFragment = document.createDocumentFragment();
//     photoFragment.appendChild(popupPhotoItem);
//     popupPhotos.appendChild(photoFragment);
//   }
// };

// createfragmentPhoto(adverts[0]);

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
  return '{{' + x + '}}, {{' + y + '}}';
};

// заполняет адрес
document.querySelector('#address').value = getMainPinCoord();

// enter на главной метке
var onMainPinEnter = function (evt) {
  if (evt.key === 'Enter') {
    setActiveMode();
    MainPin.removeEventListener('keydown', onMainPinEnter);
  }
};
MainPin.addEventListener('keydown', onMainPinEnter);


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
