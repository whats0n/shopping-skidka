import {slickMD, slickSM} from './../_global.js';
import Slider from './../_sliders.js';
import {initSlider} from './_sliders-helpers.js';

(function() {
  let popular = $('.js-popular');

  popular.each(function() {

    let slidesToShow = +($(this).data('slides-show'));

    slidesToShow = slidesToShow > 0
      ? slidesToShow
      : 4;

    new Slider({
      section: $(this),
      slider: '.js-popular-slider',
      initSlider(config) {
        initSlider(config.slider, config.sliderOptions);
      },
      sliderOptions: {
        prevArrow: '.js-popular-prev',
        nextArrow: '.js-popular-next',
        slidesToShow: slidesToShow,
        responsive: [
          {
            breakpoint: slickMD,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: slickSM,
            settings: {
              slidesToShow: 2
            }
          }
        ]
      }
    });
  });
})();
