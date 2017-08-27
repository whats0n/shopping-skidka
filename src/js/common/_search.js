import {ACTIVE, getWidthSM, MOBILE_NAV_FULL} from './_global';

(function() {

	let searchContainer = $('.js-search-container');
	let searchInput = $('.js-search-input');
	let searchItem = $('.js-search-item');
	let searchButton = $('.js-search-button');
	let searchClear = $('.js-search-clear');
	let searchBox = $('.js-search-box');
	let nav = $('.js-nav');

	searchInput.each(function() {
		let _this = $(this);

		_this
			.focus(() => {
				searchContainer.addClass(ACTIVE);
				if (getWidthSM()) nav.addClass(MOBILE_NAV_FULL);
			})
			.blur(() => {
				if (!getWidthSM()) searchContainer.removeClass(ACTIVE);
			})
			.on({
				'input': () => {
					if (_this.val().length) {
						searchBox.addClass(ACTIVE);
					} else {
						searchBox.removeClass(ACTIVE);
					}
				}
			});
	});

	searchClear.click(function(e) {
		e.preventDefault();
		searchInput.val('');
		searchBox.removeClass(ACTIVE);
	});

	searchItem.each(function() {
		let _this = $(this);

		_this.click((e) => {
			e.preventDefault();
			let val = _this.text();
			searchBox.addClass(ACTIVE);
			searchInput.val(val);
			// searchContainer.removeClass(ACTIVE);
			// nav.removeClass(MOBILE_NAV_FULL);
		});
	});

	searchButton.each(function() {
		let _this = $(this);

		_this.click((e) => {
			e.preventDefault();
			_this.toggleClass(ACTIVE);
			searchBox.toggleClass(ACTIVE);
		});
	});

})();