/**
 * Created by sbunke on 9/8/2014.
 */
angular.module('routeApp', ['ui.router'])
.controller('DemoController', function($scope){
        $scope.test = 'test - this is it';
        $scope.id = 99;
        $scope.partyLocation = 'my place';
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

            .state('partyDetail', {
                url: '/party/:partyID/:partyLocation',
                templateUrl: 'partials/partyDetails.html',
                controller: function($scope, $stateParams) {
                    $scope.id = $stateParams.partyID;
                    $scope.location = $stateParams.partyLocation;
                }
            })

    });