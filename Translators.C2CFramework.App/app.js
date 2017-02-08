var app = angular.module('chequeApp', [
  'ui.router', 'ngMaterial', 'ngMessages', 'cfp.loadingBar'
]);

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

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/dashboard");
    $stateProvider
        .state('dashboard',
        {
            url: "/dashboard",
            templateUrl: 'views/dashboard.html',
            controller: 'dashboardController'
        })
});