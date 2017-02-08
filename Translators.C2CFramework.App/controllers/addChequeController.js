(function () {
    'use strict';
    angular
        .module('chequeApp')
        .controller('addChequeController', addChequeController);

    addChequeController.$inject = ['$scope', '$state'];
    function addChequeController($scope, $state) {
        $scope.goToHome = function () {
            $state.go('home');
        }
    }
})();