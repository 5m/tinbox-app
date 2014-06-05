(function() {
    'use strict';

    angular.module('trak.services', [])

        .service('helloService', function($log) {

            return {
                hello: 'world',
                log: $log.debug
            };

        });
})();

