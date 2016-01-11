angular.module('articles').config(['$routeProvider', function($routeProvider){
	$routeProvider

	.when('/article', {
		templateUrl: 'articles/views/list-article.client.view.html'
	})

	.when('/article/create', {
		templateUrl: 'articles/views/create-article.client.view.html'
	})

	.when('/article/:articleId', {
		templateUrl: 'articles/views/view-article.client.view.html'
	})

	.when('/article/:articleId/edit', {
		templateUrl: '/articles/views/edit-article.client.view.html'
	});
}]);