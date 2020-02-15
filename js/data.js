'use strict';

(function () {

  // задает переменные и константы
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

  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var PIN = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var PRICE = {
    MIN: 500,
    MAX: 5000
  };

  var X_LOCATION_START = 1;
  var X_LOCATION_END = 1200;
  var Y_LOCATION_START = 130;
  var Y_LOCATION_END = 630;

  var typeOfCard = {
    palace: 'Дворец',
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };

  var getPrices = function (min, max) {
    return Math.floor(Math.random() * (max / 100 - min / 100) + min / 100) * 100;
  };

  var getRoom = function () {
    return Math.floor(Math.random() * 5 + 1);
  };

  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  // генерит случайный массив из неповторяющихся элементов
  var getShuffleArray = function (array) {
    // создает новый пустой массив
    var newArray = [];

    // копирует переданный массив с 0го элемента во временный массив
    var tempArray = array.slice(0);

    for (var i = tempArray.length - 1; i >= 0; i--) {

      // случайный id
      var randomId = getRandomInteger(0, tempArray.length);

      // добавляет в новый массив случайный элемент из временного массива
      newArray.push(tempArray[randomId]);

      // удаляет использованный эдемент из временного массива, во избежание повтора
      tempArray.splice(randomId, 1);
    }

    return newArray;

  };

  // удаляет из массива случайные элементы
  var getShuffleArraySmaller = function (array) {
    var newArray = array.slice(0);
    var randomId = getRandomInteger(0, array.length);
    newArray.splice(randomId, randomId);
    return newArray;
  };

  var generateRandomAdverts = function (amount) {
    var array = [];

    for (var i = 0; i < amount; i++) {

      // создает структуру одного обьявления
      var advert = {
        author: {avatar: AVATAR[getRandomInteger(0, AVATAR.length)]},
        offer: {
          title: TITLES[getRandomInteger(0, TITLES.length)],
          type: TYPE[getRandomInteger(0, TYPE.length)],
          checkin: CHECKIN[getRandomInteger(0, CHECKIN.length)],
          checkout: CHECKOUT[getRandomInteger(0, CHECKOUT.length)],
          features: getShuffleArraySmaller(FEATURES),
          price: getPrices(PRICE.MIN, PRICE.MAX),
          room: getRoom(),
          guests: getRoom() * 2 + 1,
          description: DESCRIPTION[getRandomInteger(0, DESCRIPTION.length)],
          photos: getShuffleArray(PHOTOS),
          address: 'location.x+location.y'},
        location: {
          x: getRandomInteger(X_LOCATION_START, X_LOCATION_END) - PIN.WIDTH / 2,
          y: getRandomInteger(Y_LOCATION_START, Y_LOCATION_END) - PIN.HEIGHT}
      };

      // добавляет обьявление с каждой итерации в массив
      array.push(advert);
    }

    // возвращает созданный массив наверх
    return array;
  };

  // генерит массив обьявдений
  var adverts = generateRandomAdverts(TOTAL_ADVERTS);

  window.data = {
    adverts: adverts,
    PIN: PIN,
    TOTAL_ADVERTS: TOTAL_ADVERTS,
    typeOfCard: typeOfCard
  };

})();
