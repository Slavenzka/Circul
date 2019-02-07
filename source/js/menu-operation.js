(function () {
  'use strict';

  const mobileMax = window.matchMedia('(max-width: 767px)');

  function OperateMenu () {
    const header = document.querySelector('.header');
    const triggerOpen = header.querySelector('.nav__link--menu');
    const triggerClose = header.querySelector('.submenu__btn');

    this.toggleMenu = function () {
      const headerContainer = header.querySelector('.header > .container');
      const mainContainer = document.querySelector('.main-container');
      const footerContainer = document.querySelector('.footer');

      function shiftBodyRight () {
        headerContainer.style.transform = "translateX(324px)";
        mainContainer.style.transform = "translateX(324px)";
        footerContainer.style.transform = "translateX(324px)";
      }

      function shiftBodyLeft () {
        headerContainer.style.transform = "translateX(0)";
        mainContainer.style.transform = "translateX(0)";
        footerContainer.style.transform = "translateX(0)";
      }

      triggerOpen.addEventListener('click', shiftBodyRight);
      triggerClose.addEventListener('click', shiftBodyLeft);
    }

    this.changeMenuLvl = function () {
      const submenus = header.querySelectorAll('.submenu__content:not(.submenu__content--top)');
      const topLvl = header.querySelector('.submenu__content--top');
      const topLvlLinks = header.querySelectorAll('.submenu__link--trigger');
      const backBtns = header.querySelectorAll('.submenu__back');

      topLvlLinks.forEach((item, index) => {
        item.addEventListener('click', function () {
          topLvl.classList.add('submenu__content--hidden');
          submenus.forEach(item => {
            item.classList.add('submenu__content--hidden');
          });
          submenus[index].classList.remove('submenu__content--hidden');
        });
      });

      backBtns.forEach(btn => {
        btn.addEventListener('click', function () {
          topLvl.classList.remove('submenu__content--hidden');
          submenus.forEach(sub => {
            sub.classList.add('submenu__content--hidden');
          });
        });
      });
    }
  }

  if (mobileMax.matches) {
    var mainMenu = new OperateMenu;
    mainMenu.toggleMenu();
    mainMenu.changeMenuLvl();
  }
})();
