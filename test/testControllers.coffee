'use strict';

describe 'controllers', ->
    beforeEach ->
        module 'trak'
        inject ($templateCache) ->
            # Put some templates to skip having to expect GET requests for them.
            $templateCache.put 'partials/home.html', ''
            $templateCache.put 'partials/inbox.html', ''
            $templateCache.put 'partials/thread.html', ''

    describe 'HomeCtrl', ->
        homeCtrl = $scope = null

        beforeEach inject ($controller, $rootScope) ->
            $scope = $rootScope.$new()

            homeCtrl = $controller 'HomeCtrl',
                $scope: $scope

        it 'should be defined and shit', ->
            expect(homeCtrl).toBeDefined()
            expect($scope).toBeDefined()
