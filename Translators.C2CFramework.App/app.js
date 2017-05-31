var app = angular.module('chequeApp', [
    'ui.router', 'ngMaterial', 'ngMessages', 'cfp.loadingBar', 'md.data.table', 'ngFileUpload'
]);

app.constant('endPoints', {
    webApi: 'http://localhost:59056/'
    //webApi: 'http://translatorsapi.azurewebsites.net/'


});

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");
    $stateProvider
        //.state('dashboard',
        //{
        //    url: "/dashboard",
        //    templateUrl: 'views/dashboard.html',
        //    controller: 'dashboardController'
        //})
        .state('home',
        {
            url: "/home",
            templateUrl: 'views/home.html',
            controller: 'homeController'
        })
        .state('bank',
        {
            url: "/bank",
            templateUrl: 'views/bank.html',
            controller: 'bankController'
        })
        .state('cheque',
        {
            url: "/cheque",
            templateUrl: 'views/cheque.html',
            controller: 'chequeController'
        })
});

app.controller('navBarController', function ($scope, $state, $mdDialog) {

    $scope.goToHome = function () {
        $state.go('home');
    };
    $scope.goToAddBank = function () {
        $state.go('bank');
    };
    //$scope.goToAddCheque = function () {
    //    $state.go('cheque');
    //};

    $scope.goToAddCheque = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'views/basicCheque.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
    };

    function DialogController($scope, $mdDialog, BankService, Upload, endPoints) {
        BankService.getBanks().then(function (state) {
            $scope.banks = state;
        });

        $scope.cancel = function () {
            $state.go('home');
            $mdDialog.hide();
        };

        //if ($scope.chequeImage) {
        //    $scope.upload($scope.chequeImage);
        //}
        
        $scope.next = function () {
            var file = $scope.files
            file.upload = Upload.http({
                url: endPoints.webApi + 'chequesAdd',
                data: { name: $scope.cheque.name, bankId: $scope.cheque.bankid },
                file: file 
            });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
            
        


        $state.go('cheque');
        $mdDialog.hide();
        };
    };
});

app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('teal', {
            'default': '400',
            'hue-1': '100',
            'hue-2': '600',
            'hue-3': 'A100'
        })
        .accentPalette('cyan', {
            'default': '200'
        });
});

