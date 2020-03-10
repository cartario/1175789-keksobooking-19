'use strict';

(function () {

  var ESC_KEYCODE = 27;
  // заполняет адрес
  var addressInput = document.querySelector('#address');
  addressInput.value = window.map.getMainPinCoord();
  addressInput.setAttribute('readonly', 'readonly');

  var messageFragment = function (template) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(template);
    window.map.map.appendChild(fragment);
    window.form.onResetClick();

  };

  var onCloseMessage = function (template) {

    var onEscMessage = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        template.remove();
        document.removeEventListener('keydown', onEscMessage);
      }
    };

    var onEscClick = function () {
      template.remove();
      document.removeEventListener('click', onEscClick);
    };

    document.addEventListener('keydown', onEscMessage);
    document.addEventListener('click', onEscClick);

    var errorButton = document.querySelector('.error__button');
    if (errorButton) {
      errorButton.addEventListener('click', onEscClick);
    }

  };


  var setSuccessMessage = function () {
    var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

    messageFragment(successTemplate);
    onCloseMessage(successTemplate);
  };

  var setErrorMessage = function () {
    var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');


    messageFragment(errorTemplate);
    onCloseMessage(errorTemplate);


  };

  window.main = {
    addressInput: addressInput,
    ESC_KEYCODE: ESC_KEYCODE,
    setSuccessMessage: setSuccessMessage,
    setErrorMessage: setErrorMessage
  };

})();
