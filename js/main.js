'use strict';

var map = document.querySelector('.map');


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

var typeOfCard = {
  palace: 'Дворец',
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом'
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


// var onEscDown = function (evt) {
//   if (evt.keyCode === 27) {
//     console.log('esc');
//   }
// };

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

// поиск и наполнение инфой метки
var createPinMap = function (pinData) {

  // var similarListElement = document.querySelector('.map__pins');// находит блок куда вставлять
  var similarPinTemplate = document.querySelector('#pin')// находит шаблон и его внут.блок
    .content
    .querySelector('.map__pin');
  var pinElement = similarPinTemplate.cloneNode(true);
  pinElement.querySelector('img').src = pinData.author.avatar;
  pinElement.querySelector('img').alt = pinData.offer.description;
  pinElement.style.left = pinData.location.x + 'px'; // в узле .map__pin заполняет данные в style.left (x) из locationX
  pinElement.style.top = pinData.location.y + 'px';

  // слушает метку и отрисовывает popup с данными выбранной метки
  pinElement.addEventListener('click', function () {
    var mapCardRemovable = map.querySelector('.map__card');

    // удаляет попап, если уже есть
    if (mapCardRemovable) {
      mapCardRemovable.remove();
    }

    // собственно отрисовка
    renderPopup(pinData);
  });
  return pinElement;
};


// отрисовка меток
var renderPinMaps = function (array) {
  var mapPins = document.querySelector('.map__pins');
  var mapPinsFragment = document.createDocumentFragment();

  // пробегает по каждому обьявлению из массива
  for (var j = 0; j < array.length; j++) {

    // во фрагмент добавляет метку с данными из массива
    mapPinsFragment.appendChild(createPinMap(array[j]));
  }
  // добавляет фрагмент на страницу
  mapPins.appendChild(mapPinsFragment);
};

// ф-я активации запускает ф-ю отрисовки меток
// ф-я отрисовки меток (параметр - массив данных), пробегает по массиву данных и добавляет фрагмент каждого
// обьявления - запускает ф-ю создания метки
// 1.ф-я создание метки (параметр - данные одной метки),
// внутри функции устаноывлен обработчик, на клик по метке, который запускает ф-ю отрисовки картчки с тем же параметром
// 2.ф-я отрисовки карточки (параметр - массив данных), внутри есть цикл по массиву данных

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
  for (var j = 0; j < TOTAL_ADVERTS; j++) {
    popup.querySelector('.popup__title').textContent = data.offer.title;
    popup.querySelector('.popup__text--address').textContent = data.offer.address;
    popup.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
    popup.querySelector('.popup__type').textContent = typeOfCard[data.offer.type];
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
  renderPinMaps(adverts);

  // активирует инпуты
  setDisactiveMode(false);

  // отрисовывает метки
  renderPinMaps(adverts);
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
  var x = MainPin.offsetLeft + PIN.WIDTH / 2;
  var y = MainPin.offsetTop + PIN.HEIGHT;
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
