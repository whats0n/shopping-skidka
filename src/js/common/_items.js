import {ACTIVE} from './_global.js';

(function() {

	class ItemSlider {

		constructor(config) {

			this._item = config.item;
			this._pagination = this._item.find(config.pagination);
			this._images = this._item.find(config.image);
			this._amount = this._images.length;

				this._init();
		}

		_init() {
			if (this._amount > 1) {
				this._buildPagination();
			}
			this._showOnHover();
		}

		_buildPagination() {
			let max = (this._amount >= 5) ? 5 : this._amount;

			for (let i = 0; i < this._amount; i++) {
				if (i >= 5) break;

				this._pagination.append(`<span style="width: ${100/max}%"></span>`);
			}
		}

		_showOnHover() {
			let that = this;

			this._pagination.on('mouseenter', 'span', function() {
				let _this = $(this);
				let current = _this.index();

				that._hide();
				that._show(current);
			});

			this._pagination.on('mouseenter', function() {
				if (that._amount > 1) return;
				that._images.eq(0).addClass(ACTIVE);
			});
		}

		_hide() {
			this._images.removeClass(ACTIVE);
		}

		_show(index) {
			this._images
				.eq(index)
				.addClass(ACTIVE);
		}

	}

	$('.js-item').each(function() {
		new ItemSlider({
			item: $(this),
			image: '.js-item-img',
			pagination: '.js-item-pagination'
		});
	});

})();