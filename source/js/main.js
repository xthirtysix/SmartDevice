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
  } catch (error) {
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

  function existVerticalScroll() {
    return document.body.offsetHeight > window.innerHeight;
  }

  function closeModal() {
    popup.classList.remove('modal--opened');
    modalBack.classList.remove('modal-background--opened');
    popup.classList.add('modal--closed');
    modalBack.classList.add('modal-background--closed');

    modalBack.removeEventListener('click', closeModal);
    closeButton.removeEventListener('click', closeModal);

    openTrigger.addEventListener('click', openModal);

    if (existVerticalScroll()) {
      body.classList.remove('body-lock');
      window.scrollTo(SCROLL_POSITION, body.dataset.scrollY);
    }
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

    if (existVerticalScroll()) {
      body.classList.add('body-lock');
      body.style.top = '-' + body.dataset.scrollY + 'px';
    }
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
  var ENTER = 13;
  var accordions = document.querySelectorAll('.accordion');
  var accordionTogglers = document.querySelectorAll('.accordion__toggler');

  function toggleAccordion(toggler) {
    function toggle() {
      var accordion = toggler.parentElement;

      if (accordion.classList.contains('accordion--off')) {
        for (var i = 0; i < accordions.length; i++) {
          if (!accordions[i].classList.contains('accordion--off')) {
            accordions[i].classList.add('accordion--off');
          }
        }
        accordion.classList.remove('accordion--off');
      } else {
        accordion.classList.add('accordion--off');
      }
    }

    toggler.addEventListener('click', toggle);
    toggler.addEventListener('keypress', function (evt) {
      if (evt.keyCode === ENTER) {
        toggle();
      }
    });
  }

  accordionTogglers.forEach(function (toggler) {
    toggleAccordion(toggler);
  });

  window.addEventListener('resize', function () {
    if (window.matchMedia('(max-width: 767px)').matches) {
      accordionTogglers.forEach(function (toggler) {
        toggler.tabIndex = 0;
      });
    } else {
      accordionTogglers.forEach(function (toggler) {
        toggler.tabIndex = -1;
      });
    }
  });
})();

// iMask
(function () {
  window.iMaskJS(document.querySelector('#questions-phone'), {mask: '+{7}(000)000-00-00'});
  window.iMaskJS(document.querySelector('#callback-phone'), {mask: '+{7}(000)000-00-00'});
})();
