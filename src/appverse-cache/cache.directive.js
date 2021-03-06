(function(){
    'use strict';

    angular.module('appverse.cache')

    /**
     * @ngdoc directive
     * @name cache
     * @module  appverse.cache
     * @restrict AE
     *
     * @description
     * Use this directive to inject directly in dom nodes caching features for values.
     * Use ``` <div cache="name"></div> ``` to fill the node with the cached value of "name"
     * and updates the value in cache when the "name" model changes.
     * You can also use "cache-name" instead of "cache" to specify the model name.
     *
     * @param {string} cache Name of cached model
     *
     * @requires https://docs.angularjs.org/api/ng/service/$log $log
     * @requires CacheFactory
     */
    .directive('cache', ['$log', 'CacheFactory', function ($log, CacheFactory) {

        return {
            link: function (scope, element, attrs) {

                var name = attrs.cache || attrs.cacheName;

                scope.$watch(function () {
                    return CacheFactory.getScopeCache().get(name);
                }, function (newVal) {
                    $log.debug('Cache watch {' + name + '}:', newVal);
                    scope[name] = CacheFactory.getScopeCache().get(name);
                });

                scope.$watch(name, function (newVal) {
                    $log.debug('Cache watch {' + name + '}:', newVal);
                    CacheFactory.getScopeCache().put(name, scope[name]);
                });
            }
        };
    }]);


})();