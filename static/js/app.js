angular.module('helpdesk', [
    'helpdesk.config',
    'helpdesk.controllers',
    'helpdesk.directives',
    'helpdesk.services'
]).
    config(function($logProvider, config) {

        $logProvider.debugEnabled(config.debug);

    });