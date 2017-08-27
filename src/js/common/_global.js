export
	const {
		//export like variables
		WIN,
		HTMLBODY,
		BODY,
		OVERLAY,
		ACTIVE,
		OPEN,
		BodyOverflow,
		MOBILE_NAV_FULL,

		widthXS,
		widthSM,
		widthMD,

		slickXS,
		slickSM,
		slickMD,

		touch,
		getWidthSM,
		getWidthMD
	} = {
		//variables and values
		WIN: $(window),
		HTMLBODY: $('html, body'),
		BODY: $('body'),
		OVERLAY: $('.js-overlay'),

		ACTIVE: 'is-active',
		OPEN: 'is-open',
		BodyOverflow: 'is-hidden',
		MOBILE_NAV_FULL: 'mobile-nav_full',

		widthXS: 500,
		widthSM: 767,
		widthMD: 1080,

		slickXS: 500 + 1,
		slickSM: 767 + 1,
		slickMD: 1080 + 1,

		//detect functions
		touch() {
			return 'ontouchstart' in window;
		},
		getWidthSM() {
			return window.matchMedia(`(max-width: ${widthSM}px)`).matches;
		},
		getWidthMD() {
			return window.matchMedia(`(max-width: ${widthMD}px)`).matches;
		}

	};

//detect
if (!touch()) BODY.addClass('no-touch');

//small functions
let scrollTo = (position) => {
	HTMLBODY.animate({
		scrollTop: position
	}, 700);
};

let btnUp = $('.js-up');

btnUp.click(function(e) {
	e.preventDefault();
	scrollTo(0);
});