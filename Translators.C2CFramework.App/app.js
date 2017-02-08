var app = angular.module('chequeApp', [
  'ui.router', 'ngMaterial', 'ngMessages', 'cfp.loadingBar'
]);

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
        .state('addCheque',
        {
            url: "/addCheque",
            templateUrl: 'views/addCheque.html',
            controller: 'addChequeController'
        })
});

app.controller('navBarController', function ($scope,$state) {

    $scope.goToHome = function () {
        $state.go('home');
    };
    $scope.goToAddCheque = function () {
        $state.go('addCheque');
    };

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

