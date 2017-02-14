(function () {
    'use strict';
    angular
        .module('chequeApp')
        .controller('chequeController', chequeController);

    chequeController.$inject = ['$scope', '$state', '$element'];
    function chequeController($scope, $state, $element) {
        //var input = document.getElementById('input');
        var input = angular.element(document.getElementById('input'));
        input.addEventListener('change', handleFiles, false);
    }
})();