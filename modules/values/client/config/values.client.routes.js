(function () {
  'use strict';

  angular
    .module('values')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('values', {
        abstract: true,
        url: '/values',
        template: '<ui-view/>'
      })
      .state('values.list', {
        url: '',
        templateUrl: 'modules/values/client/views/list-values.client.view.html',
        controller: 'ValuesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Values List'
        }
      })
      .state('values.create', {
        url: '/create',
        templateUrl: 'modules/values/client/views/form-value.client.view.html',
        controller: 'ValuesController',
        controllerAs: 'vm',
        resolve: {
          valueResolve: newValue
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Values Create'
        }
      })
      .state('values.edit', {
        url: '/:valueId/edit',
        templateUrl: 'modules/values/client/views/form-value.client.view.html',
        controller: 'ValuesController',
        controllerAs: 'vm',
        resolve: {
          valueResolve: getValue
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Value {{ valueResolve.name }}'
        }
      })
      .state('values.view', {
        url: '/:valueId',
        templateUrl: 'modules/values/client/views/view-value.client.view.html',
        controller: 'ValuesController',
        controllerAs: 'vm',
        resolve: {
          valueResolve: getValue
        },
        data:{
          pageTitle: 'Value {{ articleResolve.name }}'
        }
      });
  }

  getValue.$inject = ['$stateParams', 'ValuesService'];

  function getValue($stateParams, ValuesService) {
    return ValuesService.get({
      valueId: $stateParams.valueId
    }).$promise;
  }

  newValue.$inject = ['ValuesService'];

  function newValue(ValuesService) {
    return new ValuesService();
  }
})();
