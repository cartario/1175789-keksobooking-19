'use strict';

(function () {

  var ESC_KEYCODE = 27;
  // заполняет адрес
  var addressInput = document.querySelector('#address');
  addressInput.value = window.map.getMainPinCoord();
  addressInput.setAttribute('readonly', 'readonly');

  var setSuccessMessage = function () {
    var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
    var successFragment = document.createDocumentFragment();
    successFragment.appendChild(successTemplate);
    window.map.map.appendChild(successFragment);

    window.form.onResetClick();

    var onEscMessage = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        successTemplate.remove();
        document.removeEventListener('keydown', onEscMessage);
      }
    };

    var onEscClick = function () {
      successTemplate.remove();
      document.removeEventListener('click', onEscClick);
    };

    document.addEventListener('keydown', onEscMessage);
    document.addEventListener('click', onEscClick);
  };

  var setErrorMessage = function () {
    var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

    var errorButton = errorTemplate.querySelector('.error__button');
    var errorFragment = document.createDocumentFragment();
    errorFragment.appendChild(errorTemplate);
    window.map.map.appendChild(errorFragment);

    window.form.onResetClick();

    var onEscMessage = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        errorTemplate.remove();
        document.removeEventListener('keydown', onEscMessage);
      }
    };

    var onEscClick = function () {
      errorTemplate.remove();
      document.removeEventListener('click', onEscClick);
    };

    document.addEventListener('keydown', onEscMessage);
    document.addEventListener('click', onEscClick);
    errorButton.addEventListener('click', onEscClick);
  };

  window.main = {
    addressInput: addressInput,
    ESC_KEYCODE: ESC_KEYCODE,
    setSuccessMessage: setSuccessMessage,
    setErrorMessage: setErrorMessage
  };

})();
