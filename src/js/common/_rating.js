import {ACTIVE} from './_global';

(function() {

  class Rating {

    constructor(config) {
      this._section = config.section;
      this._item = this._section.find(config.item);
      this._radio = this._section.find(config.radio);

      this._init();
    }

    _init() {
      this._setItemNumber(this._item);
      this._setItemNumber(this._radio);
      this._setActive();
      this._toggleStateHover();
      this._setActiveOnChange();
    }

    _setItemNumber(item) {
      item.each(function(index, el) {
        $(this).data('index', index);
      });
    }

    _setActive() {
      this._active = this._radio.filter('[checked]');
      this._activeNumber = this._active.length
        ? +this._active.data('index')
        : -1;

      this._addActiveState(this._activeNumber);
    }

    _toggleStateHover() {
      let that = this;

      this._item.hover(function() {
        let index = +$(this).data('index');
        that._addActiveState(index);
      }, function() {
        that._addActiveState(that._activeNumber);
      });
    }

    _setActiveOnChange() {
      let that = this;

      this._radio.on('change', function() {
        let _this = $(this);
        that._activeNumber = _this.data('index');
        that._addActiveState(that._activeNumber);
      });
    }

    _addActiveState(currentNumber) {
      let that = this;

      this._item
        .removeClass(ACTIVE)
        .filter(function() {
          let index = +$(this).data('index');
          if (index <= currentNumber) return $(this);
        })
        .addClass(ACTIVE);
    }

  }

  let rating = $('.js-rating');

  rating.each(function() {
    new Rating({
      section: $(this),
      item: '.js-rating-item',
      radio: '.js-rating-radio'
    });
  });

})();
