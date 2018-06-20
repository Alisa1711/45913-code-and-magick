'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var setupModal = document.querySelector('.setup');
var userPic = document.querySelector('.setup-open');
var iconClose = setupModal.querySelector('.setup-close');
var userNameInput = setupModal.querySelector('.setup-user-name');
var setupWizard = setupModal.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardCoatInput = setupModal.querySelector('input[name=coat-color]');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var wizardEyesInput = setupModal.querySelector('input[name=eyes-color]');
var fireball = setupModal.querySelector('.setup-fireball-wrap');
var fireballInput = fireball.querySelector('input[name=fireball-color]');

var similiarWizards = new Array(4);
var firstNames = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var lastNames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var coatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var eyesColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
var fireballColors = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var getRandomProperty = function (property) {
  return property[Math.floor(Math.random() * property.length)];
};

var generateWizards = function (wizards, names, surnames, coats, eyes) {
  for (var i = 0; i < wizards.length; i++) {
    wizards[i] = {
      name: getRandomProperty(names) + ' ' + getRandomProperty(surnames),
      coatColor: getRandomProperty(coats),
      eyesColor: getRandomProperty(eyes)
    };
  }
  return wizards;
};

var renderWizard = function (wizard) {
  var wizardTemplate = document.querySelector('#similar-wizard-template').content
      .querySelector('.setup-similar-item');
  var similiarWizard = wizardTemplate.cloneNode(true);

  similiarWizard.querySelector('.setup-similar-label').textContent = wizard.name;
  similiarWizard.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  similiarWizard.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return similiarWizard;
};

var renderWizardsList = function (wizards) {
  var wizardsList = setupModal.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  wizardsList.appendChild(fragment);
};

generateWizards(similiarWizards, firstNames, lastNames, coatColors, eyesColors);
renderWizardsList(similiarWizards);
setupModal.querySelector('.setup-similar').classList.remove('hidden');

var changeFireballColor = function (elem, colors, input) {
  var currentColorIndex = colors.indexOf(input.value);
  if (currentColorIndex < colors.length - 1) {
    elem.style.backgroundColor = colors[currentColorIndex + 1];
    input.value = colors[currentColorIndex + 1];
  } else {
    elem.style.backgroundColor = colors[0];
    input.value = colors[0];
  }
};
var changeColor = function (elem, colors, input) {
  var currentColorIndex = colors.indexOf(input.value);
  if (currentColorIndex < colors.length - 1) {
    elem.style.fill = colors[currentColorIndex + 1];
  } else {
    elem.style.fill = colors[0];
  }
  input.value = elem.style.fill;
};
var openModal = function () {
  setupModal.classList.remove('hidden');
  document.addEventListener('keydown', onModalPressEsc);
};
var closeModal = function () {
  setupModal.classList.add('hidden');
  document.removeEventListener('keydown', onModalPressEsc);
};
var onModalPressEsc = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== userNameInput) {
    closeModal();
  }
};

userPic.addEventListener('click', openModal);
userPic.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openModal();
  }
});
iconClose.addEventListener('click', closeModal);
iconClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeModal();
  }
});
wizardCoat.addEventListener('click', function () {
  changeColor(wizardCoat, coatColors, wizardCoatInput);
});
wizardEyes.addEventListener('click', function () {
  changeColor(wizardEyes, eyesColors, wizardEyesInput);
});
fireball.addEventListener('click', function () {
  changeFireballColor(fireball, fireballColors, fireballInput);
});
