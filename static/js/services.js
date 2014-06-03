angular.module('helpdesk.services', [])

    .service('helloService', function($log) {

        return {
            hello: 'world'
        };

    });
