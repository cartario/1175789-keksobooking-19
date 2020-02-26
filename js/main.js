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
  };

  var setErrorMessage = function () {
    var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
    var errorFragment = document.createDocumentFragment();
    errorFragment.appendChild(errorTemplate);
    window.map.map.appendChild(errorFragment);
  };

  window.main = {
    addressInput: addressInput,
    ESC_KEYCODE: ESC_KEYCODE,
    setSuccessMessage: setSuccessMessage,
    setErrorMessage: setErrorMessage
  };

})();
