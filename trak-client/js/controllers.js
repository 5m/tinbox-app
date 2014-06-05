(function() {
    'use strict';

    angular.module('trak.controllers', [])

        .controller('HomeCtrl', function($scope, helloService) {
            $scope.hello = 'hello ' + helloService.hello;
        })

        .controller('InboxCtrl', function($scope) {
            $scope.labels = ['Inbox', 'Dunno', 'More stuff'];
        })

        .controller('ThreadCtrl', function($scope, $log, $stateParams) {
            $log.debug($stateParams);
            $scope.thread = $stateParams.threadId;
        })
    ;
})();
