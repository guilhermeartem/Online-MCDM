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

    // $scope.linePoints = [{"x":0,"data1":30, "data2":50},{"x":1,"data1":200, "data2":20},{"x":2,"data1":100, "data2":10},{"x":3,"data1":400, "data2":40}, {"x":4,"data1":150, "data2":15}, {"x":5,"data1":250, "data2":25}];
    // $scope.lineColumns = [{"id": "data1", "type": "spline"}, {"id": "data2", "type": "line"}];

    $scope.linePoints = [{"x":0,"data1":0}, {"x":$scope.value.value[0],"data1":0},{"x":$scope.value.value[1],"data1":1},{"x":$scope.value.value[2],"data1":0}, {"x":1,"data1":0}];
    $scope.lineColumns = [{"id": "data1", "type": "line"}];
    $scope.linePointsZ = [{"x":0,"data1":0}, {"x":$scope.value.value[3],"data1":0},{"x":$scope.value.value[4],"data1":1},{"x":$scope.value.value[5],"data1":0}, {"x":1,"data1":0}];
    $scope.lineColumnsZ = [{"id": "data1", "type": "line"}];
    $scope.datax = {"id": "x"};

    // Remove existing Value
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        $scope.value.$remove($state.go('values.list'));
      }
    }

    $scope.testButton = function(){
      // console.log($scope.value.value);
      // console.log($scope.linePoints);
      $scope.linePoints = [{"x":0,"data1":0}, {"x":$scope.value.value[0],"data1":0},{"x":$scope.value.value[1],"data1":1},{"x":$scope.value.value[2],"data1":0}, {"x":1,"data1":0}];
      $scope.linePointsZ = [{"x":0,"data1":0}, {"x":$scope.value.value[3],"data1":0},{"x":$scope.value.value[4],"data1":1},{"x":$scope.value.value[5],"data1":0}, {"x":1,"data1":0}];
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
