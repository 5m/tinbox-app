'use strict'

angular.module('trak', [
    'ngAnimate',
    'ui.router',
    'ui.bootstrap',
    'trak.config',
    'trak.controllers',
    'trak.directives',
    'trak.services'
]).
config (config, $logProvider, $stateProvider, $urlRouterProvider) ->
    # $locationProvider.html5Mode(true);  dis destroys refresh, needs to be configured on server.
    $logProvider.debugEnabled config.debug

    t = (template) ->
        'partials/' + template

    ### ROUTES ###
    $urlRouterProvider.otherwise '/'

    $stateProvider
        .state('inbox',
            url: '/tickets'
            controller: 'InboxCtrl'
            templateUrl: t 'inbox.html')
        .state('inbox.tickets',
            url: '/list/:filter'
            controller: 'FilterCtrl'
            templateUrl: t 'ticket/list.html')
        .state('inbox.single',
            url: '/show/:ticketId'
            controller: 'TicketCtrl'
            templateUrl: t 'ticket/show.html')

