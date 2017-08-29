import {WIN, ACTIVE, getWidthMD, getWidthSM} from './_global.js';

(function() {

  class Accordion {

    constructor(config) {

      this._contentClass = config.content;
      this._closeOther = config.closeOther || false;

      this._section = config.section;
      this._accordionFamily = this._section.data('accordion-parent');
      this._btn = this._section.find(`${config.button}[data-accordion-child="${this._accordionFamily}"]`);
      this._content = this._section.find(`${this._contentClass}[data-accordion-child="${this._accordionFamily}"]`);

      this._duration = config.duration || 300;

      this._defaultCondition = () => { return true; };
      this._condition = config.initAccordion || this._defaultCondition;

      this._init();
    }

    _init() {
      this._openOnClick();
      this._reset();

      WIN.resize(() => {
        this._reset();
      });
    }

    _openOnClick() {
      let that = this;

      that._btn.on('click', function(e) {
        if (!that._condition()) return;

        e.preventDefault();
        let _this = $(this);
        let activeContent = _this.siblings(`${that._contentClass}[data-accordion-child="${that._accordionFamily}"]`);

        if (_this.hasClass(ACTIVE)) {
          that._close(_this, activeContent);
        } else {

          if (that._closeOther) that._close(that._btn, that._content);

          _this.addClass(ACTIVE);
          activeContent
            .stop(false, true, true)
            .slideDown(that._duration);
        }
      });
    }

    _close(btn, content) {
      btn.removeClass(ACTIVE);
      content
        .stop(false, true, true)
        .slideUp(this._duration);
    }

    _reset() {
      if (!this._condition()) {
        this._content.removeAttr('style');
        this._btn.removeClass(ACTIVE);
      }
    }

  }

  $('.js-accordion-md').each(function() {
    new Accordion({
      section: $(this),
      button: '.js-accordion-md-open',
      content: '.js-accordion-md-content',
      duration: 250,
      closeOther: true,
      initAccordion: getWidthMD
    });
  });

  $('.js-accordion-sm').each(function() {
    new Accordion({
      section: $(this),
      button: '.js-accordion-sm-open',
      content: '.js-accordion-sm-content',
      duration: 250,
      closeOther: true,
      initAccordion: getWidthSM
    });
  });

  $('.js-accordion-lg').each(function() {
    new Accordion({
      section: $(this),
      button: '.js-accordion-lg-open',
      content: '.js-accordion-lg-content',
      duration: 250
    });
  });

})();
