(function () {
  'use strict';

  const tablet = window.matchMedia('(min-width: 768px)');

  if (tablet.matches) {
    let switchMaps = new function () {
      const items = document.querySelectorAll('.stores__item');
      const values = document.querySelectorAll('.stores__frame--map');
      let keys = [];

      items.forEach(item => {
        keys.push(item);
      });

      function clearActive () {
        keys.forEach(item => {
          if (item.classList.contains('stores__item--active')) {
            item.classList.remove('stores__item--active');
          }
        });

        values.forEach(item => {
          if (item.classList.contains('stores__frame--active')) {
            item.classList.remove('stores__frame--active');
          }
        });
      }

      function switchContent (evt) {
        if (!evt.currentTarget.classList.contains('stores__item--active')) {
          clearActive();
          evt.currentTarget.classList.add('stores__item--active');
          if (!evt.currentTarget.classList.contains('stores__item--eng')) {
            values[keys.indexOf(evt.currentTarget)].classList.add('stores__frame--active');
          }
        }
      }

      keys.forEach(item => {
        item.addEventListener('click', switchContent);
      });
    }
  }

})();
