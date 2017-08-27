import Slider from './../_sliders';
import {addSliderSM} from './_sliders-helpers.js';
import {slickSM, WIN} from './../_global.js';

(function() {
	let overviewRow = $('.js-purchases-intro');

	overviewRow.each(function() {
		new Slider({
			section: $(this),
			slider: '.js-purchases-intro-slider',
			initSlider(config) {
				WIN.on('resize', () => addSliderSM(config.slider, config.sliderOptions));
				addSliderSM(config.slider, config.sliderOptions);
			},
			sliderOptions: {
				arrows: false,
				// slidesToShow: 3,
				variableWidth: true,
				centerMode: true,
				dots: true,
				initialSlide: 1
			}
		});
	});

})();