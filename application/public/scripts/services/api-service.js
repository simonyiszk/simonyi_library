/**
 * Created by Szabolcs on 2015.01.24..
 */

angular.module('library.services.api', [])

.factory('api', ['$http',
    function($http) {
        return {
            profile: function() {
                return $http.post('/profile');
            },
            user: function(id) {
                return $http.post('/user/' + id);
            },
            book: function(id) {
                return $http.get('/book/show/' + id);
            },
            newBook: function(book) {
                return $http.post('/book/new', book);
            },
            list: function(limit) {
                return $http.post('/book/list/' + limit);
            },
            search: function(searchField) {
                return $http.get('/search')
            }
        };
    }
]);
