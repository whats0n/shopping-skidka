import {ACTIVE, WIN} from './_global.js';

(function() {

	class Lazyload {

		constructor(config) {

			this._item = config.item;

			this._init();

		}

		_init() {
			this._loadImg();
		}

		_loadImg() {

			this._item.each(function() {
				let _this = $(this);
				let path = _this.data('img');
				let loadImg = function() {
					if (_this.offset().top <= WIN.scrollTop() + WIN.outerHeight()) {
						_this
							.removeAttr('data-img')
							.attr('src', path);
						WIN.off('scroll', loadImg);
					}
				};

				WIN.on('scroll', loadImg);
				loadImg();
			});
		}

	}

	$('.js-lazyload').each(function() {
		new Lazyload({
			item: $(this)
		});
	});

})();