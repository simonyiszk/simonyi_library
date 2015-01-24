/**
 * Created by Szabolcs on 2015.01.24..
 */

angular.module('library.controllers.booklist', [])

.controller('BookListCtrl', ['$scope', 'api',
    function($scope, api) {

        $scope.books = [
            {
                title: 'asdasdas',
                isbn: 'asda',
                author: 'as asd asdd',
                pieces: 5,
                out: 2,
                internal: 'asdas',
                category: 'asdasdasdasd'
            },
            {
                title: 'qwe',
                isbn: 'asda',
                author: 'qw wqeq qweqw',
                pieces: 5,
                out: 2,
                internal: 'asdas',
                category: 'asdasdasdasd'
            }
        ];

        (function initialize() {
            api.list(20)
                .success(handleSuccess)
                .error(handleError);
        })();

        function handleSuccess(result) {
            console.log(result);
            $scope.books = result;
        }

        function handleError(result) {
            console.log(result);
        }
    }
]);
