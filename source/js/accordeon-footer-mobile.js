(function () {
  'use strict';

  let mobile = window.matchMedia('(max-width: 767px)');

  let toggleAccordeon = new function () {
    let footer = document.querySelector('.footer');
    let items = footer.querySelectorAll('.footer__item');

    function clearAll () {
      items.forEach(item => {
        if (item.classList.contains('footer__item--opened')) {
          item.classList.remove('footer__item--opened');
        }
      });
    }

    this.operation = function () {
      clearAll();

      items.forEach(item => {
        item.addEventListener('click', function (evt) {
          // clearAll();
          if (!evt.target.classList.contains('footer__item--opened')) {
            clearAll();
          }
          evt.target.classList.toggle('footer__item--opened');
        });
      });
    }
  }

  if (mobile.matches) {
    toggleAccordeon.operation();
  }
})();
