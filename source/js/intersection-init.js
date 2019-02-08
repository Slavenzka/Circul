(function () {
  'use strict';

  window.addEventListener("load", function (event) {
    var elements = document.querySelectorAll('.slide-up');
    let tablet = window.matchMedia('(min-width: 768px)');
    const shift = 150;

    function initialShift () {
      function handleInit (entries, observerInit) {
        entries.forEach(function (entry) {
          if (entry.intersectionRatio >= optionsInit.threshold) {
            entry.target.style.transform = 'translateY(0px)';
          } else {
            entry.target.style.transform = 'translateY(' + shift + 'px)';
          }
          observerInit.unobserve(entry.target);
        });
      }

      var observerInit;

      var optionsInit = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5
      };

      elements.forEach(item => {
        observerInit = new IntersectionObserver(handleInit, optionsInit);
        elements.forEach(item => {
          observerInit.observe(item);
        });
      });
    }

    function createObserverAnimation() {
      function handleIntersect (entries, observer) {
        entries.forEach(function(entry) {

          function getTranslation (item) {
            let string = item.target.style.transform;
            return string.slice(string.indexOf('(') + 1, string.indexOf('p'));
          }

          function makeShift () {
              let newCoord = entry.target.getBoundingClientRect().top;
              delta = oldCoord - newCoord;
              console.log(getTranslation(entry));
              oldCoord = newCoord;
              let actualShift = getTranslation(entry) - delta;
              if (actualShift <= 0) {
                actualShift = 0;
                entry.target.style.opacity = '1';
              }
              if (actualShift >= shift) {
                actualShift = shift;
                entry.target.style.opacity = '0';
              }
              entry.target.style.transform = 'translateY(' + actualShift + 'px)';
              entry.target.style.transitionDuration = '0.5s';
            }
          let delta = 0;
          let actualShift = 0;
          let oldCoord = entry.target.getBoundingClientRect().top;
          document.addEventListener('scroll', makeShift);
        });
      }

      var options = {
        root: null,
        rootMargin: "10px",
        threshold: 1
      };

      var observer = new IntersectionObserver(handleIntersect, options);
      elements.forEach(item => {
        observer.observe(item);
      });
    }

    if (tablet.matches) {
      initialShift();
      createObserverAnimation();
    }

  }, false);
})();
