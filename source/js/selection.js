(function () {
  'use strict';

  function OperateSelection () {
    const selectors = document.querySelectorAll('.selection');

    function changeText () {
      selectors.forEach(item => {
        item.addEventListener('change', function (evt) {
          item.querySelector('.selection__method').textContent = evt.target.value;
          item.removeAttribute('open');
          item.querySelector('.selection__method').classList.add('selection__method--selected');
        });
      });
    }

    function switchTabs () {
      selectors.forEach(item => {
        item.addEventListener('click', function () {
          selectors.forEach(pannel => {
            if (pannel !== item) {
              pannel.removeAttribute('open');
            }
          });
        });
      });
    }

    this.controlSelectors = function () {
      switchTabs();
      changeText();
    }
  }

  let cartSelection = new OperateSelection;
  cartSelection.controlSelectors();
})();
