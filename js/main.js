'use strict';

document.querySelector('.map').classList.remove('map--faded');





for (var i = 1; i <= 8; i++) {
  var AUTHOR = {avatar: 'img/avatars/user0' + i + '.png'};
}

var titles = ['Красивая уютная квартира',
      'Большой загородный дом',
      'Обычный серый дом',
      'Огромный золотой дворец',
      'Уютная семейная квартирка',
      'Стандартный деревянный дом',
      'Нестандартный дом из кирпича',
      'Загородный коттедж'];

var prices = function () {
  return Math.floor(Math.random() * 1000);
};

var type = ['palace',
      'flat',
      'house',
      'bungalo'];

var room = function () {
  return Math.floor(Math.random() * 10);
};

var guests = function () {
  return Math.floor(Math.random() * 15);
};

var checkin = ['12:00', '13:00', '14:00'];

var checkout = ['12:00', '13:00', '14:00'];

var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var AdObj = {
  author: AUTHOR,
  offer: {
    title: titles,
    price: prices,

  },
  location: {x:, y: }
};
