(function () {
    'use strict';
    angular
        .module('chequeApp')
        .controller('addBankController', addBankController);

    addBankController.$inject = ['$location', '$scope', '$state', '$element', 'BankService'];
    function addBankController($location, $scope, $state, $element, BankService) {
        $scope.addBank = function () {
            BankService.addBank($scope.bank).then(function (state) {
                $scope.result = state.data;
                $location.path('/addBank');
            });
        }
    }
})();