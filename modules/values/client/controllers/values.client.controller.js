(function () {
  'use strict';

  // Values controller
  angular
    .module('values')
    .controller('ValuesController', ValuesController);

  ValuesController.$inject = ['$scope', '$state', '$timeout', 'Authentication', 'valueResolve'];

  function ValuesController ($scope, $state, $timeout, Authentication, value) {
    var vm = this;

    vm.authentication = Authentication;

    $scope.state = 0;

    $scope.value = value;
    if(!$scope.value._id){
      $scope.value.value = [0,0,0,0,0,0];
      $scope.value.minValue = 0;
      $scope.value.maxValue = 1;
    }

    $scope.ctrlCrispSlider = {};
    $scope.ctrlIntervalSlider = {};
    $scope.ctrlFuzzySlider = {};
    $scope.ctrlZrelSlider = {};

    vm.crispSlider = [
      {value: $scope.value.value[0], title: 'Value = ', component: 'value'}
    ];

    vm.intervalSlider = [
      {value: $scope.value.value[0], title: 'Left Value = ', component: 'Left'},
      {value: $scope.value.value[1], title: 'Right Value = ', component: 'Right'}
    ];
    
    vm.fuzzySlider = [
      {value: $scope.value.value[0], title: 'Left Value = ', component: 'Left'},
      {value: $scope.value.value[1], title: 'Center Value = ', component: 'Center'},
      {value: $scope.value.value[2], title: 'Right Value = ', component: 'Right'}
    ];

    vm.ZrelSlider= [
      {value: $scope.value.value[3], title: 'Left Value = ', component: 'Left'},
      {value: $scope.value.value[4], title: 'Center Value = ', component: 'Center'},
      {value: $scope.value.value[5], title: 'Right Value = ', component: 'Right'}
    ];

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

    $scope.clickCrispSlider = function(){
      $scope.value.value[0] = vm.crispSlider[0].value;
      $scope.ctrlCrispSlider.updateSlider();
    };

    $scope.clickIntervalSlider = function(){
      var aux = [vm.intervalSlider[0].value, vm.intervalSlider[1].value];
      aux.sort();
      vm.intervalSlider[0].value = aux[0];
      vm.intervalSlider[1].value = aux[1];
      $scope.value.value[0] = vm.intervalSlider[0].value;
      $scope.value.value[1] = vm.intervalSlider[1].value;
      $scope.ctrlIntervalSlider.updateSlider();
    };

    $scope.clickFuzzySlider = function(){
      var aux = [vm.fuzzySlider[0].value, vm.fuzzySlider[1].value, vm.fuzzySlider[2].value];
      aux.sort();
      vm.fuzzySlider[0].value = aux[0];
      vm.fuzzySlider[1].value = aux[1];
      vm.fuzzySlider[2].value = aux[2];
      $scope.value.value[0] = vm.fuzzySlider[0].value;
      $scope.value.value[1] = vm.fuzzySlider[1].value;
      $scope.value.value[2] = vm.fuzzySlider[2].value;
      $scope.ctrlFuzzySlider.updateSlider();
      $scope.linePoints = [{"x":0,"data1":0}, {"x":$scope.value.value[0],"data1":0},{"x":$scope.value.value[1],"data1":1},{"x":$scope.value.value[2],"data1":0}, {"x":1,"data1":0}];
    };

    $scope.clickZrelSlider = function(){
      var aux = [vm.ZrelSlider[0].value, vm.ZrelSlider[1].value, vm.ZrelSlider[2].value];
      aux.sort();
      vm.ZrelSlider[0].value = aux[0];
      vm.ZrelSlider[1].value = aux[1];
      vm.ZrelSlider[2].value = aux[2];
      $scope.value.value[3] = vm.ZrelSlider[0].value;
      $scope.value.value[4] = vm.ZrelSlider[1].value;
      $scope.value.value[5] = vm.ZrelSlider[2].value;
      $scope.ctrlZrelSlider.updateSlider();
      $scope.linePointsZ = [{"x":0,"data1":0}, {"x":$scope.value.value[3],"data1":0},{"x":$scope.value.value[4],"data1":1},{"x":$scope.value.value[5],"data1":0}, {"x":1,"data1":0}];
    };

    $scope.initf = function () {
      vm.fuzzySlider = [
        {value: $scope.value.value[0], title: 'Left Value = ', component: 'Left'},
        {value: $scope.value.value[1], title: 'Center Value = ', component: 'Center'},
        {value: $scope.value.value[2], title: 'Right Value = ', component: 'Right'}
      ];
    };

    $scope.okInputManual = function (type) {
      if(type === 'crisp'){
        vm.crispSlider[0].value = $scope.value.value[0];
        $scope.ctrlCrispSlider.updateSlider();
      }
      if(type === 'interval'){
        vm.intervalSlider[0].value = $scope.value.value[0];
        vm.intervalSlider[1].value = $scope.value.value[1];
        $scope.ctrlIntervalSlider.updateSlider();
      }
      if(type === 'fuzzy'){
        vm.fuzzySlider[0].value = $scope.value.value[0];
        vm.fuzzySlider[1].value = $scope.value.value[1];
        vm.fuzzySlider[2].value = $scope.value.value[2];
        $scope.ctrlFuzzySlider.updateSlider();
      }
    };

    $scope.inputValues = function () {
      $scope.value.value[0] = $scope.value.value[1] = $scope.value.value[2] = $scope.value.value[3] = $scope.value.value[4] = $scope.value.value[5] = ($scope.value.minValue + $scope.value.maxValue) / 2;
      vm.crispSlider = [
        {value: $scope.value.value[0], title: 'Value = ', component: 'value'}
      ];

      vm.intervalSlider = [
        {value: $scope.value.value[0], title: 'Left Value = ', component: 'Left'},
        {value: $scope.value.value[1], title: 'Right Value = ', component: 'Right'}
      ];

      vm.fuzzySlider = [
        {value: $scope.value.value[0], title: 'Left Value = ', component: 'Left'},
        {value: $scope.value.value[1], title: 'Center Value = ', component: 'Center'},
        {value: $scope.value.value[2], title: 'Right Value = ', component: 'Right'}
      ];

      vm.ZrelSlider= [
        {value: $scope.value.value[3], title: 'Left Value = ', component: 'Left'},
        {value: $scope.value.value[4], title: 'Center Value = ', component: 'Center'},
        {value: $scope.value.value[5], title: 'Right Value = ', component: 'Right'}
      ];
      console.log($scope.value.value);
      $timeout(function () {$scope.state = 1;console.log("timeout");},20);
    };

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
