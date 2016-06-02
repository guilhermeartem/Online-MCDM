(function () {
  'use strict';

  // Values controller
  angular
    .module('values')
    .controller('ValuesController', ValuesController);

  ValuesController.$inject = ['$scope', '$state', 'Authentication', 'valueResolve'];

  function ValuesController ($scope, $state, Authentication, value) {
    var vm = this;

    vm.authentication = Authentication;
    $scope.value = value;
    if(!$scope.value._id){
      $scope.value.value = [];
    }
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.valueOptions = [
      { name: 'crisp', showName: 'Crisp' },
      { name: 'interval', showName: 'Interval' },
      { name: 'fuzzy', showName: 'Fuzzy' },
      { name: 'z-number', showName: 'Z-Number' }
    ];

    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];
    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };

    // Remove existing Value
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        $scope.value.$remove($state.go('values.list'));
      }
    }

    $scope.testButton = function(){
      console.log('test');
    };

    // Save Value
    function save(isValid) {
      console.log($scope.value);
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.valueForm');
        return false;
      }

      // TODO: move create/update logic to service
      if ($scope.value._id) {
        $scope.value.$update(successCallback, errorCallback);
      } else {
        $scope.value.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('values.view', {
          valueId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
