/**
 * Created by Szabolcs on 2015.01.24..
 */

angular.module('library.services.api', [])

.factory('api', ['$http',
    function($http) {
        return {
            profile: function() {
                return $http.get('/profile');
            },
            user: function(id) {
                return $http.get('/user/' + id);
            },
            book: function(id) {
                return $http.get('/book/show/' + id);
            },
            list: function(limit) {
                return $http.get('/book/list/' + limit);
            },
            search: function(searchField) {
                return $http.get('/search')
            }
        };
    }
]);
