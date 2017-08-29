import Slider from './../_sliders';
import {initSlider} from './_sliders-helpers.js';
import {WIN, slickSM} from './../_global.js';

(function() {
  let overviewRow = $('.js-similar');

  overviewRow.each(function() {
    new Slider({
      section: $(this),
      slider: '.js-similar-slider',
      initSlider(config) {
        initSlider(config.slider, config.sliderOptions);
      },
      sliderOptions: {
        prevArrow: '.js-similar-prev',
        nextArrow: '.js-similar-next',
        slidesToShow: 3,
        responsive: [
          {
            breakpoint: slickSM,
            settings: {
              variableWidth: true,
              centerMode: true,
              centerPadding: '0'
            }
          }
        ]
      }
    });
  });

})();
