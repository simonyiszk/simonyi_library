/**
 * Created by Szabolcs on 2015.01.24..
 */

angular.module('library.directives.book', [])

.directive('bookTile', ['profile',
    function(profile) {
        return {
            restrict: 'EA',
            scope: {
                book: '='
            },
            controller: function($scope) {

                $scope.lend = lend;

                function lend() {
                    console.log($scope.book._id);
                }
            },
            template:   '<article class="has-transition" ng-class="{}">' +
                        '   <div class="book-image">' +
                        '       <div class="available-sign">' +
                        '           <div class="use-sprite"></div>' +
                        '   </div>' +
                        '   <img ng-src="{{book.coverPhoto}}" alt="{{book.author}} - {{book.title}}" />' +
                        '       <div class="book-info has-transition">' +
                        '           <div class="book-info-top">' +
                        '               <p>Összes darabszám: {{book.num}}</p>' +
                        '               <p>Elérhető darabszám: {{book.out}}</p>' +
                        '           </div>' +
                        '           <div class="book-info-bottom">' +
                        '               <a href="#" ng-click="lend()" class="btn has-transition">Kikölcsönzöm</a>' +
                        '           </div>' +
                        '       </div>' +
                        '   </div>' +
                        '   <div class="book-content">' +
                        '       <div class="book-category category-it">{{book.category}}</div>' +
                        '       <h3>{{book.author}}</h3>' +
                        '       <h2><a href="#">{{book.title}}</a></h2>' +
                        '   </div>' +
                        '</article>',
            link: function($scope, element, attr) {
                console.log('book-tile' + $scope.book);

                $scope.book.available = false;
                $scope.book.waitingList = false;
                $scope.book.warning = false;
                $scope.book.reading = false;

                var userLends = profile.getLends();

                userBooks.map(function(lend, index) {
                    if ($scope.book._id === lend.book._id) {
                        // TODO checking return time and reading
                    }
                });

                if ($scope.book.num <= $scope.book.out) {
                    $scope.book.waitingList = true;
                } else if ($scope.book.num > $scope.book.out) {
                    $scope.book.available = true;
                }
            }
        }
    }
]);
