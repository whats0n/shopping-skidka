import {ACTIVE, BODY, HTMLBODY, WIN} from './_global.js';

(function() {
  //globals
  let filterOpen = $('.js-filter-open');
  let filterActive = 'filter-opened';
  let filter = $('.js-filter');

  filterOpen.on('click', function(e) {
    filterOpen.toggleClass(ACTIVE);
    BODY.toggleClass(filterActive);
    return false;
  });

  WIN.on('click', (e) => {
    if (!BODY.hasClass(filterActive)) return;

    if ($(e.target).closest('.js-filter').length) return;
    BODY.removeClass(filterActive);
    filterOpen.removeClass(ACTIVE);
  });

})();
