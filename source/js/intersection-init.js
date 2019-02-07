(function () {
  'use strict';

  window.addEventListener("load", function (event) {
    var elements = document.querySelectorAll('.slide-up');
    const shift = 300;

    function collectInitialCoords (collection) {
      let initCoords = [];
      collection.forEach(item => {
        initCoords.push(item.getBoundingClientRect().top);
      });
      return initCoords;
    }

    function makeInitialShift (collection) {

    }


    function createObserverAnimation() {
      function handleIntersect(entries, observer) {
        entries.forEach(function(entry) {

          function test () {
            if (entry.intersectionRatio >= options.threshold) {
              let c = collectInitialCoords(elements);
              console.log(c[0]);
            } else {
              document.removeEventListener('scroll', test);
            }
          }

          document.addEventListener('scroll', test);
        });
      }

      var observer;

      var options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0
      };

      observer = new IntersectionObserver(handleIntersect, options);
      elements.forEach(item => {
        observer.observe(item);
      });
    }

    createObserverAnimation();

  }, false);

})();
