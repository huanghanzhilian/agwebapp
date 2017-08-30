'use strict';
angular.module('app').directive('appHeadBar', [function() {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'view/template/headBar.html',
        scope: {
            text: '@'
        },
        link: function($scope) {
            $scope.back = function() {
                window.history.back();
            };
            /*//接收父级广播事件
            $scope.$on('abc', function(event,data) {
                console.log(event,data);
            });
            //向上广播事件
            $scope.$emit('cba',{name:2});*/
        }
    };
}]);