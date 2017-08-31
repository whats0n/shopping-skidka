(function() {

  const $filters = $('.js-filters');

  $filters.each(function() {

    const $this = $(this);
    const $input = $this.find('.js-filters-input');
    const $values = $this.find('.js-filters-value');

    $input.on('keyup', function() {

      const $this = $(this);
      const value = $this.val().toLowerCase();


      $values.each(function() {

        const $this = $(this);
        const itemValue = $this.data('value').toLowerCase();
        const $parent = $this.closest('.js-filters-item');

        console.log(itemValue.includes(value));
				
        if (itemValue.includes(value)) $parent.removeAttr('style');
        else $parent.css('display', 'none');

      });

    });

  });

})();
