(function () {
    'use strict';
    angular
        .module('chequeApp')
        .controller('addChequeController', addChequeController);

    addChequeController.$inject = ['$scope', '$state', '$element'];
    function addChequeController($scope, $state, $element) {
        //var input = document.getElementById('input');
        var input = angular.element(document.getElementById('input'));
        input.addEventListener('change', handleFiles, false);
    }
})();