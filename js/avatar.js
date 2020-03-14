'use strict';
(function () {

  // create module8-task2
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var ImageParams = {
    WIDTH: 70,
    HEIGHT: 70
  };

  var inputAvatar = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');

  var inputPhoto = document.querySelector('#images');
  var previewPhoto = document.querySelector('.ad-form__photo');
  var photoList = document.createElement('ul');
  previewPhoto.appendChild(photoList);
  photoList.style.margin = 0;
  photoList.style.padding = 0;

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
    // каждый раз создает картинку и добавляет ее в список
    var image = document.createElement('img');
    image.width = ImageParams.WIDTH;
    image.height = ImageParams.HEIGHT;

    photoList.appendChild(image);

    var file = inputPhoto.files[0];

    var fileName = file.name.toLowerCase();

    // соответствие
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      // присваивает картинке адрес
      createReader(image, file);
    }


    // inputPhoto.removeEventListener('change', onChangePhoto);
  };

  var loadPic = function (input, func) {
    input.addEventListener('change', func);
  };

  loadPic(inputAvatar, onChangeAvatar);
  loadPic(inputPhoto, onChangePhoto);


  window.avatar = {

  };

})();
