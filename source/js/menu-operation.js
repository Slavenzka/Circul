(function () {
  'use strict';

  function OperateMenu () {
    let header = document.querySelector('.header');
    let triggerOpen = header.querySelector('.nav__button--menu');
    let triggerClose = header.querySelector('.submenu__btn');

    this.openMenu = function () {
      let headerContainer = header.querySelector('.header > .container');
      let mainContainer = document.querySelector('.grid-main');
      let footerContainer = document.querySelector('.footer');

      function shiftBodyLeft () {
        headerContainer.style.transform = "translateX(324px)";
        mainContainer.style.transform = "translateX(324px)";
        footerContainer.style.transform = "translateX(324px)";
      }

      function shiftBodyRight () {
        headerContainer.style.transform = "translateX(0)";
        mainContainer.style.transform = "translateX(0)";
        footerContainer.style.transform = "translateX(0)";
      }

      triggerOpen.addEventListener('click', shiftBodyLeft);
      triggerClose.addEventListener('click', shiftBodyRight);
    }
  }

  var mainMenu = new OperateMenu;
  mainMenu.openMenu();
})();
