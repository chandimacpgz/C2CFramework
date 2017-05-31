(function () {
    'use strict';
    angular
        .module('chequeApp')
        .controller('homeController', homeController);

    homeController.$inject = ['$location', '$scope', '$state', '$element', 'HomeService', 'cfpLoadingBar', '$timeout', 'endPoints','$templateCache'];
    function homeController($location, $scope, $state, $element, HomeService, cfpLoadingBar, $timeout, endPoints, $templateCache) {
        cfpLoadingBar.start();
        $scope.showSpinner = false;
        $scope.showBank = false;
        $scope.showBankFail = false;
        $scope.showcropResultDone = false;
        $scope.showcropResultFail = false;

        //Get Live Cheque Image Name
        HomeService.getImageName().then(function (state) {      
            cfpLoadingBar.complete();

            var timer = function () {
                if (state!= null) {
                    $scope.imageName = state;
                    $scope.showSpinner = true;
                    var liveChequePath = $scope.imageName;

                    //Recognize Cheque Data - BankId and Cheque Id
                    HomeService.getChequeDetection(liveChequePath).then(function (state) {
                        $scope.pathData = state;

                        if ($scope.pathData.bankId == 0) {
                            $scope.showBankFail = true;
                            //////////////////////////////////////////////////////////////////////////////////////should clear cache
                            $timeout(timer, 5000);
                        }

                        else {
                            getBankInfo();
                        }
                        
                    });
                }
                else {
                    $templateCache.removeAll();
                    $state.reload();
                }
            }

            var getBankInfo = function () {
                //Get Bank Details according to BankId
                HomeService.getBankName($scope.pathData.bankId).then(function (state) {
                    $scope.BankData = state;
                    $scope.showBank = true;
                    var cropChequeData = {
                        "liveChequeImageFrontPath": "~/ChequeImageData/ArchievedCheques/" + $scope.imageName,
                        "bankId": $scope.pathData.bankId,
                        "chequeId": $scope.pathData.chequeId
                    };


                    //Send the cheque for crop function
                    HomeService.cropCheque(cropChequeData).then(function (state) {
                        $scope.resultCrop = state;
                        if (state.isDeleted == false) {
                            $scope.showcropResultDone = true;
                        }
                        else {
                            $scope.showcropResultFail = true;
                            $templateCache.removeAll();
                            $timeout(timer, 5000);
                        }
                    });

                });
            }

            $timeout(timer, 1000); 
            
            
        });

        


    }
})();