import {ACTIVE, BODY, BodyOverflow} from './_global';

const POPUP = (function() {

	class Popup {

		constructor() {
			this._popup = $('.js-popup');
			this._container = $('.js-popup-container');
			this._closeButton = $('.js-popup-close');
			this._openButton = $('.js-popup-open');

			this._onOpen = [];

			this._init();
		}

		_init() {
			this._openOnClick();
			this._closeOnClick();
		}

		_openOnClick() {
			let that = this;

			this._openButton.click(function(e) {
				e.preventDefault();
				let target = $(this).data('target');
				that.open(target, $(this));
			});
		}

		_closeOnClick() {
			this._closeButton.click((e) => {
				e.preventDefault();
				this.close();
			});

			this._popup.click((e) => {
				if ($(e.target).closest('.js-popup-container').length) return;
				this.close();
			});
		}

		open(target, btn) {
			let button = btn || null;

			BODY.addClass(BodyOverflow);
			this._popup
				.removeClass(ACTIVE)
				.filter(`[data-modal="${target}"]`)
				.addClass(ACTIVE);

			this._onOpen.forEach(callback => {
				callback({
					popup: this._popup.filter(`[data-modal="${target}"]`),
					btn: button
				});
			});
		}

		close() {
			BODY.removeClass(BodyOverflow);
			this._popup.removeClass(ACTIVE);
		}

		onOpen(callback) {
			this._onOpen.push(callback);
		}

	}

	let popup = new Popup();

	return popup;

})();

export default POPUP;