(function () {
    'use strict';
    angular
        .module('chequeApp')
        .controller('dashboardController', leaveDashboardController);

    leaveDashboardController.$inject = ['$scope', '$state'];
    function leaveDashboardController($scope, $state) {

        $scope.goToLeave = function () {
            $state.go('activities');
        }

        $scope.goToLeaveForm = function () {
            $state.go('leaveForm');
        }

        $scope.goToBalances = function () {
            $state.go('balances');
        }
        $scope.goToIndexProfile = function () {
            $state.go('leaveIndexProfile');
        }
        $scope.goToRules = function () {
            $state.go('rules');
        }

        $scope.goToSetApprovers = function () {
            $state.go('getgroups');
        }
        $scope.goToLeaveRequest = function () {
            $state.go('leaveRequest');
        }

    }

})();