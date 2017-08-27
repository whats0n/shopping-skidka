import Slider from './../_sliders';
import {initSlider, galleryThumbnails, setActive} from './_sliders-helpers';
import {ACTIVE, getWidthSM, WIN} from './../_global';

(function() {

	let gallery = $('.js-card-gallery');
	let minSlides = 4;

	let setSliderNav = (config) => {
		let initialized = config.thumbnails.hasClass('slick-initialized');
		if (config.slides.length <= minSlides) return;
		if (getWidthSM() && !initialized) {
			config.thumbnails.slick(config.options);
		} else if (!getWidthSM() && initialized) {
			config.thumbnails.slick('unslick');
		}
	};

	gallery.each(function() {
		let _this = $(this);
		let thumbnails = _this.find('.js-card-gallery-thumbnails');

		new Slider({
			section: _this,
			slider: '.js-card-gallery-slideshow',
			initSlider(config) {
				config.slider.slick(config.sliderOptions);

				let thumbnail = galleryThumbnails({
					section: _this,
					slider: config.slider,
					thumbnail: '.js-card-gallery-thumbnail'
				});

				config.slider.on('beforeChange', (event, slick, currentSlide, nextSlide) => {
					setActive(thumbnail, nextSlide);
					if (getWidthSM() && thumbnail.length > minSlides) thumbnails.slick('slickGoTo', nextSlide);
				});

				setActive(thumbnail, 0);

				let thumbnailsOptions = {
					thumbnails: thumbnails,
					slides: thumbnail,
					options: {
						slidesToShow: 4,
						arrows: false,
						infinite: false,
						focusOnSelect: true
					}
				};

				WIN.on('resize', () => {
					setSliderNav(thumbnailsOptions);
				});

				setSliderNav(thumbnailsOptions);
			},
			sliderOptions: {
				slidesToShow: 1,
				arrows: false,
				fade: true
			}
		});
	});

})();