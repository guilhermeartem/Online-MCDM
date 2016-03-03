(function () {
  'use strict';

  angular
    .module('decisions')
    .controller('DecisionsListController', DecisionsListController);

  DecisionsListController.$inject = ['DecisionsService'];

  function DecisionsListController(DecisionsService) {
    var vm = this;

    vm.decisions = DecisionsService.query();
  }
})();
