import {ACTIVE} from './_global.js';

(function() {

	class ShowMore {

		constructor(config) {
			this._section = config.section;
			this._family = this._section.data('show-parent');
			this._btn = this._section.find(`${config.btn}[data-show-child="${this._family}"]`);
			this._item = this._section.find(`${config.item}[data-show-child="${this._family}"]`);

			this._max = config.max || 1;
			this._length = this._item.length;

			this._toggleOnClick();
			this._hideOnLoad();
		}

		_toggleOnClick() {
			let that = this;

			this._btn.on('click', function(e) {
				e.preventDefault();

				let _this = $(this);

				if (_this.hasClass(ACTIVE)) {
					_this.removeClass(ACTIVE);
					that._toggle(true);
				} else {
					_this.addClass(ACTIVE);
					that._toggle(false);
				}
			});
		}

		_hideOnLoad() {
			if (this._length <= this._max) {
				this._btn.attr('hidden', true);
			} else {
				this._toggle(true);
			}
		}

		_toggle(state) {
			this._item.each((i, el) => {
				if (i < this._max) return;
				$(el).attr('hidden', state)
			});
		}

	}

	$('.js-show-more').each(function() {
		new ShowMore({
			section: $(this),
			max: 5,
			btn: '.js-show-more-open',
			item: '.js-show-more-item'
		});
	});

})();