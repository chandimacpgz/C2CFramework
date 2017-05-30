(function () {
    'use strict';
    angular
        .module('chequeApp')
        .controller('homeController', homeController);

    homeController.$inject = ['$location', '$scope', '$state', '$element', 'HomeService', 'cfpLoadingBar','$timeout'];
    function homeController($location, $scope, $state, $element, HomeService, cfpLoadingBar, $timeout) {
        cfpLoadingBar.start();
        $scope.showSpinner = false;
        HomeService.getImageName().then(function (state) {
            cfpLoadingBar.complete();
            state.success = true;

            var timer = function () {
                if (state.success != false) {
                    $scope.imageName = state;
                    $scope.showSpinner = true;
                    var liveChequePath = $scope.imageName;
                    HomeService.getChequeDetection(liveChequePath).then(function (state) {

                    });
                }
                else {
                    $state.reload();
                }
            }
            $timeout(timer, 1000); 
            
            
        });

        


    }
})();