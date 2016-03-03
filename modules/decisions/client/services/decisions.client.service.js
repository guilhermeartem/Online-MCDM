//Decisions service used to communicate Decisions REST endpoints
(function () {
  'use strict';

  angular
    .module('decisions')
    .factory('DecisionsService', DecisionsService);

  DecisionsService.$inject = ['$resource'];

  function DecisionsService($resource) {
    return $resource('api/decisions/:decisionId', {
      decisionId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
