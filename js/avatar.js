'use strict';
(function () {

  // create module8-task2
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var inputAvatar = document.querySelector('.ad-form__field input[type=file]');


  var inputPhoto = document.querySelector('#images');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var previewPhoto = document.querySelector('.ad-form__photo');

  inputAvatar.setAttribute('accept', 'image/png, image/jpeg');
  inputPhoto.setAttribute('accept', 'image/png, image/jpeg');


  var onChangePic = function () {
    var file = inputAvatar.files[0];
    var fileName = file.name.toLowerCase();

    // соответствие
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {

      // читает файл
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewAvatar.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
    inputAvatar.removeEventListener('change', onChangePic);
  };

  var loadPic = function (input) {
    input.addEventListener('change', onChangePic);
  };

  loadPic(inputAvatar);


  window.avatar = {

  };

})();
