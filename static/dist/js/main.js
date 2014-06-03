angular.module('helpdesk', [
  'helpdesk.config',
  'helpdesk.controllers',
  'helpdesk.directives',
  'helpdesk.services'
]).config([
  '$logProvider',
  'config',
  function ($logProvider, config) {
    $logProvider.debugEnabled(config.debug);
  }
]);
angular.module('helpdesk.config', []).constant('config', { debug: true });
angular.module('helpdesk.controllers', []).controller('HelloCtrl', [
  '$scope',
  'helloService',
  function ($scope, helloService) {
    $scope.hello = 'hello ' + helloService.hello;
  }
]);
angular.module('helpdesk.directives', []).directive('fmHello', [
  '$log',
  function ($log) {
    return {
      restrict: 'E',
      template: '<p>hello!</p>',
      replace: true
    };
  }
]);
angular.module('helpdesk.services', []).service('helloService', [
  '$log',
  function ($log) {
    return { hello: 'world' };
  }
]);