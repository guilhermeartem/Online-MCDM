(function () {
  'use strict';

  // Decisions controller
  angular
    .module('decisions')
    .controller('DecisionsController', DecisionsController);

  DecisionsController.$inject = ['$scope', '$state', '$uibModal','Authentication', 'DecisionsService','ValuesService'];

  function DecisionsController ($scope, $state, $uibModal, Authentication, DecisionsService, ValuesService) {
    var vm = this;

    vm.authentication = Authentication;
    //vm.decision = decision;
    vm.error = null;
    vm.form = {};
    //vm.remove = remove;
    //vm.save = save;

    $scope.nCol = 0;
    $scope.nLin = 0;

    $scope.matrix = new DecisionsService();

    $scope.listValues = ValuesService.query();

    $scope.matrix.methodOptions = [];

    $scope.methodInput = {
      method: "",
      theta: 1
    };

    $scope.valueOptions = [
      { name: 'crisp', showName: 'Crisp' },
      { name: 'interval', showName: 'Interval' },
      { name: 'fuzzy', showName: 'Fuzzy' },
      { name: 'z-number', showName: 'Z-Number' }
    ];

    $scope.inputDimension = function(){

      var i;

      $scope.matrix.nAlt = $scope.nLin;
      $scope.matrix.nCrit = $scope.nCol;

      $scope.matrix.criteria = [];
      $scope.matrix.alternatives = [];
      $scope.matrix.evaluation = [];
      $scope.labels = [];
      $scope.coefficients = [];
      $scope.series = [];


      for(i = 0; i < $scope.matrix.nAlt; i++){
        $scope.matrix.alternatives.push({ name:'' });
      }

      for(i = 0; i < $scope.matrix.nCrit; i++){
        $scope.matrix.criteria.push({ name:'',weight:0,benefit:false,type:'' });
      }

      for(i=0; i<$scope.matrix.nAlt; i++) {
        $scope.matrix.evaluation[i] = [];
        for(var j=0; j<$scope.matrix.nCrit; j++) {
          $scope.matrix.evaluation[i][j] = undefined;
        }
      }

    };

    $scope.inputMethod = function () {
      if($scope.methodInput.method !== ''){
        var aux = {};
        aux.method = $scope.methodInput.method;
        aux.theta = $scope.methodInput.theta;
        $scope.matrix.methodOptions.push(aux);
      }
    };

    $scope.openTunning = function (inType, inValue) {

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'myModalContent.html',
        controller: 'ModalTunningController',
        size: 'lg',
        resolve: {
          type: function(){
            return inType;
          },
          value: function(){
            return inValue;
          }
        }
      });

      modalInstance.result.then(function (updatedValue) {
        inValue = updatedValue;
      });
    };

    $scope.submitTable = function() {

      var i, j;

      console.log($scope.matrix);
      var old = new DecisionsService($scope.matrix);
      $scope.matrix.$save(function (response) {
        $scope.res = response.results;

        console.log('aki');
        $scope.labels = [];
        $scope.series = [];
        $scope.coefficients = [];


        // for(j = 0; j < $scope.res.length; j++){
        //
        // }
        //
        // if($scope.res.methodOptions.topsis){
        //   $scope.series.push('TOPSIS');
        //   $scope.coefficients.push([]);
        //   for(i = 0; i < $scope.res.closenessTopsis.length; i++){
        //     console.log($scope.res.closenessTopsis[i]);
        //     $scope.labels.push($scope.res.closenessTopsis[i].name);
        //     $scope.coefficients[0].push($scope.res.closenessTopsis[i].coefficient);
        //   }
        // }
        // if($scope.res.methodOptions.todim){
        //   $scope.series.push('TODIM');
        //   $scope.coefficients.push([]);
        //   $scope.labels = [];
        //   for(i = 0; i < $scope.res.closenessTodim.length; i++){
        //     console.log($scope.res.closenessTodim[i]);
        //     $scope.labels.push($scope.res.closenessTodim[i].name);
        //     $scope.coefficients[$scope.coefficients.length - 1].push($scope.res.closenessTodim[i].coefficient);
        //   }
        // }
        $scope.matrix = old;
        //console.log($scope.old);
        console.log(response);
        console.log($scope.labels);
        console.log($scope.coefficients);
        // console.log($scope.matrix);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });

    };


  }
})();

//// Remove existing Decision
//function remove() {
//    if (confirm('Are you sure you want to delete?')) {
//        vm.decision.$remove($state.go('decisions.list'));
//    }
//}
//
//// Save Decision
//function save(isValid) {
//    if (!isValid) {
//        $scope.$broadcast('show-errors-check-validity', 'vm.form.decisionForm');
//        return false;
//    }
//
//    // TODO: move create/update logic to service
//    if (vm.decision._id) {
//        vm.decision.$update(successCallback, errorCallback);
//    } else {
//        vm.decision.$save(successCallback, errorCallback);
//    }
//
//    function successCallback(res) {
//        $state.go('decisions.view', {
//            decisionId: res._id
//        });
//    }
//
//    function errorCallback(res) {
//        vm.error = res.data.message;
//    }
//}
