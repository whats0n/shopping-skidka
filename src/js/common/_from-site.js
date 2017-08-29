(function() {

  $('#sort_option').on('change', function() {
    $('#products_sort').val(this.value);
    $('#catalogue_sidebar_filter').submit();
  });

})();
