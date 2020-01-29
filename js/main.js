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

var CHECKIN = ['12:00', '13:00', '14:00',
  '12:00', '13:00', '14:00', '12:00', '13:00'];

var CHECKOUT = ['13:00', '14:00',
  '12:00', '13:00', '14:00', '12:00', '13:00', '14:00'];

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

var locationX = [];
var locationY = [];

for (var k = 0; k < 8; k++) {
  locationX[k] = getRandomInteger(130, 630);
  locationY[k] = getRandomInteger(130, 630);
}

var generateRandomAdvert = {author: AVATAR,
  title: TITLES,
  type: TYPE,
  checkin: CHECKIN,
  checkout: CHECKOUT,
  features: FEATURES,
  price: getPrices(),
  room: getRoom(),
  guests: getGuests(),
  description: DESCRIPTION,
  photos: PHOTOS,
  location: {locationX: locationX, y: locationY}
};

// }


var similarListElement = document.querySelector('.map__pins');// находит блок куда вставлять

var similarPinTemplate = document.querySelector('#pin')// находит шаблон и его внут.блок
  .content
  .querySelector('.map__pin');

for (var i = 0; i < TOTAL_ADVERTS; i++) { // создает, наполняет данными и отрисовывает 8 копий узлов .map__pin из шаблона #pin
  var pinElement = similarPinTemplate.cloneNode(true); // клонирует шаблон - создает узел с классом .map__pin
  pinElement.querySelector('img').src = generateRandomAdvert.author[i]; // в узле .map__pin находит тег img и заполняет данные в src из AVATAR
  pinElement.querySelector('img').alt = DESCRIPTION[i]; // в узле .map__pin находит тег img и заполняет данные в alt из description
  pinElement.style.left = locationX[i] + 'px'; // в узле .map__pin заполняет данные в style.left (x) из locationX
  pinElement.style.top = locationY[i] + 'px'; // в узле .map__pin заполняет данные в style.top (y) из locationY
  similarListElement.appendChild(pinElement); // отрисовывает в блоке .map__pins созданный узел .map__pin
}
