import Slider from './../_sliders';
import {initSlider} from './_sliders-helpers.js';

(function() {

	let overviewRow = $('.js-box');

	overviewRow.each(function() {
		new Slider({
			section: $(this),
			slider: '.js-box-slider',
			initSlider(config) {
				initSlider(config.slider, config.sliderOptions);
			},
			sliderOptions: {
				fade: true,
				prevArrow: '.js-box-prev',
				nextArrow: '.js-box-next'
			}
		});
	});

})();