(function () {
    'use strict';
    angular
        .module('chequeApp')
        .controller('dashboardController', dashboardController);

    dashboardController.$inject = ['$scope', '$state'];
    function dashboardController($scope, $state) {
        $scope.goToHome = function () {
            $state.go('home');
        };
        $scope.goToAddBank = function () {
            $state.go('addBank');
        };
        $scope.goToAddCheque = function () {
            $state.go('addCheque');
        };

    }
})();