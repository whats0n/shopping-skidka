import slick from 'slick-carousel';

export default class Slider {

  constructor(config) {
    this._section = config.section;
    this._slider = this._section.find(config.slider);

    this._sliderOptions = config.sliderOptions;
    this._sliderNavOptions = config.sliderNavOptions || {};
    this._sliderNavOptions.asNavFor = this._slider;

    this._init(config);
  }

  _init(config) {
    this._findSliderDots();
    this._findSliderArrows();
    this._findSliderNav();
    this._slider.on('init', (e, slick, bp) => {
      this._updateSVG();
    });
    config.initSlider({
      slider: this._slider,
      sliderOptions: this._sliderOptions,
      nav: this._sliderNav,
      navOptions: this._sliderNavOptions
    });
    this._lazyLoad();
  }

  _findSliderDots() {
    let dotsClass = this._sliderOptions.appendDots;

    if (dotsClass && dotsClass.length) {
      this._dots = this._section.find(dotsClass);
      this._sliderOptions.appendDots = this._dots;
    }
  }

  _findSliderArrows() {
    let prevArrow = this._sliderOptions.prevArrow;
    let nextArrow = this._sliderOptions.nextArrow;

    if (prevArrow && prevArrow.length && nextArrow && nextArrow.length) {
      this._sliderOptions.prevArrow = this._section.find(prevArrow);
      this._sliderOptions.nextArrow = this._section.find(nextArrow);
    }
  }

  _findSliderNav() {
    let sliderNav = this._sliderOptions.asNavFor;

    if (!!sliderNav && !!sliderNav.length) this._sliderNav = this._section.find(sliderNav);
  }

  _updateSVG() {
    this._svg = this._slider.find('svg use');
    if (this._svg.length) {
      this._svg.each(function(i, el) {
        let temp = el.href.baseVal;
        el.href.baseVal = '';
        el.href.baseVal = temp;
      });
    }
  }

  _lazyLoad() {
    this._slider.on('breakpoint', (e, slick, bp) => {
      this._updateSVG();
    });
    this._slider.on('beforeChange', (event, slick, current, next) => {
      this._slider.find('.slick-slide')
        .find('.js-lazyload')
        .each(function() {
          let _this = $(this);
          let path = _this.data('img');

          if (path && path.length > 0) {
            _this
              .removeAttr('data-img')
              .attr('src', path);
          }
        });
    });
  }

}
