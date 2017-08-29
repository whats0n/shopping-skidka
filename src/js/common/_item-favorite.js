import {ACTIVE} from './_global';

(function() {

  let favorite = $('.js-favorite-btn');

  favorite.click(function(e) {
    e.preventDefault();
    $(this).toggleClass(ACTIVE);
  });

})();
