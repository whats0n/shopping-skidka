import {WIN, ACTIVE, getWidthMD, getWidthSM} from './_global.js';

(function() {

	class AccordionSimple {

		constructor(config) {
			this._section = config.section;
			this._item = this._section.find(config.item);
			this._btnClass = config.btn;
			this._contentClass = config.content;
			this._allBtns = this._section.find(config.btn);
			this._allContents = this._section.find(config.content);

			this._closeOther = config.closeOther || false;

			this._init();
		}

		_init() {
			this._openOnClick();
		}

		_openOnClick() {
			let that = this;

			that._item.each(function() {
				let _this = $(this);
				let btn = _this.find(that._btnClass);
				let content = _this.find(that._contentClass);

				btn.on('click', (e) => {
					e.preventDefault();

					if (btn.hasClass(ACTIVE)) {
						that._close(btn, content);
					} else {

						if (that._closeOther) that._close(that._allBtns, that._allContents);

						btn.addClass(ACTIVE);
						content
							.stop(false, true, true)
							.slideDown(that._duration);
					}
				});
			});
		}

		_close(btn, content) {
			btn.removeClass(ACTIVE);
			content
				.stop(false, true, true)
				.slideUp(this._duration);
		}

	}

	let scoreAccordions = $('.js-score-accordion');

	scoreAccordions.each(function() {
		new AccordionSimple({
			section: $(this),
			btn: '.js-score-accordion-open',
			content: '.js-score-accordion-content',
			item: '.js-score-accordion-item',
			closeOther: true
		});
	});

})();