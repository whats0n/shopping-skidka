import Slider from './../_sliders';
import {initSlider, setActive, galleryThumbnails} from './_sliders-helpers';
import {ACTIVE, getWidthSM, WIN, slickMD} from './../_global';

import POPUP from './../_popup';

(function() {

	let gallery = $('.js-gallery');
	let minSlides = 7;

	let setSliderNav = (config) => {
		if (config.slides.length <= minSlides) return;
		config.thumbnails.slick(config.options);
	};

	POPUP.onOpen((config) => {
		if (!config.popup.find('.js-gallery').length) return;
		if (!config.btn) return;
		config.popup.find('.js-gallery-slider').slick('slickGoTo', config.btn.data('index'));
	});

	gallery.each(function() {
		let _this = $(this);
		let thumbnails = _this.find('.js-gallery-thumbnails');

		new Slider({
			section: _this,
			slider: '.js-gallery-slider',
			initSlider(config) {
				config.slider.slick(config.sliderOptions);

				let thumbnail = galleryThumbnails({
					section: _this,
					slider: config.slider,
					thumbnail: '.js-gallery-thumbnail'
				});

				config.slider.on('beforeChange', (event, slick, currentSlide, nextSlide) => {
					setActive(thumbnail, nextSlide);
					if (thumbnail.length > minSlides) thumbnails.slick('slickGoTo', nextSlide);
				});

				setActive(thumbnail, 0);

				let thumbnailsOptions = {
					thumbnails: thumbnails,
					slides: thumbnail,
					options: {
						slidesToShow: 7,
						arrows: false,
						infinite: false,
						focusOnSelect: true,
						responsive: [
							{
								breakpoint: slickMD,
								settings: {
									slidesToShow: 4
								}
							}
						]
					}
				};

				setSliderNav(thumbnailsOptions);
			},
			sliderOptions: {
				slidesToShow: 1,
				// arrows: false,
				prevArrow: '.js-gallery-prev',
				nextArrow: '.js-gallery-next',
				fade: true
			}
		});
	});

})();