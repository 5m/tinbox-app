angular.module('helpdesk.directives', [])
    .directive('fmHello', function($log) {
        return {
            restrict: 'E',
            template: '<p>hello!</p>',
            replace: true
        };
    });