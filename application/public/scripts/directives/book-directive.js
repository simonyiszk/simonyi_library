/**
 * Created by Szabolcs on 2015.01.24..
 */

angular.module('library.directives.book', [])

.directive('bookTile', function() {
    return {
        restrict: 'EA',
        scope: {
            book: '='
        },
        template:   '<article class="available has-transition" ng-class="{}">' +
                    '   <div class="book-image">' +
                    '       <div class="available-sign">' +
                    '           <div class="use-sprite"></div>' +
                    '           </div>' +
                    '           <img src="/images/temp/book-small.jpg" alt="{{book.title}} - {{book.title}}" />' +
                    '           <div class="book-info has-transition">' +
                    '               <div class="book-info-top">' +
                    '                   <p>Összes darabszám: {{book.pieces}}</p>' +
                    '                   <p>Elérhető darabszám: {{book.out}}</p>' +
                    '               </div>' +
                    '               <div class="book-info-bottom">' +
                    '                   <a href="#" ng-click="lend()" class="btn has-transition">Kikölcsönzöm</a>' +
                    '               </div>' +
                    '           </div>' +
                    '       </div>' +
                    '       <div class="book-content">' +
                    '       <div class="book-category category-it">{{book.category}}</div>' +
                    '           <h3>{{book.author}}</h3>' +
                    '           <h2><a href="#">{{book.title}}</a></h2>' +
                    '   </div>' +
                    '</article>',
        link: function($scope, element, attr) {
            console.log('book-tile' + $scope.book);

            $scope.$watch('book', function(newVal) {
                if(newVal) { book = newVal; }
            }, true);
        }
    }
});
