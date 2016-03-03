(function () {
  'use strict';

  // Decisions controller
  angular
    .module('decisions')
    .controller('DecisionsController', DecisionsController);

  DecisionsController.$inject = ['$scope', '$state', 'Authentication', 'DecisionsService'];

  function DecisionsController ($scope, $state, Authentication, DecisionsService) {
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

    $scope.inputDimension = function(){
      var i;

      $scope.matrix.nAlt = $scope.nLin;
      $scope.matrix.nCrit = $scope.nCol;

      console.log($scope.matrix.nAlt);
      console.log($scope.matrix.nCrit);

      $scope.matrix.criteria = [];
      $scope.matrix.alternatives = [];
      $scope.matrix.evaluation = [];


      for(i = 0; i < $scope.matrix.nAlt; i++){
        $scope.matrix.alternatives.push({ name:'' });
      }

      for(i = 0; i < $scope.matrix.nCrit; i++){
        $scope.matrix.criteria.push({ name:'',weight:0,benefit:false });
      }

      for(i=0; i<$scope.matrix.nAlt; i++) {
        $scope.matrix.evaluation[i] = [];
        for(var j=0; j<$scope.matrix.nCrit; j++) {
          $scope.matrix.evaluation[i][j] = undefined;
        }
      }

    };

    $scope.submitTable = function() {

      console.log($scope.matrix);
      var old = new DecisionsService($scope.matrix);
      $scope.matrix.$save(function (response) {
        $scope.res = response;
        $scope.matrix = old;
        //console.log($scope.old);
        console.log(response);
        console.log($scope.matrix);
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