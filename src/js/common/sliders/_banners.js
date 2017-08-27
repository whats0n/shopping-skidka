import {WIN} from './../_global.js';
import Slider from './../_sliders.js';
import {addSliderSM} from './_sliders-helpers.js';

(function() {
	let banners = $('.js-banners');

	banners.each(function() {
		new Slider({
			section: $(this),
			slider: '.js-banners-slider',
			initSlider(config) {
				WIN.resize(() => {
					addSliderSM(config.slider, config.sliderOptions);
				});
				addSliderSM(config.slider, config.sliderOptions);
			},
			sliderOptions: {
				arrows: false,
				dots: true,
				variableWidth: true,
				centerMode: true,
				centerPadding: '0'
			}
		});
	});
})();