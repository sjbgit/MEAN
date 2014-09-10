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

        $scope.goToParticipant = function() {
            $state.go('participant', { urlSubCategory: 'goToParticipant-urlSubCat', urlCode: 'goToParticipant-urlCode'  });
        }

    })
    .controller('InboxController', function($scope, $stateParams){
        $scope.inboxId = $stateParams.inboxId;
        $scope.priorityID = 'testid';
    })
    .controller('PrimaryController', function($scope, $stateParams){
        $scope.urlSubCategory =  $stateParams.urlSubCategory;
        $scope.urlCode =  $stateParams.urlCode;
    })
    .controller('Inbox.PriorityController', function($scope, $stateParams){


    })
    .config(function($stateProvider, $urlRouterProvider) {
        //https://github.com/angular-ui/ui-router/wiki/Quick-Reference#stategoto--toparams--options
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

            .state('inbox.priority', {
                url: '/priority',
                templateUrl: 'partials/inbox.priority.html',
                controller: 'Inbox.PriorityController'

            })

            .state('inbox.priority.id', {
                url: '/priority/:priorityID',
                templateUrl: 'partials/inbox.priority.id.html'
            })

            .state('inbox.other', {
                url: '/other',
                templateUrl: 'partials/inbox.other.html'
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