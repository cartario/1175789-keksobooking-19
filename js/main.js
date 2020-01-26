'use strict';

document.querySelector('.map').classList.remove('map--faded');

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

var titles = ['Красивая уютная квартира',
  'Большой загородный дом',
  'Обычный серый дом',
  'Огромный золотой дворец',
  'Уютная семейная квартирка',
  'Стандартный деревянный дом',
  'Нестандартный дом из кирпича',
  'Загородный коттедж'];

var description = ['Описание1', 'Описание2',
  'Описание3',
  'Описание4',
  'Описание5',
  'Описание6',
  'Описание7',
  'Описание8'];

var type = ['palace', 'flat', 'house', 'bungalo'];

var checkin = ['12:00', '13:00', '14:00',
  '12:00', '13:00', '14:00', '12:00', '13:00'];

var checkout = ['13:00', '14:00',
  '12:00', '13:00', '14:00', '12:00', '13:00', '14:00'];

var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner', 'elevator', 'conditioner'];

var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var prices = function () {
  return Math.floor(Math.random() * 1000);
};

var room = function () {
  return Math.floor(Math.random() * 10);
};

var guests = function () {
  return Math.floor(Math.random() * 15);
};

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var locationX = [
  getRandom (130, 630),
  getRandom (130, 630),
  getRandom (130, 630),
  getRandom (130, 630),
  getRandom (130, 630),
  getRandom (130, 630),
  getRandom (130, 630),
  getRandom (130, 630)];

var locationY = [
  getRandom (130, 630),
  getRandom (130, 630),
  getRandom (130, 630),
  getRandom (130, 630),
  getRandom (130, 630),
  getRandom (130, 630),
  getRandom (130, 630),
  getRandom (130, 630)];

for (var i = 0; i < 9; i++) {
  var adObj = {author: AVATAR[i],
    title: titles[i],
    type: type[i],
    checkin: checkin[i],
    checkout: checkout[i],
    features: features[i],
    price: prices(),
    room: room(),
    guests: guests(),
    description: description[i],
    photos: photos[i],
    location: {x: locationX[i], y: locationY[i]}
  };
  console.log(adObj);
}
