import {ACTIVE, OPEN} from './_global.js';

export default (function() {

  class Menu {

    constructor() {

      this._menu = $('.js-menu');
      this._menuOpen = $('.js-menu-link');
      this._menuSection = $('.js-menu-item');
      this._menuClose = $('.js-menu-close');

      this._init();

    }

    _init() {
      this._closeOnHover();
      this._openOnHover();
    }

    _openOnHover() {
      let that = this;

      this._menuOpen.mouseenter(function() {
        let current = $(this).data('menu');

        that._menuOpen.removeClass(OPEN);
        that.open(current, this);
      });
    }

    _closeOnHover() {
      this._menuClose.mouseenter((e) => {
        if ($(e.target).closest('.js-menu-link').length) return;
        this.close();
      });
      this._menu.mouseleave(() => {
        this.close();
      });
    }

    open(current, link) {
      let currentMenu = this._menuSection.filter(`[data-menu="${current}"]`);

      this._menuSection.removeClass(OPEN);

      if (!currentMenu.length) return;

      currentMenu
        .add(this._menu)
        .add(link)
        .addClass(OPEN);
    }

    close() {
      this._menu
        .add(this._menuSection)
        .add(this._menuOpen)
        .removeClass(OPEN);
    }

  }


  let menu = new Menu();

  return menu;

})();
