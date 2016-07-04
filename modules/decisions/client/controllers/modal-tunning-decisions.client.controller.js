'use strict';

angular.module('decisions').controller('ModalTunningController', function ($scope, $uibModalInstance, type, value) {

    $scope.type = type;
    $scope.value = value;

    $scope.ctrlCrispSlider = {};
    $scope.ctrlIntervalSlider = {};
    $scope.ctrlFuzzySlider = {};
    $scope.ctrlZrelSlider = {};

    $scope.crispSlider = [
        {value: $scope.value[0], title: 'Value = ', component: 'value'}
    ];

    $scope.intervalSlider = [
        {value: $scope.value[0], title: 'Left Value = ', component: 'Left'},
        {value: $scope.value[1], title: 'Right Value = ', component: 'Right'}
    ];

    $scope.fuzzySlider = [
        {value: $scope.value[0], title: 'Left Value = ', component: 'Left'},
        {value: $scope.value[1], title: 'Center Value = ', component: 'Center'},
        {value: $scope.value[2], title: 'Right Value = ', component: 'Right'}
    ];

    $scope.ZrelSlider= [
        {value: $scope.value[3], title: 'Left Value = ', component: 'Left'},
        {value: $scope.value[4], title: 'Center Value = ', component: 'Center'},
        {value: $scope.value[5], title: 'Right Value = ', component: 'Right'}
    ];

    console.log($scope.fuzzySlider);

    $scope.linePoints = [{"x":0,"data1":0}, {"x":$scope.value[0],"data1":0},{"x":$scope.value[1],"data1":1},{"x":$scope.value[2],"data1":0}, {"x":1,"data1":0}];
    $scope.lineColumns = [{"id": "data1", "type": "line"}];
    $scope.linePointsZ = [{"x":0,"data1":0}, {"x":$scope.value[3],"data1":0},{"x":$scope.value[4],"data1":1},{"x":$scope.value[5],"data1":0}, {"x":1,"data1":0}];
    $scope.lineColumnsZ = [{"id": "data1", "type": "line"}];

    $scope.datax = {"id": "x"};

    $scope.clickCrispSlider = function(){
        $scope.value[0] = $scope.crispSlider[0].value;
        $scope.ctrlIntervalSlider.updateSlider();
    };

    $scope.clickIntervalSlider = function(){
        var aux = [$scope.intervalSlider[0].value, $scope.intervalSlider[1].value];
        aux.sort();
        $scope.intervalSlider[0].value = aux[0];
        $scope.intervalSlider[1].value = aux[1];
        $scope.value[0] = $scope.intervalSlider[0].value;
        $scope.value[1] = $scope.intervalSlider[1].value;
        $scope.ctrlIntervalSlider.updateSlider();
    };

    $scope.clickFuzzySlider = function(){
        console.log("aki");
        var aux = [$scope.fuzzySlider[0].value, $scope.fuzzySlider[1].value, $scope.fuzzySlider[2].value];
        aux.sort();
        $scope.fuzzySlider[0].value = aux[0];
        $scope.fuzzySlider[1].value = aux[1];
        $scope.fuzzySlider[2].value = aux[2];
        $scope.value[0] = $scope.fuzzySlider[0].value;
        $scope.value[1] = $scope.fuzzySlider[1].value;
        $scope.value[2] = $scope.fuzzySlider[2].value;
        $scope.ctrlFuzzySlider.updateSlider();
        $scope.linePoints = [{"x":0,"data1":0}, {"x":$scope.value[0],"data1":0},{"x":$scope.value[1],"data1":1},{"x":$scope.value[2],"data1":0}, {"x":1,"data1":0}];
    };

    $scope.clickZrelSlider = function(){
        var aux = [$scope.ZrelSlider[0].value, $scope.ZrelSlider[1].value, $scope.ZrelSlider[2].value];
        aux.sort();
        $scope.ZrelSlider[0].value = aux[0];
        $scope.ZrelSlider[1].value = aux[1];
        $scope.ZrelSlider[2].value = aux[2];
        $scope.value[3] = $scope.ZrelSlider[0].value;
        $scope.value[4] = $scope.ZrelSlider[1].value;
        $scope.value[5] = $scope.ZrelSlider[2].value;
        $scope.ctrlZrelSlider.updateSlider();
        $scope.linePointsZ = [{"x":0,"data1":0}, {"x":$scope.value[3],"data1":0},{"x":$scope.value[4],"data1":1},{"x":$scope.value[5],"data1":0}, {"x":1,"data1":0}];
    };

    $scope.okInputManual = function (type) {
        if(type === 'crisp'){
            $scope.crispSlider[0].value = $scope.value[0];
            $scope.ctrlCrispSlider.updateSlider();
        }
        if(type === 'interval'){
            $scope.intervalSlider[0].value = $scope.value[0];
            $scope.intervalSlider[1].value = $scope.value[1];
            $scope.ctrlIntervalSlider.updateSlider();
        }
        if(type === 'fuzzy'){
            $scope.fuzzySlider[0].value = $scope.value[0];
            $scope.fuzzySlider[1].value = $scope.value[1];
            $scope.fuzzySlider[2].value = $scope.value[2];
            $scope.ctrlFuzzySlider.updateSlider();
        }
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.value);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
