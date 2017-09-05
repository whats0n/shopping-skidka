(function() {

  $('#sort_option').on('change', function() {
    $('#products_sort').val(this.value);
    $('#catalogue_sidebar_filter').submit();
  });

  $('*[data-sidebar-item-type="sidebar-brand-checkbox"]').on('click', function() {
    $('#catalogue_sidebar_filter').submit();
  });

})();
