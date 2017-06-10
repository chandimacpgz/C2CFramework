(function () {
    'use strict';
    angular
        .module('chequeApp')
        .controller('homeController', homeController);

    homeController.$inject = ['$location', '$scope', '$state', '$element', 'HomeService', 'cfpLoadingBar', '$timeout', 'endPoints', '$templateCache','$mdDialog'];
    function homeController($location, $scope, $state, $element, HomeService, cfpLoadingBar, $timeout, endPoints, $templateCache, $mdDialog) {
        cfpLoadingBar.start();
        $scope.showSpinner = false;
        $scope.showBank = false;
        $scope.showBankFail = false;
        $scope.showcropResultDone = false;
        $scope.showcropResultFail = false;
        $scope.showUserDetails = false;
        $scope.showMICRFail = false;
        $scope.showSignatureDone = false;
        $scope.showSignatureFail = false;
        $scope.showDateFail = false;
        

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
                            var error = "Cheque Detection Failed, Insert again. Restarting in 5 seconds"
                            showError(error);
                            $scope.showBankFail = true;
                            //////////////////////////////////////////////////////////////////////////////////////delete archieved cheque
                        }
                        else {
                            $scope.showSpinner = false;
                            getBankInfo();
                        }
                    });
                }
                else {
                    window.location.reload(true);
                    $timeout(timer, 5000);
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
                        if (state.numericalAmountCroppedImagePath != null || state.numericalAmountCroppedImagePath != undefined) {
                            $scope.showcropResultDone = true;
                            getUserInfo($scope.resultCrop);
                        }
                        else {
                            $scope.showcropResultFail = true;
                            var error = "Cheque Cropping Failed, Insert again. Restarting in 5 seconds";
                            showError(error);
                        }
                    });

                });
            }

            var getUserInfo = function (liveChequePaths) {
                //Get MICR and AccountNo
                HomeService.getUser(liveChequePaths).then(function (state) {
                    $scope.userData = state;
                    if ($scope.userData.id !== null) { ////////////////////////////////////////correct the condition
                        $scope.showUserDetails = true;
                        getSignatureVerification(liveChequePaths, $scope.userData);
                    }

                    else if ($scope.userData === null) {
                        $scope.showDateFail = true;
                        var error = "Invalid Date, Cannot Proceed. Restarting in 5 seconds";
                        showError(error);
                    }
                    else {
                        $scope.showMICRFail = true;
                        var error = "MICR Detection Failed, Cannot Proceed. Restarting in 5 seconds";
                        showError(error);
                    }
                });
            }

            var getSignatureVerification = function (liveChequePaths, userDetails) {
                //Get Signature Verification
                var SignatureData = {
                    "path": liveChequePaths.signatureCroppedImagePath,
                    "id": userDetails.id
                };
                HomeService.getSignature(SignatureData).then(function (state) {
                    $scope.userSignature = state;
                    if ($scope.userSignature === true) {
                        $scope.showSignatureDone = true;
                    }
                    else {
                        $scope.showSignatureFail = true;
                        var error = "Invalid Signature, Cannot Proceed. Restarting in 5 seconds";
                        showError(error);
                    }
                });

            }

            var getNumericalAmountVerification = function (liveChequePaths) {
                //Get Courtesy Amount
                var courtesyeData = {
                    "path": liveChequePaths.numericalAmountCroppedImagePath
                };
                HomeService.getNumericalAmount(courtesyeData).then(function (state) { ////////////////////check returns
                    $scope.numericalValue = state;
                    if ($scope.userSignature === true) {
                        $scope.showSignatureDone = true;
                    }
                    else {
                        $scope.showSignatureFail = true;
                        var error = "Invalid Signature, Cannot Proceed. Restarting in 5 seconds";
                        showError(error);
                    }
                });

            }

            $timeout(timer, 1000); 
            
            
        });

        function showError(error) {
            var confirm = $mdDialog.confirm()
                .title('Something went wrong!!!')
                .textContent(error)
                .ariaLabel('Alert')
                .targetEvent()
                .ok('Reload');

            $mdDialog.show(confirm).then(function () {
                reloadApp();
            });
        };

        var reloadApp = function () {
            window.location.reload(true);
            $timeout(timer, 5000);
        };


    };

})();