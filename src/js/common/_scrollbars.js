import {WIN} from './_global.js';

(function() {

	let scrollbar = $('.js-scrollbar');

	scrollbar.perfectScrollbar();

	WIN.on('resize', () => {
		scrollbar.perfectScrollbar('update');
	});

})();