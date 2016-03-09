(function () {
  'use strict';

  angular
    .module('values')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Values',
      state: 'values',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'values', {
      title: 'List Values',
      state: 'values.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'values', {
      title: 'Create Value',
      state: 'values.create',
      roles: ['user']
    });
  }
})();
