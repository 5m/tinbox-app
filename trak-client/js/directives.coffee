'use strict'

angular.module('trak.directives', [])
.directive 'fmHello', ($log) ->
    link = ->
        $log.debug 'Im linking'

    restrict: 'E',
    template: '<p>hello!</p>',
    replace: true,
    link: link