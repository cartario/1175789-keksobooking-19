'use strict';

//задает переменные и константы
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



var onEscDown = function (evt) {
  if (evt.keyCode === 27) {
    console.log('esc');
  }
};

// создает структуру одного обьявления
var generateAdvert = function (a) {
  var someAdvert = {
    author: AVATAR[a],
    offer: {
      title: TITLES[a],
      type: TYPE[getRandomInteger(0, TYPE.length)],
      checkin: CHECKIN[getRandomInteger(0, CHECKIN.length)],
      checkout: CHECKOUT[getRandomInteger(0, CHECKOUT.length)],
      features: FEATURES[getRandomInteger(0, FEATURES.length)],
      price: getPrices(PRICE.MIN, PRICE.MAX),
      room: getRoom(),
      guests: getRoom() * 2 + 1,
      description: DESCRIPTION[a],
      photos: PHOTOS[getRandomInteger(0, PHOTOS.length)] },
    location: {x: getRandomInteger(X_LOCATION_START, X_LOCATION_END) - PIN.WIDTH / 2, y: getRandomInteger(Y_LOCATION_START, Y_LOCATION_END) - PIN.HEIGHT}
  };
  someAdvert.address = someAdvert.location.x + ', ' + someAdvert.location.y;
  return someAdvert;
};

//создает массив обьявлений
var advertsArr = [];
  for (var b = 0; b < TOTAL_ADVERTS; b++) {
  advertsArr[b] = generateAdvert(b);
};


//поиск и отрисовка меток
var similarListElement = document.querySelector('.map__pins');// находит блок куда вставлять
var similarPinTemplate = document.querySelector('#pin')// находит шаблон и его внут.блок
  .content
  .querySelector('.map__pin');

// создает структуру одной метки
var createPinMap = function (pinData) {
  var pinElement = similarPinTemplate.cloneNode(true); //создает шаблон
  pinElement.querySelector('img').src = pinData.author; // в узле .map__pin находит тег img и заполняет данные в src из AVATAR
  pinElement.querySelector('img').alt = pinData.offer.description;
  pinElement.style.left = pinData.location.x + 'px'; // в узле .map__pin заполняет данные в style.left (x) из locationX
  pinElement.style.top = pinData.location.y + 'px';
  pinElement.addEventListener('click', function(){ //обработчик клика по метке

    var popup = document.querySelector('.popup');

      if(popup){ //удаляет попап, если есть он есть
        popup.remove();
      }
      createCard();//отрисовывает карточку обьявления
  });

  return pinElement;
};

// отрисовывает метки
var renderPinMaps = function () {
  var mapPinsFragment = document.createDocumentFragment();
  for (var i = 0; i < advertsArr.length; i++) {
    mapPinsFragment.appendChild(createPinMap(advertsArr[i]));
  }
  similarListElement.appendChild(mapPinsFragment);
};

//создает карточку обьявления
var createCard = function () {

  //создает шаблон
  var similarCardElement = document.querySelector('.map');// находит блок куда вставлять
  var CardTemplate = document.querySelector('#card')// находит шаблон и его внут.блок
    .content
    .querySelector('.map__card');
  var CardElement = CardTemplate.cloneNode(true);// клонирует шаблон


  CardElement.querySelector('.popup__title').textContent = generateAdvert(0).offer.title;
  CardElement.querySelector('.popup__text--address').textContent = generateAdvert(0).address;
  CardElement.querySelector('.popup__text--price').textContent = generateAdvert(0).offer.price + '₽/ночь';
  CardElement.querySelector('.popup__type').textContent = generateAdvert(0).offer.type;
  CardElement.querySelector('.popup__text--capacity').textContent = generateAdvert(0).offer.room + ' комнаты для ' + generateAdvert(0).offer.guests + ' гостей';
  CardElement.querySelector('.popup__text--time').textContent = 'Заезд после' + generateAdvert(0).offer.checkin + ', выезд до' + generateAdvert(0).offer.checkout;
  CardElement.querySelector('.popup__features').textContent = generateAdvert(0).features;
  CardElement.querySelector('.popup__description').textContent = generateAdvert(0).offer.description;
  CardElement.querySelector('.popup__avatar').src = generateAdvert(0).author;

  var popupPhotoTemplate = CardElement.querySelector('.popup__photo');
  var similarPopupPhotos = CardElement.querySelector('.popup__photos');// куда встявлять

  //создает шаблон фотки
  var createPopupPhoto = function (data) {
    var popupPhotoElement = popupPhotoTemplate.cloneNode(true);
    popupPhotoTemplate.src = generateAdvert(0).offer.photos;
    popupPhotoElement.src = data.offer.photos;
    return popupPhotoElement;
  };

  //отрисовка фоток
  var renderPopupPhotos = function(){
    var fragmentPhoto = document.createDocumentFragment();
    for (var i=0; i < 3; i++) {
      fragmentPhoto.appendChild(createPopupPhoto(generateAdvert(i)));
      similarPopupPhotos.appendChild(fragmentPhoto);
    }
  };

  renderPopupPhotos();

  //закрывает карточку по клику
  var closeCard = CardElement.querySelector('.popup__close');
    closeCard.addEventListener('click', function (){
    CardElement.remove();
  });

  //отрисовка карточки
  similarCardElement.appendChild(CardElement);
};

var mapFilters = document.querySelector('.map__filters');
mapFilters.disabled = true;
var mapPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormHeader = adForm.querySelector('.ad-form-header');
adFormHeader.disabled = true;
var adFormElement = adForm.querySelectorAll('.ad-form__element');
var addressInput = document.querySelector('#address');


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

mapPinMain.addEventListener('mousedown', function () {
  activationForm();
  renderPinMaps();
  createCard();
});

var mapPinMainEnterHandler = function (evt) {
  if (evt.key === 'Enter') {
    activationForm();
    renderPinMaps();
    createCard();
    mapPinMain.removeEventListener('keydown', mapPinMainEnterHandler);
  }
};

mapPinMain.addEventListener('keydown', mapPinMainEnterHandler);

addressInput.value = generateAdvert(getRandomInteger(0, TOTAL_ADVERTS)).address;
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
