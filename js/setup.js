'use strict';

var userDialog = document.querySelector('.setup');
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

var randomProperty = function (property) {
  return property[Math.floor(Math.random() * property.length)];
};

var generateWizards = function (wizards, names, surnames, coats, eyes) {
  for (var i = 0; i < wizards.length; i++) {
    var wizard = {};

    wizard.firstName = randomProperty(names);
    wizard.lastName = randomProperty(surnames);
    wizard.coatColor = randomProperty(coats);
    wizard.eyesColor = randomProperty(eyes);

    wizards[i] = wizard;
  }
  return wizards;
};

var renderWizard = function (wizard) {
  var wizardTemplate = document.querySelector('#similar-wizard-template').content
      .querySelector('.setup-similar-item');
  var similiarWizard = wizardTemplate.cloneNode(true);

  similiarWizard.querySelector('.setup-similar-label').textContent = wizard.firstName + ' ' + wizard.lastName;
  similiarWizard.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  similiarWizard.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;

  return similiarWizard;
};

var renderWizardsList = function (wizards) {
  var wizardsList = userDialog.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  wizardsList.appendChild(fragment);
};

userDialog.classList.remove('hidden');
generateWizards(similiarWizards, firstNames, lastNames, coatColors, eyesColors);
renderWizardsList(similiarWizards);
userDialog.querySelector('.setup-similar').classList.remove('hidden');
