'use strict';

document.querySelector('.map').classList.remove('map--faded');

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

var generateRandomAdverts = function (j) {

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
    location: {x: getRandomInteger(X_LOCATION_START, X_LOCATION_END), y: getRandomInteger(Y_LOCATION_START, Y_LOCATION_END)}
  };
  return RandomAdvert;
};

var similarListElement = document.querySelector('.map__pins');// находит блок куда вставлять


var similarPinTemplate = document.querySelector('#pin')// находит шаблон и его внут.блок
  .content
  .querySelector('.map__pin');

var CardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card')


console.log(CardTemplate);

for (var i = 0; i < TOTAL_ADVERTS; i++) { // создает, наполняет данными и отрисовывает 8 копий узлов .map__pin из шаблона #pin
  var pinElement = similarPinTemplate.cloneNode(true); // клонирует шаблон - создает узел с классом .map__pin
  pinElement.querySelector('img').src = generateRandomAdverts(i).author; // в узле .map__pin находит тег img и заполняет данные в src из AVATAR
  pinElement.querySelector('img').alt = generateRandomAdverts(i).description; // в узле .map__pin находит тег img и заполняет данные в alt из description
  pinElement.style.left = generateRandomAdverts(i).location.x + 'px'; // в узле .map__pin заполняет данные в style.left (x) из locationX
  pinElement.style.top = generateRandomAdverts(i).location.y + 'px'; // в узле .map__pin заполняет данные в style.top (y) из locationY
  similarListElement.appendChild(pinElement); // отрисовывает в блоке .map__pins созданный узел .map__pin
}

var cardElement = CardTemplate.cloneNode(true);
cardElement.querySelector('.popup__title').textContent = TITLES[0];

similarListElement.appendChild(cardElement);
