'use strict';

var TOTAL_ADVERTS = 8;

var AVATAR = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
];

var TITLES = ['Красивая уютная квартира',
  'Большой загородный дом',
  'Обычный серый дом',
  'Огромный золотой дворец',
  'Уютная семейная квартирка',
  'Стандартный деревянный дом',
  'Нестандартный дом из кирпича',
  'Загородный коттедж'];

var DESCRIPTION = ['Самая привлекательное жилье', 'Больше только у Леди Гаги',
  'С яркими стенами внутри',
  'С золотым унитазом',
  'С бассейном блекджеком и футбольным полем',
  'Пожароустойчив и вообще норм',
  'Лучшее предложение этой зимы',
  'Загороднее только в Туле'];

var TYPE = ['palace', 'flat', 'house', 'bungalo'];

var CHECKIN = ['12:00', '13:00', '14:00'];

var CHECKOUT = ['12:00', '13:00', '14:00'];

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner', 'elevator', 'conditioner'];

var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var PIN = {
  WIDTH: 50,
  HEIGHT: 70
};

var PRICE = {MIN: 500, MAX: 5000};

var getPrices = function (min, max) {
  return Math.floor(Math.random() * (max / 100 - min / 100) + min / 100) * 100;
};

var getRoom = function () {
  return Math.floor(Math.random() * 5 + 1);
};

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var X_LOCATION_START = 1;
var X_LOCATION_END = 1200;
var Y_LOCATION_START = 130;
var Y_LOCATION_END = 630;

var createAdvert = function (j) { //  создает структуру одного обьявления

  var RandomAdvert = {author: AVATAR[j],
    title: TITLES[j],
    type: TYPE[getRandomInteger(0, TYPE.length)],
    checkin: CHECKIN[getRandomInteger(0, CHECKIN.length)],
    checkout: CHECKOUT[getRandomInteger(0, CHECKOUT.length)],
    features: FEATURES[getRandomInteger(0, FEATURES.length)],
    price: getPrices(PRICE.MIN, PRICE.MAX),
    room: getRoom(),
    guests: getRoom() * 2 + 1,
    description: DESCRIPTION[j],
    photos: PHOTOS[getRandomInteger(0, PHOTOS.length)],
    location: {x: getRandomInteger(X_LOCATION_START, X_LOCATION_END) - PIN.WIDTH / 2, y: getRandomInteger(Y_LOCATION_START, Y_LOCATION_END) - PIN.HEIGHT}
  };
  RandomAdvert.address = RandomAdvert.location.x + ', ' + RandomAdvert.location.y;
  return RandomAdvert;
};

var Adverts = [];// создает пустой массив
for (var k = 0; k < TOTAL_ADVERTS; k++) {
  Adverts[k] = createAdvert(k);// создает структуру обьявлений и записывает в нее данные
}

var similarListElement = document.querySelector('.map__pins');// находит блок куда вставлять
var similarPinTemplate = document.querySelector('#pin')// находит шаблон и его внут.блок
  .content
  .querySelector('.map__pin');

var createPinMap = function (pinData) { // создает структуру одной метки
  var pinElement = similarPinTemplate.cloneNode(true);
  pinElement.querySelector('img').src = pinData.author; // в узле .map__pin находит тег img и заполняет данные в src из AVATAR
  pinElement.querySelector('img').alt = pinData.description;
  pinElement.style.left = pinData.location.x + 'px'; // в узле .map__pin заполняет данные в style.left (x) из locationX
  pinElement.style.top = pinData.location.y + 'px';
  return pinElement;
};

var similarCardElement = document.querySelector('.map');// находит блок куда вставлять
var CardTemplate = document.querySelector('#card')// находит шаблон и его внут.блок
  .content
  .querySelector('.map__card');

var renderPopupPhotos = function (data) {
  var popupPhotoElement = popupPhotoTemplate.cloneNode(true);
  popupPhotoElement.src = data.photos;
  return popupPhotoElement;
};

var CardElement = CardTemplate.cloneNode(true);// клонирует шаблон
CardElement.querySelector('.popup__title').textContent = createAdvert(4).title;
CardElement.querySelector('.popup__text--address').textContent = createAdvert(0).address;
CardElement.querySelector('.popup__text--price').textContent = createAdvert(0).price + '₽/ночь';
CardElement.querySelector('.popup__type').textContent = createAdvert(0).type;
CardElement.querySelector('.popup__text--capacity').textContent = createAdvert(0).room + ' комнаты для ' + createAdvert(0).guests + ' гостей';
CardElement.querySelector('.popup__text--time').textContent = 'Заезд после' + createAdvert(0).checkin + ', выезд до' + createAdvert(0).checkout;
// CardElement.querySelector('.popup__features').textContent = createAdvert(0).features;
CardElement.querySelector('.popup__description').textContent = createAdvert(4).description;
CardElement.querySelector('.popup__avatar').src = createAdvert(0).author;

var popupPhotoTemplate = CardElement.querySelector('.popup__photo');
popupPhotoTemplate.src = createAdvert(0).photos;
var similarPopupPhotos = CardElement.querySelector('.popup__photos');// куда встявлять

var fragment = document.createDocumentFragment();
fragment.appendChild(renderPopupPhotos(createAdvert(0)));
fragment.appendChild(renderPopupPhotos(createAdvert(1)));
fragment.appendChild(renderPopupPhotos(createAdvert(2)));
similarPopupPhotos.appendChild(fragment);

// var renderPinMap = function (numAdvert) { // отрисовывает конкретное обьявление
//   var mapPinFragment = document.createDocumentFragment();
//   mapPinFragment.appendChild(createPinMap(Adverts[numAdvert]));
//   similarListElement.appendChild(mapPinFragment);
// };

var renderPinMaps = function () { // отрисовывает метки
  var mapPinsFragment = document.createDocumentFragment();
  for (var i = 0; i < Adverts.length; i++) {
    mapPinsFragment.appendChild(createPinMap(Adverts[i]));
  }
  similarListElement.appendChild(mapPinsFragment);
};

var mapFilters = document.querySelector('.map__filters');
var mapPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormHeader = adForm.querySelector('.ad-form-header');
var adFormElement = adForm.querySelectorAll('.ad-form__element');
var addressInput = document.querySelector('#address');
mapFilters.disabled = true;
adFormHeader.disabled = true;


var activateAdFormElement = function (bul) {
  for (var m = 0; m < adFormElement.length; m++) {
    adFormElement[m].disabled = bul;
  }
};

activateAdFormElement(true);

var activationForm = function () {
  document.querySelector('.map').classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  adFormHeader.disabled = false;
  mapFilters.disabled = false;
  activateAdFormElement(false);
  renderPinMaps();
  similarCardElement.appendChild(CardElement);
};

mapPinMain.addEventListener('mousedown', function () {
  activationForm();
});

var mapPinMainEnterHandler = function (evt) {
  if (evt.key === 'Enter') {
    activationForm();
    mapPinMain.removeEventListener('keydown', mapPinMainEnterHandler);
  }
};

mapPinMain.addEventListener('keydown', mapPinMainEnterHandler);

addressInput.value = createAdvert(getRandomInteger(0, TOTAL_ADVERTS)).address;
//
var adFormTitle = adForm.querySelector('#title');
var adFormPrice = adForm.querySelector('#price');

var roomsInputElement = adForm.querySelector('select[name="rooms"]');
var capacityInputElement = adForm.querySelector('select[name="capacity"]');

adFormTitle.required = true;
adFormPrice.required = true;

var setDisabledValue = function (elements, values) {
  for (var a = 0; a < elements.length; a++) {
    elements[a].disabled = false;
    if (values.indexOf(elements[a].value) > -1) {
      elements[a].disabled = true;
    }
  }

};

setDisabledValue(capacityInputElement, ['0', '2', '3']);

var availableCapacity = function () {
  var roomsInputValue = roomsInputElement.value;
  switch (roomsInputValue) {
    case '1':
      setDisabledValue(capacityInputElement, ['0', '2', '3']);
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

roomsInputElement.addEventListener('change', availableCapacity);
