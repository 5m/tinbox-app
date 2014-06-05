'use strict';

angular.module('trak.services', ['ngResource'])

.factory 'helloService', ($log) ->
    hello: 'world'
    log: $log.debug
.factory 'ticketService', ($resource) ->
    $resource('/api/tickets/:ticketId')
