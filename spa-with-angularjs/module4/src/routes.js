(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/templates/home.template.html'
  })

  // Menu categories
   .state('categories', {
     url: '/categories',
     templateUrl: 'src/templates/categories.template.html',
     controller: 'CategoriesController as ctrl',
     resolve: {
       categories: ['MenuDataService', function (MenuDataService) {
         return MenuDataService.getAllCategories();
       }]
     }
   })

    // Items of one category
    .state('items', {
    url: '/items/{categoryId}',
    templateUrl: 'src/templates/items.template.html',
    controller: 'ItemsController as ctrl',
    resolve: {
       items: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
         return MenuDataService.getItemsForCategory($stateParams.categoryId);
       }]
     }
  });
}

})();