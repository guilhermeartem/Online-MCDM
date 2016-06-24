(function () {
  'use strict';

  // Decisions controller
  angular
    .module('decisions')
    .controller('DecisionsController', DecisionsController);

  DecisionsController.$inject = ['$scope', '$state', '$window', '$uibModal','Authentication', 'DecisionsService','ValuesService'];

  function DecisionsController ($scope, $state, $window, $uibModal, Authentication, DecisionsService, ValuesService) {
    var vm = this;

    vm.authentication = Authentication;
    //vm.decision = decision;
    vm.error = null;
    vm.form = {};
    //vm.remove = remove;
    //vm.save = save;

    // Array Remove - By John Resig (MIT Licensed)
    Array.prototype.remove = function(from, to) {
      var rest = this.slice((to || from) + 1 || this.length);
      this.length = from < 0 ? this.length + from : from;
      return this.push.apply(this, rest);
    };

    $scope.state = 0;

    $scope.index = 0;

    $scope.graphToShow = "bar";

    $scope.nCol = 1;
    $scope.nLin = 2;

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

    $scope.inputDimension = function(valid){

      if(!valid){
        return;
      }

      var i;

      $scope.matrix.nAlt = $scope.nLin;
      $scope.matrix.nCrit = $scope.nCol;

      $scope.matrix.criteria = [];
      $scope.matrix.alternatives = [];
      $scope.matrix.evaluation = [];
      $scope.evaluationAux = [];
      $scope.labels = [];
      $scope.coefficients = [];
      $scope.series = [];

      $scope.state = 1;


      for(i = 0; i < $scope.matrix.nAlt; i++){
        $scope.matrix.alternatives.push({ name:'' });
      }

      for(i = 0; i < $scope.matrix.nCrit; i++){
        $scope.matrix.criteria.push({ name:'',weight:0,benefit:false,type:'' });
      }

      for(i=0; i<$scope.matrix.nAlt; i++) {
        $scope.matrix.evaluation[i] = [];
        $scope.evaluationAux[i] = [];
        for(var j=0; j<$scope.matrix.nCrit; j++) {
          $scope.matrix.evaluation[i][j] = undefined;
          $scope.evaluationAux[i][j] = undefined;
        }
      }

    };

    $scope.inputMethod = function () {
      if($scope.matrix.methodOptions.length === 5){
        return;
      }
      if($scope.methodInput.method !== ''){
        var i;
        for(i = 0; i < $scope.matrix.methodOptions.length; i++){
          if($scope.matrix.methodOptions[i].method === $scope.methodInput.method && $scope.matrix.methodOptions[i].theta === $scope.methodInput.theta){
            return;
          }
        }
        var aux = {};
        aux.method = $scope.methodInput.method;
        aux.theta = $scope.methodInput.theta;
        $scope.matrix.methodOptions.push(aux);
      }
    };

    $scope.deleteMethodOption = function (index) {
      $scope.matrix.methodOptions.remove(index);
    };

    $scope.okAlternativeAndCriteria = function () {
      var i, sum = 0;
      if($scope.matrix.methodOptions.length === 0){
        $window.alert("Insert at least one method")
        return;
      }
      for(i = 0; i < $scope.matrix.nAlt; i++){
        if($scope.matrix.alternatives[i].name == ""){
          $window.alert("Alternative name is required")
          return;
        }
      }
      for(i = 0; i < $scope.matrix.nCrit; i++){
        sum += $scope.matrix.criteria[i].weight;
        if($scope.matrix.criteria[i].name == ""){
          $window.alert("Criterion name is required")
          return;
        }
        if($scope.matrix.criteria[i].type == ""){
          $window.alert("Criterion type is required")
          return;
        }
      }
      if(sum !== 1.0 ){
        $window.alert("Sum of the criteria weights must be equal to 1")
        return;
      }
      $scope.state = 2;
    };

    $scope.okOptions = function () {
      var i, j;
      for(i = 0; i < $scope.matrix.nAlt; i++){
        for(j = 0; j < $scope.matrix.nCrit; j++){
          if($scope.evaluationAux[i][j] == null){
            $window.alert("Evaluation value is required")
            return;
          }
        }
      }
      for(i = 0; i < $scope.matrix.nAlt; i++){
        for(j = 0; j < $scope.matrix.nCrit; j++){
          $scope.matrix.evaluation[i][j] = angular.copy($scope.evaluationAux[i][j].value);
        }
      }
      $scope.state = 3;
    };

    $scope.voltar = function () {
      $scope.state = $scope.state - 1;
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

    $scope.rankCloseness = function (closeness, alternative){
      var aux = closeness.slice();
      aux.sort(function (a, b) {
        return b.coefficient - a.coefficient;
      });
      return aux.indexOf(alternative) + 1;
    };

    $scope.submitTable = function() {

      var i, j;

      console.log($scope.matrix);
      var old = new DecisionsService($scope.matrix);
      $scope.matrix.$save(function (response) {
        $scope.state = 4;
        $scope.res = response.results;

        console.log('aki');
        $scope.labels = [];
        $scope.series = [];
        $scope.coefficients = [];


        for(j = 0; j < $scope.res.length; j++){
          if($scope.res[j].method === 'topsis'){
            $scope.series.push($scope.res[j].method);
          } else {
            $scope.series.push($scope.res[j].method.concat(' theta = ', $scope.res[j].theta.toString()));
          }
          $scope.coefficients.push([]);
          $scope.labels = [];
          for(i = 0; i < $scope.res[j].closeness.length; i++){
            $scope.labels.push($scope.res[j].closeness[i].name);
            $scope.coefficients[$scope.coefficients.length - 1].push($scope.res[j].closeness[i].coefficient);
          }
        }

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
