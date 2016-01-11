angular.module('example').controller('ExampleController', ['$scope', 'Authentication', function($scope, Authentication){
	//$scope.name = 'MEAN Application';
	//$scope.name = Authentication.user? Authentication.user.fullname : 'MEAN Application';
	$scope.authentication = Authentication;
}]);