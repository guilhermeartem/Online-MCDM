(function () {
  'use strict';

  angular
    .module('decisions')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Decisions',
      state: 'decisions',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'decisions', {
      title: 'List Decisions',
      state: 'decisions.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'decisions', {
      title: 'Create Decision',
      state: 'decisions.create',
      roles: ['user']
    });
  }
})();
