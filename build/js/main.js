'use strict';

// Popup
(function () {
  var SCROLL_POSITION = 0;
  var ESCAPE = 27;

  var body = document.querySelector('body');

  var popup = document.querySelector('.modal');
  var form = popup.querySelector('.form--modal');
  var inputName = popup.querySelector('#callback-name');
  var inputTel = popup.querySelector('#callback-phone');
  var inputText = popup.querySelector('#callback-question');
  var submitButton = popup.querySelector('.form__button');


  var openTrigger = document.querySelector('.modal-trigger');
  var closeButton = popup.querySelector('.modal__close-button');
  var modalBack = document.querySelector('.modal-background');

  var isStorageSupport = true;
  var storage = {};

  try {
    storage.name = localStorage.getItem('name');
    storage.tel = localStorage.getItem('tel');
    storage.text = localStorage.getItem('text');

  } catch (err) {
    isStorageSupport = false;
  }

  form.addEventListener('submit', function () {
    if (isStorageSupport) {
      localStorage.setItem('name', inputName.value);
      localStorage.setItem('tel', inputTel.value);
      localStorage.setItem('text', inputText.value);
    }
  });

  function getBodyScrollTop() {
    return self.pageYOffset || (document.documentElement && document.documentElement.ScrollTop) || (document.body && document.body.scrollTop);
  }

  function closeModal() {
    popup.classList.remove('modal--opened');
    modalBack.classList.remove('modal-background--opened');
    popup.classList.add('modal--closed');
    modalBack.classList.add('modal-background--closed');

    modalBack.removeEventListener('click', closeModal);
    closeButton.removeEventListener('click', closeModal);

    openTrigger.addEventListener('click', openModal);

    body.classList.remove('body-lock');
    window.scrollTo(SCROLL_POSITION, body.dataset.scrollY);
  }

  function openModal() {
    popup.classList.add('modal--opened');
    modalBack.classList.remove('modal-background--closed');
    popup.classList.add('modal--opened');
    modalBack.classList.remove('modal-background--closed');

    if (isStorageSupport) {
      inputName.value = storage.name;
      inputTel.value = storage.tel;
      inputText.value = storage.text;
      submitButton.focus();
    }

    inputName.focus();

    modalBack.addEventListener('click', closeModal);
    closeButton.addEventListener('click', closeModal);

    openTrigger.removeEventListener('click', openModal);

    body.dataset.scrollY = getBodyScrollTop();
    body.classList.add('body-lock');
    body.style.top = '-' + body.dataset.scrollY + 'px';
  }

  openTrigger.addEventListener('click', openModal);

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESCAPE) {
      closeModal();
    }
  });
})();

// Accordion
(function () {
  var navigationToggler = document.querySelector('.footer__toggler--nav');
  var contactsToggler = document.querySelector('.footer__toggler--contacts');

  var navigationBlock = document.querySelector('.footer__navigation-list');
  var contactsBlock = document.querySelector('.footer__contacts-text');

  function toggleBlock(toggler, block) {
    toggler.addEventListener('click', function () {
      if (toggler.classList.contains('footer__toggler--off') && block.classList.contains('accordion--off')) {
        block.classList.remove('accordion--off');
        toggler.classList.remove('footer__toggler--off');
      } else {
        block.classList.add('accordion--off');
        toggler.classList.add('footer__toggler--off');
      }
    });
  }

  toggleBlock(navigationToggler, navigationBlock);
  toggleBlock(contactsToggler, contactsBlock);
})();

// iMask
(function () {
  window.iMaskJS(document.querySelector('#questions-phone'), {mask: '+{7}(000)000-00-00'});
  window.iMaskJS(document.querySelector('#callback-phone'), {mask: '+{7}(000)000-00-00'});
})();
