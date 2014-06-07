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
        inboxCtrl = $scope = null

        beforeEach inject ($controller, $rootScope) ->
            $scope = $rootScope.$new()

            inboxCtrl = $controller 'InboxCtrl',
                $scope: $scope

        it 'should be defined and shit', ->
            expect(inboxCtrl).toBeDefined()
            expect($scope).toBeDefined()
