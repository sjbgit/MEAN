/**
 * Created by sbunke on 9/8/2014.
 */
angular.module('routeApp', ['ui.router'])
.controller('DemoController', function($scope, $state){
        $scope.test = 'test - this is it';
        $scope.id = 99;
        $scope.partyLocation = 'my place';

        $scope.urlSubCategory =  'test cat';
        $scope.urlCode = 'test url code';
        $scope.goHome = function() {
            $state.go('home');
        }

    })
    .controller('InboxController', function($scope){
        $scope.inboxId = $stateParams.inboxId;
    })
    .controller('PrimaryController', function($scope, $stateParams){
        $scope.urlSubCategory =  $stateParams.urlSubCategory;
        $scope.urlCode =  $stateParams.urlCode;
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

            .state('participant', {
                url: '/p/{urlSubCategory}/{urlCode}',
                views: {
                    '': {
                        templateUrl: 'partials/primary.html',
                        controller: 'PrimaryController'
                    }
                }
            })
            .state('invalid', {
                url: 'p/invalid',
                template: 'Invalid pulse'
            });

    });