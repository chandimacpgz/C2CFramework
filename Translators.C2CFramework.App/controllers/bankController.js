(function () {
    'use strict';
    angular
        .module('chequeApp')
        .controller('bankController', bankController);

    bankController.$inject = ['$location', '$scope', '$state', '$element', 'BankService', 'cfpLoadingBar'];
    function bankController($location, $scope, $state, $element, BankService, cfpLoadingBar) {
        cfpLoadingBar.start();
        BankService.getBanks().then(function (state) {
            cfpLoadingBar.complete();
            $scope.banks = state;
        });

        $scope.addBank = function () {
            BankService.addBank($scope.bank).then(function (state) {
                $scope.result = state.data;
                $state.reload();
            });
        }


    }
})();