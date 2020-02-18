'use strict';

(function () {

  // заполняет адрес
  var addressInput = document.querySelector('#address');
  addressInput.value = window.map.getMainPinCoord();

  window.main = {
    addressInput: addressInput
  };
})();
