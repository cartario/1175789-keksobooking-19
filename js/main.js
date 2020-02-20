'use strict';

(function () {

  var ESC_KEYCODE = 27;
  // заполняет адрес
  var addressInput = document.querySelector('#address');
  addressInput.value = window.map.getMainPinCoord();

  window.main = {
    addressInput: addressInput,
    ESC_KEYCODE: ESC_KEYCODE
  };
})();
