import noUiSlider from 'nouislider';

(function() {

  let range = $('.js-range');

  class Range {

    constructor(config) {

      this._section = config.section;
      this._form = this._section.closest(config.form);
      this._reset = this._form.find(config.reset);
      this._range = this._section.find(config.input);
      this._rangeNative = this._range.get(0);
      this._field = {};

      if (config.field.from.length) this._field.from = this._section.find(config.field.from);
      if (config.field.to.length) this._field.to = this._section.find(config.field.to);

      this._start = this._range.data('start') || 0;
      this._end = this._range.data('end') || 0;
      this._min = this._range.data('min') || 0;
      this._max = this._range.data('max') || 0;
      this._from = +this._start;
      this._to = +this._end;
      this._values = [this._from, this._to];

      this._initRangeSlider();

      let fromTo = this._section.find(config.field.from).length && this._section.find(config.field.to).length;

      if (fromTo) {
        this._setValueOnSliderChange();
        this._setValueOnInputChange();
        this._setValueOnLoad();
      }

      if (this._form.length) this._resetValues();
    }

    _initRangeSlider() {
      noUiSlider.create(this._rangeNative, {
        start: [this._start, this._end],
        connect: true,
        range: {
          'min': [this._min],
          'max': [this._max]
        }
      });
    }

    _setValueOnSliderChange() {
      this._rangeNative.noUiSlider.on('slide', (values) => {
        this._from = +(+values[0]).toFixed(0);
        this._to = +(+values[1]).toFixed(0);

        this._values[0] = this._from;
        this._values[1] = this._to;

        this._setValue('from', this._from);
        this._setValue('to', this._to);
      });

      this._rangeNative.noUiSlider.on('set', () => {

        this._from = +this._values[0];
        this._to = +this._values[1];


        if (this._from > this._to) this._to = this._from;

        if (this._from > this._max) this._from = this._max;
        if (this._to > this._max) this._to = this._max;

        if (this._from < 0) this._from = 0;
        if (this._to < 0) this._to = 0;

        this._field.from.val(this._from);
        this._field.to.val(this._to);
      });
    }

    _setValueOnLoad() {
      this._setValue('from', this._from);
      this._setValue('to', this._to);
    }

    _setValueOnInputChange() {
      let that = this;
      let changeValue = (i, val) => {
        if (val < 0) val = 0;

        if (isNaN(val)) {
          that._values[0] = 0;
          that._values[1] = 0;
        } else {
          that._values[i] = val;
        }

        that._rangeNative.noUiSlider.set(that._values);
      };

      this._field.from.on('change keypress', function() {
        let val = +($(this).val());
        changeValue(0, val);
      });

      this._field.to.on('change keypress', function() {
        let val = +($(this).val());
        changeValue(1, val);
      });
    }

    _resetValues() {
      this._form.on('reset', () => {
        setTimeout(() => {
          this._field.from
            .add(this._field.to)
            .val(0);
          this._values = [0,0];
          this._rangeNative.noUiSlider.set(this._values);
        }, 20);
      });
    }

    _setValue(field, value) {
      this._field[field].val(value);
    }


  }

  range.each(function() {
    new Range({
      section: $(this),
      form: '.js-range-form',
      reset: '.js-range-reset',
      input: '.js-range-input',
      field: {
        from: '.js-range-from',
        to: '.js-range-to'
      }
    });
  });

})();
