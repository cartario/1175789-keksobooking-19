'use strict';

(function () {

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
    for (var j = 0; j < window.data.TOTAL_ADVERTS; j++) {
      popup.querySelector('.popup__title').textContent = data.offer.title;
      popup.querySelector('.popup__text--address').textContent = data.offer.address;
      popup.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
      popup.querySelector('.popup__type').textContent = window.data.typeOfCard[data.offer.type];
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
    window.map.map.appendChild(popupFragment);

    // вставляет попап перед блоком
    window.map.map.insertBefore(popup, document.querySelector('.map__filters-container'));
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

  window.card = {
    renderPopup: renderPopup
  };

})();
