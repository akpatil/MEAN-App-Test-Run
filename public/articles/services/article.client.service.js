angular.module('articles').factory('Articles', ['$resource', function($resource){
	return $resource('api/article/:articleId', {
		articleId: '@_id'
	}, {
		update: {
			method: 'PUT'
		}
	});
}]);