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

var DESCRIPTION = ['Описание1', 'Описание2',
  'Описание3',
  'Описание4',
  'Описание5',
  'Описание6',
  'Описание7',
  'Описание8'];

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

var getPrices = function () {
  return Math.floor(Math.random() * 1000);
};

var getRoom = function () {
  return Math.floor(Math.random() * 10);
};

var getGuests = function () {
  return Math.floor(Math.random() * 15);
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
    price: getPrices(),
    room: getRoom(),
    guests: getGuests(),
    description: DESCRIPTION[j],
    photos: PHOTOS[getRandomInteger(0, PHOTOS.length)],
    location: {x: getRandomInteger(X_LOCATION_START, X_LOCATION_END) - PIN.WIDTH / 2, y: getRandomInteger(Y_LOCATION_START, Y_LOCATION_END) - PIN.HEIGHT}
  };
  RandomAdvert.address = RandomAdvert.location.x + ', ' + RandomAdvert.location.y;
  return RandomAdvert;
};

var similarListElement = document.querySelector('.map__pins');// находит блок куда вставлять
var similarPinTemplate = document.querySelector('#pin')// находит шаблон и его внут.блок
  .content
  .querySelector('.map__pin');

var similarCardElement = document.querySelector('.map');// находит блок куда вставлять
var CardTemplate = document.querySelector('#card')// находит шаблон и его внут.блок
  .content
  .querySelector('.map__card');

var CardElement = CardTemplate.cloneNode(true);// клонирует шаблон
CardElement.querySelector('.popup__title').textContent = createAdvert(0).title;
CardElement.querySelector('.popup__text--address').textContent = createAdvert(0).address;
CardElement.querySelector('.popup__text--price').textContent = createAdvert(0).price + '₽/ночь';
CardElement.querySelector('.popup__type').textContent = createAdvert(0).type;
CardElement.querySelector('.popup__text--capacity').textContent = createAdvert(0).room + 'комнаты для' + createAdvert(0).guests + 'гостей';
CardElement.querySelector('.popup__text--time').textContent = 'Заезд после' + createAdvert(0).checkin + ', выезд до' + createAdvert(0).checkout;
CardElement.querySelector('.popup__features').textContent = createAdvert(0).features;
CardElement.querySelector('.popup__description').textContent = createAdvert(0).description;
CardElement.querySelector('.popup__photos').src = createAdvert(0).photos[0];
CardElement.querySelector('.popup__avatar').src = createAdvert(0).author.AVATAR;

similarCardElement.appendChild(CardElement);

var createPinMap = function (pinData) { // создает структуру одной метки
  var pinElement = similarPinTemplate.cloneNode(true);
  pinElement.querySelector('img').src = pinData.author; // в узле .map__pin находит тег img и заполняет данные в src из AVATAR
  pinElement.querySelector('img').alt = pinData.description;
  pinElement.style.left = pinData.location.x + 'px'; // в узле .map__pin заполняет данные в style.left (x) из locationX
  pinElement.style.top = pinData.location.y + 'px';
  return pinElement;
};

var Adverts = [];// создает пустой массив
for (var k = 0; k < TOTAL_ADVERTS; k++) {
  Adverts[k] = createAdvert(k);// создает структуру обьявлений и записывает в нее данные
}

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

renderPinMaps();

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

};

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.which === 1) {
    activationForm();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    activationForm();
  }
});

addressInput.value = createAdvert(getRandomInteger(0, TOTAL_ADVERTS)).address;
