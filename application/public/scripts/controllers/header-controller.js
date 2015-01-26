/**
 * Created by Szabolcs on 2015.01.24..
 */

angular.module('library.controllers.header', [])

.controller('HeaderCtrl', ['$scope', 'api',
    function($scope, api) {

        /*
         * variables and methods of the $scope object which can be used in the DOM structure
         * controlled by the HeaderCtrl
         */
        $scope.menuOpen = false;

        $scope.toggleMenu = toggleMenu;
        $scope.search = search;

        /*
         * function implementations, you can expose a function by adding to the $scope
         * for example in the above code
         */

        function toggleMenu() {
            $scope.menuOpen = !$scope.menuOpen;
        }

        function search(searchField) {

            if (searchField === undefined || searchField === "") {
                console.log('missing parameter');
                return;
            }

            api.search(searchField)
                .success(function (result) {
                    console.log(result);
                }). error(function (error) {
                    console.log(error);
                });
        }
    }
]);