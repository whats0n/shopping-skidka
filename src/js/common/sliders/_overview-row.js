import Slider from './../_sliders';
import {initSlider} from './_sliders-helpers.js';
import {slickSM, slickXS} from './../_global.js';

(function() {

  let overviewRow = $('.js-overview-row');

  overviewRow.each(function() {
    new Slider({
      section: $(this),
      slider: '.js-overview-row-slider',
      initSlider(config) {
        initSlider(config.slider, config.sliderOptions);
      },
      sliderOptions: {
        prevArrow: '.js-overview-row-prev',
        nextArrow: '.js-overview-row-next',
        slidesToShow: 3,
        centerPadding: '4px',
        centerMode: true,
        responsive: [
          {
            breakpoint: slickSM,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: slickXS,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      }
    });
  });

})();
