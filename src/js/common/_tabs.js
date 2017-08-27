import {WIN, ACTIVE} from './_global.js';

(function() {

	class Tabs {

		constructor(config) {

			this._section = config.section;
			this._btn = this._section.find(config.button);
			this._content = this._section.find(config.content);
			this._listScroll = this._btn.closest('.js-scrollbar');

			this._openOnClick();

		}

		_openOnClick() {
			let that = this;

			that._btn.click(function(e) {
				e.preventDefault();

				let current = $(this).attr('href');
				let filtered = that._filtered(current);
				that._openTab(filtered.link, filtered.content);

				//scroll to current btn if list has scrollbar
				if (that._listScroll.length && that._listScroll.hasClass('ps-active-x')) {

					let btnPosition = $(this).offset().left;
					let currentPosition = that._listScroll.scrollLeft();
					let btnCenterOnScreen = WIN.outerWidth()/2 - $(this).outerWidth()/2;

					that._listScroll.animate({
						scrollLeft: btnPosition + currentPosition - btnCenterOnScreen
					}, 300);
				}
			});
		}

		_filtered(current) {
			return {
				link: this._btn.filter(`[href="${current}"]`),
				content: this._content.filter(`[data-id="${current}"]`)
			};
		}

		_openTab(link, content) {
			this._btn
				.add(this._content)
				.removeClass(ACTIVE);

			link
				.add(content)
				.addClass(ACTIVE);
		}

	}


	let tabs = $('.js-tabs');

	tabs.each(function() {
		new Tabs({
			section: $(this),
			button: '.js-tabs-open',
			content: '.js-tabs-content'
		});
	});

})();