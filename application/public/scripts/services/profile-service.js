/**
 * Created by Szabolcs on 2015.01.25..
 */

angular.module('library.services.profile', [])

.factory('profile',
    function() {

        var _profile = {};
        var _books = [];

        return {
            setProfile: function (profile) {
                _profile = profile;
            },
            getProfile: function () {
                return _profile;
            },
            setBooks: function (books) {
                _books = books;
            },
            getBooks: function () {
                return _books;
            }
        }
    }
);