(function () {
  'use strict';

  angular
    .module('values')
    .controller('ValuesListController', ValuesListController);

  ValuesListController.$inject = ['ValuesService'];

  function ValuesListController(ValuesService) {
    var vm = this;

    vm.values = ValuesService.query();
  }
})();
