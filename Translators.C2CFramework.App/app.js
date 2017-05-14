var app = angular.module('chequeApp', [
    'ui.router', 'ngMaterial', 'ngMessages', 'cfp.loadingBar', 'md.data.table', 'ngFileUpload'
]);

app.constant('endPoints', {
    //webApi: 'http://localhost:59056/'
    webApi: 'http://translatorsapi.azurewebsites.net/'


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
            templateUrl: 'views/home.html'
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

    function DialogController($scope, $mdDialog, BankService, Upload) {
        BankService.getBanks().then(function (state) {
            $scope.banks = state;
        });

        $scope.cancel = function () {
            $state.go('home');
            $mdDialog.hide();
        };

        if ($scope.chequeImage) {
            $scope.upload($scope.chequeImage);
        }

        $scope.next = function (file) {
            Upload.upload({
                url: 'http://translatorsapi.azurewebsites.net/cheques',
                data: { file: file, 'bankId': $scope.signaturecrop.bankid, 'name': $scope.signaturecrop.name }
            }).then(function (resp) {
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });


            $state.go('cheque');
            $mdDialog.hide();
        };
    }

});

app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('indigo', {
            'default': '400',
            'hue-1': '100',
            'hue-2': '600',
            'hue-3': 'A100'
        })
        .accentPalette('purple', {
            'default': '200'
        });
});

