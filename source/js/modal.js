(function () {
  'use strict';

  let operateModal = new function () {
    this.size = function () {
      const html = document.querySelector('html');
      const trigger = document.querySelector('.order__link');
      const content = document.querySelector('.options__content--size');
      const notebook = window.matchMedia('(min-width: 1260px)');

      function assembleModal () {
        let wrapper = document.createElement('DIV');
        wrapper.classList.add('modal__wrapper');

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

      function toggleModal () {
        const escKey = 27;
        const modal = document.querySelector('.modal__wrapper');
        const btn = modal.querySelector('.modal__btn');

        modal.classList.remove('modal__wrapper--hidden');
        modal.style.animationName = 'dropDown';

        btn.addEventListener('click', function () {
          modal.classList.add('modal__wrapper--hidden');
          modal.style.animationName = 'floatUp';
        });

        document.addEventListener('keydown', function (evt) {
          if (evt.keyCode === escKey) {
            modal.classList.add('modal__wrapper--hidden');
            modal.style.animationName = 'floatUp';
          }
        });

        modal.addEventListener('click', function (evt) {
          if (evt.target.classList.contains('modal__wrapper')) {
            modal.classList.add('modal__wrapper--hidden');
            modal.style.animationName = 'floatUp';
          }
        });
      }

      if (notebook.matches) {
        assembleModal();
        trigger.addEventListener('click', toggleModal);
      }
    }
  }

  operateModal.size();
})();
