'use strict'
angular.module('trak.controllers', ['trak.services'])
.controller 'InboxCtrl', ($scope, ticketService) ->
    $scope.labels = [
        'Återbud',
        'Support'
    ]
    $scope.tickets = ticketService.query()

.controller 'FilterCtrl', ($scope, $log, $stateParams, ticketService) ->
    $log.debug $stateParams
    $scope.tickets = ticketService.query()

.controller 'TicketCtrl', ($scope, $log, $stateParams, ticketService) ->
    $log.debug $stateParams
    $scope.ticket = ticketService.get($stateParams)

    $log.debug $scope