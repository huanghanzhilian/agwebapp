'use strict';
angular.module('app').controller('mainCtrl', ['$http', '$scope', function($http, $scope) {
	//console.log($scope.$root);
    $http.get('data/positionList.json').success(function(resp) {
        $scope.list = resp;
    }).error(function(err){
        console.log(err);
    });
}]);