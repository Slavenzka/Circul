(function () {
  'use strict';

  let operateModal = new function () {
    const mobileOnly = window.matchMedia('(max-width: 767px)');
    const notebook = window.matchMedia('(min-width: 1260px)');

    function listenModal (target, modal) {
      function closeSideMenu () {
        // Close side menu in mobile version when we click the modal trigger
        const header = document.querySelector('.header');
        const headerContainer = header.querySelector('.header > .container');
        const mainContainer = document.querySelector('.main-container');
        const footerContainer = document.querySelector('.footer');

        function shiftBodyLeft () {
          headerContainer.style.transform = "translateX(0)";
          mainContainer.style.transform = "translateX(0)";
          footerContainer.style.transform = "translateX(0)";
        }

        if (mobileOnly.matches) {
          shiftBodyLeft();
        }
      }

      function toggleModal (evt) {
        const escKey = 27;
        const btn = modal.querySelector('.modal__btn');

        function restoreTriggerColor () {
          if (modal.classList.contains('modal__wrapper')) {
            target.classList.remove('link--opened');
          }
        }

        function closeModalClick (evt) {
          modal.classList.add('modal__wrapper--hidden');
          modal.style.animationName = 'floatUp';
          restoreTriggerColor();
          btn.removeEventListener('click', closeModalClick);
        }

        function closeModalEsc (evt) {
          if (evt.keyCode === escKey) {
            modal.classList.add('modal__wrapper--hidden');
            modal.style.animationName = 'floatUp';
            restoreTriggerColor();
            document.removeEventListener('keydown', closeModalEsc);
          }
        }

        function closeModalMissclick (evt) {
          if (evt.target.classList.contains('modal__wrapper')) {
            modal.classList.add('modal__wrapper--hidden');
            modal.style.animationName = 'floatUp';
            restoreTriggerColor();
            modal.removeEventListener('click', closeModalMissclick);
          }
        }

        function closeModalClickSpecial (evt) {
          if (evt.target.classList.contains('nav-shop__link--cart')) {
            modal.classList.add('modal__wrapper--hidden');
            modal.style.animationName = 'floatUp';
            restoreTriggerColor();
            document.removeEventListener('click', closeModalClickSpecial);
          }

          if (modal.classList.contains('modal__wrapper--size') &&
          evt.target.classList.contains('nav-shop__link')) {
            modal.classList.add('modal__wrapper--hidden');
            modal.style.animationName = 'floatUp';
            restoreTriggerColor();
            document.removeEventListener('click', closeModalClickSpecial);
          }

          if (modal.classList.contains('modal__wrapper') &&
          (evt.target.classList.contains('nav-shop__link--cart') ||
          evt.target.classList.contains('nav__link'))) {
            modal.classList.add('modal__wrapper--hidden');
            modal.style.animationName = 'floatUp';
            restoreTriggerColor();
            document.removeEventListener('click', closeModalClickSpecial);
          }
        }

        closeSideMenu();
        modal.classList.remove('modal__wrapper--hidden');
        modal.style.animationName = 'dropDown';

        if (modal.classList.contains('modal__wrapper')) {
          target.classList.add('link--opened');
        }

        btn.addEventListener('click', closeModalClick);
        document.addEventListener('keydown', closeModalEsc);
        modal.addEventListener('click', closeModalMissclick);
        document.addEventListener('click', closeModalClickSpecial);

      }

      if (notebook.matches && modal.getAttribute('data-modal') === 'modal-size') {
        target.addEventListener('click', toggleModal);
      } else {
        target.addEventListener('click', toggleModal);
      }
    }

    this.size = function () {
      const html = document.querySelector('html');
      const trigger = document.querySelector('.order__link');
      const content = document.querySelector('.options__content--size');

      function assembleModal () {
        let wrapper = document.createElement('DIV');
        wrapper.classList.add('modal__wrapper', 'modal__wrapper--size');
        wrapper.setAttribute('data-modal', 'modal-size');

        let modalBody = document.createElement('DIV');
        modalBody.classList.add('modal__container');

        let btn = document.createElement('BUTTON');
        btn.classList.add('modal__btn');
        btn.textContent = 'Close modal';

        let heading = document.createElement('H2');
        heading.classList.add('modal__title');
        heading.textContent = 'Size guide';

        content.style= "display: block";

        modalBody.append(btn, heading, content);
        wrapper.append(modalBody);
        document.body.append(wrapper);

        wrapper.classList.add('modal__wrapper--hidden');
      }

      assembleModal();

      const modalSize = document.querySelector('[data-modal="modal-size"]');

      listenModal(trigger, modalSize);
    }

    this.sign = function () {
      const triggers = document.querySelectorAll('[data-trigger="sign-in"]');
      const modalSign = document.querySelector('[data-modal="sign-in"]');
      const items = modalSign.querySelectorAll('.modal__item');
      const buttons = modalSign.querySelectorAll('[data-link]');

      function hideAll (exceptionClassName) {
        // Access to next pannels of modal is performed via data attributes of .modal__selection elements. These attributes contain the specific class name of the pannel to be revealed on click. This function hides all modal pannels except the one which contains the parameter class.
        console.log(exceptionClassName);
        items.forEach(item => {
          if (item.className.indexOf(exceptionClassName) < 0) {
            item.style = 'display: none';
          } else {
            item.style = 'display: grid';
          }
        });
      }

      function initialState () {
        // There is no design to the 1st page of mobile registration modal for desktop. Therefore we show the 1st page for mobile version and .modal__item--sign for tablet+
        if (mobileOnly.matches) {
          hideAll('modal__item--intro');
        } else {
          hideAll('modal__item--sign');
        }
      }

      function switchContent () {
        // Hide all modal pannels except the one which contains the class from data-link attribute
        buttons.forEach(btn => {
          btn.addEventListener('click', function () {
            hideAll(btn.getAttribute('data-link'));
          });
        });
      }

      triggers.forEach(trigger => {
        listenModal(trigger, modalSign);
        trigger.addEventListener('click', initialState);
      });

      switchContent();
    }
  }

  operateModal.size();
  operateModal.sign();
})();
