/**
 * Created by swami on 05/05/14.
 */
'use strict';

describe('controllers', function() {
    beforeEach(function() {
        module('trak');

        inject(function($templateCache) {
            // Put some templates to skip having to expect GET requests for them.
            $templateCache.put('partials/home.html', '');
            $templateCache.put('partials/inbox.html', '');
            $templateCache.put('partials/thread.html', '');
        });

    });

    describe('HomeCtrl', function() {
        var homeCtrl, $scope;

        beforeEach(inject(function($controller, $rootScope) {
            $scope = $rootScope.$new();

            homeCtrl = $controller('HomeCtrl', {
                $scope: $scope
            });

        }));

        it('be defined and shit', function() {
            expect(homeCtrl).toBeDefined();
            expect($scope).toBeDefined();
        });

    });

});