import select2 from 'select2';

(function() {

  let select = $('.js-select');

  select.each(function() {
    $(this).select2({
      minimumResultsForSearch: -1
    });
  });

})();
