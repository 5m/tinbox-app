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
    .state('home',
        url: '/',
        controller: 'HomeCtrl',
        templateUrl: t 'home.html')

    .state('inbox',
        url: '/inbox',
        controller: 'InboxCtrl',
        templateUrl: t 'inbox.html')
    .state('inbox.thread',
        url: '/:threadId',
        controller: 'ThreadCtrl',
        templateUrl: t 'thread.html')

