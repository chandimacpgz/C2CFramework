(function () {
    'use strict';
    angular
        .module('chequeApp')
        .controller('homeController', homeController);

    homeController.$inject = ['$scope', '$state'];
    function homeController($scope, $state) {
        $scope.goToHome = function () {
            $state.go('home');
        }
    }
})();