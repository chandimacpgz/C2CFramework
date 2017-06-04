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
                if (state!== null) {
                    $scope.imageName = state;
                    $scope.showSpinner = true;
                    var liveChequePath = $scope.imageName;

                    //Recognize Cheque Data - BankId and Cheque Id
                    HomeService.getChequeDetection(liveChequePath).then(function (state) {
                        $scope.pathData = state;

                        if ($scope.pathData.bankId === 0 || $scope.pathData.bankId === undefined) {
                            $scope.showBankFail = true;
                            window.location.reload(true);
                            //////////////////////////////////////////////////////////////////////////////////////delete archieved cheque
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
                        if (state.numericalAmountCroppedImagePath !== null || state.numericalAmountCroppedImagePath !== undefined) {
                            $scope.showcropResultDone = true;
                            getUserInfo($scope.resultCrop);
                        }
                        else {
                            $scope.showcropResultFail = true;
                            window.location.reload(true)
                            $timeout(timer, 5000);
                        }
                    });

                });
            }

            var getUserInfo = function (liveChequePaths) {
                //Get MICR and AccountNo
                HomeService.GetUser(liveChequePaths).then(function (state) {
                    $scope.resultCrop = state;
                });
            }

            $timeout(timer, 1000); 
            
            
        });

        


    }
})();