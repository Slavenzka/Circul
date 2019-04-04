(function () {
  'use strict';

  const mobileMax = window.matchMedia('(max-width: 767px)');
  const mobileMin = window.matchMedia('(min-width: 768px)');
  const notebookMin = window.matchMedia('(min-width: 1260px)');
  const esc_key = 27;

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

      function openActiveSubmenu () {
        // Catch top level menu link click -> apply hidden class to top level content -> remove hidden class from required low level submenu
        topLvlLinks.forEach((item, index) => {
          item.addEventListener('click', function () {
            topLvl.classList.add('submenu__content--hidden');
            submenus.forEach(item => {
              item.classList.add('submenu__content--hidden');
            });
            submenus[index].classList.remove('submenu__content--hidden');
          });
        });
      }

      openActiveSubmenu();

      backBtns.forEach(btn => {
        btn.addEventListener('click', function () {
          topLvl.classList.remove('submenu__content--hidden');
          submenus.forEach(sub => {
            sub.classList.add('submenu__content--hidden');
          });
        });
      });
    }

    this.adaptToTabletPlus = function () {
      let triggers = header.querySelectorAll('.nav__item--trigger');
      let content = header.querySelector('.submenu');

      function cloneSubmenu (targetParent) {
        let contentArea = content.cloneNode(true);
        contentArea.classList.add('submenu--cloned');
        targetParent.appendChild(contentArea);
      }

      function hideAllCloned () {
        let allCloned = header.querySelectorAll('.submenu--cloned');
        allCloned.forEach(clone => clone.classList.remove('submenu--open'));
      }

      function restoreTriggerColor () {
        triggers.forEach(trigger => trigger.classList.remove('nav__item--selected'));
      }

      function restoreImages () {
        let allImages = header.querySelectorAll('.low-lvl__img');
        allImages.forEach(img => {
          img.style = 'display: none';
        });
      }

      function closeSubmenu () {
        let contentActive = header.querySelector('.submenu--open');
        if (contentActive) {
          contentActive.classList.remove('submenu--open');
          restoreTriggerColor();
          restoreImages();
          document.removeEventListener('click', checkCloseCondition);
        }
      }

      function checkCloseCondition (evt) {
        function processEscKey (evt) {
          if (evt.keyCode === esc_key) {
            closeSubmenu();
            document.removeEventListener('keydown', processEscKey);
          }
        }

        let contentActive = header.querySelector('.submenu--open');
        if (contentActive) {
          let classString = evt.target.className.split(' ').reduce((total, actual) => total += '.' + actual, '.' + evt.target.className.split(' ')[0]);
          if (!contentActive.querySelector(classString) &&
          (!evt.target.classList.contains('nav__link--men') && (!evt.target.classList.contains('nav__link--women')))) {
            closeSubmenu();
            document.removeEventListener('keydown', processEscKey);
          }
          if (evt.target.classList.contains('nav__link--men') || (evt.target.classList.contains('nav__link--women'))) {
            restoreImages();
          }

          document.addEventListener('keydown', processEscKey);
        }
      }

      function switchMenuImages (evt) {
        restoreImages();
        let targetImage = evt.currentTarget.querySelector('.low-lvl__img');

        if (targetImage) {
          targetImage.style = 'display: block';
        }
      }

      function toggleSubmenus (evt) {
        hideAllCloned();
        restoreTriggerColor();
        let item = evt.currentTarget;
        item.classList.add('nav__item--selected');

        let contentActive = item.querySelector('.submenu');
        contentActive.classList.add('submenu--open');

        let subitems = contentActive.querySelectorAll('.low-lvl__item');

        let contentItems = contentActive.querySelectorAll('.submenu__content');
        contentItems.forEach(item => item.classList.add('submenu__content--hidden'));

        if (item.classList.contains('nav__item--men')) {
          contentActive.querySelector('.submenu__content--men').classList.remove('submenu__content--hidden');
        }
        if (item.classList.contains('nav__item--women')) {
          contentActive.querySelector('.submenu__content--women').classList.remove('submenu__content--hidden');
        }

        if (notebookMin.matches) {
          subitems.forEach(sub => {
            sub.addEventListener('mouseover', switchMenuImages);
          });
        }

        document.addEventListener('click', checkCloseCondition);
      }

      triggers.forEach(item => {
        cloneSubmenu(item);
        item.addEventListener('click', toggleSubmenus);
      });
    }

    this.toggleBag = function () {
      const trigger = header.querySelector('.nav-shop__link--cart');
      const content = header.querySelector('.bag');
      const button = header.querySelector('.bag__close');

      function toggleClass () {
        content.classList.toggle('bag--opened');
        trigger.classList.toggle('link--active');
      }

      function removeClass() {
        content.classList.remove('bag--opened');
        trigger.classList.remove('link--active');
      }

      trigger.addEventListener('click', toggleClass);
      document.addEventListener('click', function (evt) {
        if (evt.target === button ||
          evt.target.classList.contains('bag__btn') || evt.target.classList.contains('bag--opened') ||
          evt.target.classList.contains('nav__link') ||
          evt.target.classList.contains('nav-shop__link--fav')) {
          removeClass();
        }
      });

      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === esc_key) {
          removeClass();
        }
      });
    }
  }

  var mainMenu = new OperateMenu;

  if (mobileMax.matches) {
    mainMenu.toggleMenu();
    mainMenu.changeMenuLvl();
  }

  if (mobileMin.matches) {
    mainMenu.adaptToTabletPlus();
  }

  mainMenu.toggleBag();
})();
