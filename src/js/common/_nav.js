import {ACTIVE, getWidthMD, getWidthSM, BodyOverflow, WIN, BODY, OVERLAY, MOBILE_NAV_FULL} from './_global.js';

export default (function() {

	let searchContainer = $('.js-search-container');

	class Nav {

		constructor() {

			this._nav = $('.js-nav');
			this._navOpen = $('.js-nav-open');
			this._navClose = $('.js-nav-close');

			this._init();

		}

		_init() {
			this._openOnClick();
			this._closeOnClick();
			this._closeOnResize();
		}

		_openOnClick() {
			this._navOpen.click((e) => {
				e.preventDefault();
				if (!getWidthMD()) return;

				this.open();
			});
		}

		_closeOnClick() {
			this._navClose.click((e) => {
				e.preventDefault();
				if (!getWidthMD()) return;
				if (this._nav.hasClass(MOBILE_NAV_FULL) && getWidthSM()) {
					this._nav.removeClass(MOBILE_NAV_FULL);
					searchContainer.removeClass(ACTIVE);
					return;
				}
				this.close();
			});

			OVERLAY.click((e) => {
				if (this._nav.hasClass(ACTIVE)) {
					this.close();
				}
			});
		}

		_closeOnResize() {
			WIN.on('resize', () => {
				if (this._nav.hasClass(ACTIVE) && !getWidthMD()) this.close();
				if (!getWidthSM()) searchContainer.removeClass(ACTIVE);
			});
		}

		open() {
			this._nav.addClass(ACTIVE);
			BODY.addClass(BodyOverflow);
			OVERLAY.addClass(ACTIVE);
		}

		close() {
			if (this._nav.hasClass(MOBILE_NAV_FULL)) this._nav.removeClass(MOBILE_NAV_FULL);
			searchContainer.removeClass(ACTIVE);
			this._nav.removeClass(ACTIVE);
			BODY.removeClass(BodyOverflow);
			OVERLAY.removeClass(ACTIVE);
		}

	}

	let nav = new Nav();

	return nav;

})();