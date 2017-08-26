'use strict';
angular.module('app').controller('mainCtrl', ['$http', '$scope', function($http, $scope){
	$scope.list=[{
		id:'1',
		name:'销售',
		imgSrc:'image/item_image3.jpg',
		conpanyName:'前度',
		city:'北京',
		industry:'互联网',
		time:'2017-06-06'
	},{
		id:'2',
		name:'前端',
		imgSrc:'image/item_image2.png',
		conpanyName:'拉钩',
		city:'北京',
		industry:'互联网',
		time:'2017-06-06'
	}];
}]);
