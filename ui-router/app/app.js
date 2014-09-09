/**
 * Created by sbunke on 9/8/2014.
 */
angular.module('routeApp', ['ui.router'])
.controller('DemoController', function($scope){
        $scope.test = 'test - this is it';
    })
    .controller('InboxController', function($scope, $stateParams){
        $scope.inboxId = $stateParams.inboxId;
    })
    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'partials/partial-home.html'
            })

            .state('start', {
                url: '/start',
                templateUrl: 'partials/start.html'
            })

            .state('inbox', {
                url: '/inbox/:inboxId',
                templateUrl: 'partials/inbox.html',
                controller: 'InboxController'

            })

    });