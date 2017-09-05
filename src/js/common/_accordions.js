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
      this._linkName = `${config.link}[data-accordion-child="${this._accordionFamily}"]`;
      this._link = this._section.find(this._linkName);

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
        let activeElement = that._link.length ? _this.closest(that._linkName) : _this;
        let activeContent = activeElement.siblings(`${that._contentClass}[data-accordion-child="${that._accordionFamily}"]`);
        console.log('click', activeElement);
        if (activeElement.hasClass(ACTIVE)) {
          that._close(activeElement, activeContent);
        } else {

          if (that._closeOther) that._close(that._btn, that._content);

          activeElement.addClass(ACTIVE);
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

  $('.js-accordion-category').each(function() {
    new Accordion({
      section: $(this),
      button: '.js-accordion-category-open',
      content: '.js-accordion-category-content',
      link: '.js-accordion-category-link',
      duration: 250
    });
  });

})();
