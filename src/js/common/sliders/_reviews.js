import {WIN, slickSM} from './../_global.js';
import Slider from './../_sliders.js';
import {addSliderMD} from './_sliders-helpers.js';

(function() {
	let reviews = $('.js-reviews');

	reviews.each(function() {
		new Slider({
			section: $(this),
			slider: '.js-reviews-slider',
			initSlider(config) {
				WIN.resize(() => {
					addSliderMD(config.slider, config.sliderOptions);
				});
				addSliderMD(config.slider, config.sliderOptions);
			},
			sliderOptions: {
				slidesToShow: 3,
				arrows: false,
				responsive: [
					{
						breakpoint: slickSM,
						settings: {
							slidesToShow: 3,
							variableWidth: true,
							centerMode: true,
							centerPadding: '10px',
						}
					}
				]
			}
		});
	});
})();