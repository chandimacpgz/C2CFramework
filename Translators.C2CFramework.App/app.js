var app = angular.module('chequeApp', [
    'ui.router', 'ngMaterial', 'ngMessages', 'cfp.loadingBar', 'md.data.table', 'ngFileUpload'
]);

app.constant('endPoints', {
    webApi: 'http://localhost:59056/'
    //webApi: 'http://c2capi.azurewebsites.net/'
});

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");
    $stateProvider
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

app.controller('navBarController', function ($scope, $state, $mdDialog, $rootScope) {

    $scope.goToHome = function () {
        $state.go('home');
    };
    $scope.goToAddBank = function () {
        $state.go('bank');
    };

    $scope.goToAddCheque = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'views/basicCheque.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen
        });
    };

    function DialogController($scope, $mdDialog, BankService, Upload, endPoints, $timeout, $rootScope) {
        BankService.getBanks().then(function (state) {
            $scope.banks = state;
        });

        $scope.cancel = function () {
            $state.go('home');
            $mdDialog.hide();
        };

        $scope.next = function () {
            var file = $scope.files
            file.upload = Upload.upload({
                url: endPoints.webApi + 'cheques',
                method: 'POST',
                data: { file: file, name: $scope.cheque.name, bankId: $scope.cheque.bankid },

            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                    $rootScope.currentCheque = file.result;
                    if ($rootScope.currentCheque != undefined) {
                        $state.go('cheque');
                        $mdDialog.hide();
                    }
                });
            });

            
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

