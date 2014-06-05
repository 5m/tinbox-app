'use strict'
angular.module('trak.controllers', [])
.controller 'HomeCtrl', ($scope, helloService) ->
    $scope.hello = 'hello #{helloService.hello}'

.controller 'InboxCtrl', ($scope) ->
    $scope.labels = ['Inbox', 'Dunno', 'More stuff']

.controller 'ThreadCtrl', ($scope, $log, $stateParams) ->
    $log.debug $stateParams
    $scope.thread = $stateParams.threadId
