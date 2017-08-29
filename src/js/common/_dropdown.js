import {ACTIVE, BODY} from './_global';

(function() {

  let dropdown = $('.js-dropdown');

  dropdown.each(function() {
    let _this = $(this);
    let open = _this.find('.js-dropdown-open');

    open.click(function(e) {
      e.preventDefault();
      _this.addClass(ACTIVE);
    });
  });

  BODY.click(function(e) {
    if (!dropdown.hasClass('is-active')) return;
    if ($(e.target).closest('.js-dropdown').length) return;
    dropdown.removeClass(ACTIVE);
  });

})();
