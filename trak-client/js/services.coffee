'use strict';

angular.module('trak.services', [])

.factory 'helloService', ($log) ->
    hello: 'world'
    log: $log.debug
