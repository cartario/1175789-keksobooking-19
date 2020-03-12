'use strict';
(function () {

  // create module8-task2
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var ImageParams = {
    WIDTH: 70,
    HEIGHT: 70
  };

  var inputAvatar = document.querySelector('.ad-form__field input[type=file]');


  var inputPhoto = document.querySelector('#images');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var previewPhotoImage = document.createElement('img');
  previewPhotoImage.width = ImageParams.WIDTH;
  previewPhotoImage.height = ImageParams.HEIGHT;
  var previewPhoto = document.querySelector('.ad-form__photo').appendChild(previewPhotoImage);


  inputAvatar.setAttribute('accept', 'image/png, image/jpeg');
  inputPhoto.setAttribute('accept', 'image/png, image/jpeg');


  var createReader = function (preview, file) {
    var reader = new FileReader();

    reader.addEventListener('load', function (evt) {
      preview.src = evt.target.result;
    });

    reader.readAsDataURL(file);
  };

  var onChangeAvatar = function () {

    var file = inputAvatar.files[0];
    var fileName = file.name.toLowerCase();

    // соответствие
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      createReader(previewAvatar, file);
    }

    inputAvatar.removeEventListener('change', onChangeAvatar);
  };

  var onChangePhoto = function () {
    var file = inputPhoto.files[0];
    var fileName = file.name.toLowerCase();

    // соответствие
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      createReader(previewPhoto, file);
    }

    inputPhoto.removeEventListener('change', onChangePhoto);
  };

  var loadPic = function (input, func) {
    input.addEventListener('change', func);
  };

  loadPic(inputAvatar, onChangeAvatar);
  loadPic(inputPhoto, onChangePhoto);


  window.avatar = {

  };

})();
