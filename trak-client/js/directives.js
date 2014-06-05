(function() {
    'use strict';

    angular.module('trak.directives', [])
        .directive('fmHello', function($log) {
            function link() {
                $log.debug('Im linking');
            }

            return {
                restrict: 'E',
                template: '<p>hello!</p>',
                replace: true,
                link: link
            };
        });
})();
