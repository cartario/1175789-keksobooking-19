'use strict';

(function () {

  var typeOfCard = {
    palace: 'Дворец',
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };

  // отрисовка popup
  var renderPopup = function (data) {

    // находит попап
    var popupTemplate = document.querySelector('#card')
      .content
      .querySelector('.map__card');

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
      if (evt.keyCode === window.main.ESC_KEYCODE) {
        popup.classList.add('hidden');
        document.removeEventListener('keydown', onPopupCloseKeydown);
      }
    };

    document.addEventListener('keydown', onPopupCloseKeydown);


    // наполнение данными

    popup.querySelector('.popup__title').textContent = data.offer.title;
    popup.querySelector('.popup__text--address').textContent = data.offer.address;
    popup.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
    popup.querySelector('.popup__type').textContent = typeOfCard[data.offer.type];
    popup.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для '
      + data.offer.guests + ' гостей';
    popup.querySelector('.popup__text--time').textContent = 'Заезд после' + data.offer.checkin
      + ', выезд до' + data.offer.checkout;
    popup.querySelector('.popup__features').textContent = '';
    popup.querySelector('.popup__description').textContent = data.offer.description;
    popup.querySelector('.popup__avatar').src = data.author.avatar;
    popup.querySelector('.popup__features').textContent = '';
    popup.querySelector('.popup__photos').textContent = '';

    // добавляет фичи
    for (var i = 0; i < data.offer.features.length; i++) {
      var featuresItem = document.createElement('li');
      popup.querySelector('.popup__features').appendChild(featuresItem);
      featuresItem.classList.add('feature', 'feature--' + data.offer.features[i]);
    }

    // отрисовка фоток
    for (var k = 0; k < data.offer.photos.length; k++) {

      // в ней фото
      var image = document.createElement('img');
      // добавляет фото в строку

      popup.querySelector('.popup__photos').appendChild(image);
      // присваивает каждой фотке адрес
      image.src = data.offer.photos[k];
      // задает размеры картинок
      image.width = 40;
      image.height = 40;
    }

    // отрисовка фрагмента
    var popupFragment = document.createDocumentFragment();
    popupFragment.appendChild(popup);
    window.map.map.appendChild(popupFragment);

    // вставляет попап перед блоком
    window.map.map.insertBefore(popup, document.querySelector('.map__filters-container'));
  };

  window.card = {
    renderPopup: renderPopup
  };

})();
