(function () {
  'use strict';

  angular
    .module('decisions')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('decisions', {
        abstract: true,
        url: '/decisions',
        template: '<ui-view/>'
      })
      .state('decisions.list', {
       url: '',
       templateUrl: 'modules/decisions/client/views/list-decisions.client.view.html',
       controller: 'DecisionsListController',
       controllerAs: 'vm',
       data: {
         pageTitle: 'Decisions List'
       }
      })
      .state('decisions.create', {
        url: '/create',
        templateUrl: 'modules/decisions/client/views/input-decision.client.view.html',
        controller: 'DecisionsController',
        controllerAs: 'vm',
        resolve: {
         decisionResolve: newDecision
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Decisions Create'
        }
      })
      .state('decisions.edit', {
       url: '/:decisionId/edit',
       templateUrl: 'modules/decisions/client/views/input-decision.client.view.html',
       controller: 'DecisionsController',
       controllerAs: 'vm',
       resolve: {
         decisionResolve: getDecision
       },
       data: {
         roles: ['user', 'admin'],
         pageTitle: 'Edit Decision'
       }
      })
      .state('decisions.view', {
       url: '/:decisionId',
       templateUrl: 'modules/decisions/client/views/view-decision.client.view.html',
       controller: 'DecisionsController',
       controllerAs: 'vm',
       resolve: {
         decisionResolve: getDecision
       },
       data:{
         pageTitle: 'Decision {{ decisionResolve.name }}'
       }
      });
  }

  getDecision.$inject = ['$stateParams', 'DecisionsService'];

  function getDecision($stateParams, DecisionsService) {
    return DecisionsService.get({
      decisionId: $stateParams.decisionId
    }).$promise;
  }

  newDecision.$inject = ['DecisionsService'];

  function newDecision(DecisionsService) {
    return new DecisionsService();
  }
})();
