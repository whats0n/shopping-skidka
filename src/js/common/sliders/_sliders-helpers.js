import {getWidthMD, getWidthSM, ACTIVE} from './../_global.js';

const svgUpdateDuration = 20;

export const {
  initSlider,
  addSliderMD,
  addSliderSM,
  galleryThumbnails,
  setActive
} = {
  initSlider: (slider, options) => {
    setTimeout(() => {
      slider
        .on('init', () => {
          slider.addClass('is-loaded');
        })
        .slick(options);
    }, 200);
  },

  addSliderMD: (slider, options) => {
    let initialized = slider.hasClass('slick-initialized');

    if (getWidthMD() && !initialized) {
      slider.slick(options);
    } else if (!getWidthMD() && initialized) {
      slider.slick('unslick');
    }
  },

  addSliderSM: (slider, options) => {
    let initialized = slider.hasClass('slick-initialized');

    if (getWidthSM() && !initialized) {
      slider.slick(options);
    } else if (!getWidthSM() && initialized) {
      slider.slick('unslick');
    }
  },

  galleryThumbnails(config) {
    let thumbnail = config.section.find(config.thumbnail);

    thumbnail.click(function(e) {
      e.preventDefault();
      let _this = $(this);
      if (_this.hasClass(ACTIVE)) return;
      let index = _this.data('index');
      config.slider.slick('slickGoTo', index);
    });

    return thumbnail;
  },

  setActive(items, index) {
    items
      .removeClass(ACTIVE)
      .filter(`[data-index="${index}"]`)
      .addClass(ACTIVE);
  }
};
