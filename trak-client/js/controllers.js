angular.module('helpdesk.controllers', [])

    .controller('HelloCtrl', function($scope, helloService) {
        $scope.hello = 'hello ' + helloService.hello;
    });