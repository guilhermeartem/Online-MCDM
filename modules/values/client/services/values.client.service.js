//Values service used to communicate Values REST endpoints
(function () {
  'use strict';

  angular
    .module('values')
    .factory('ValuesService', ValuesService);

  ValuesService.$inject = ['$resource'];

  function ValuesService($resource) {
    return $resource('api/values/:valueId', {
      valueId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
