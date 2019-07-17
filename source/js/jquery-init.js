(function () {
  'use strict';

  $(document).ready(function(){
    $('.promo__list').slick({
      arrows: false,
      dots: true,
      fade: true,
      autoplay: true,
      autoplaySpeed: 2000,
      speed: 300
    });
    $('.promo__list').on('wheel', (function(e) {
      e.preventDefault();
      let scrollCount = 0;

      scroll = setTimeout(function () { scrollCount = 0; }, 200);
      if (scrollCount) return 0;
      scrollCount = 1;

      if (e.originalEvent.deltaY < 0) {
        $(this).slick('slickPrev');
      } else {
        $(this).slick('slickNext');
      }
    }));
});
})();
