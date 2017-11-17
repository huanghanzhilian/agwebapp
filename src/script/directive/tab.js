'use strict';
angular.module('app').directive('appTab', [function() {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            list: '=',
            tabsClick: '&',
        },
        templateUrl: 'view/template/tab.html',
        link: function($scope) {
            $scope.selectId='all';
            $scope.click = function(tab) {
                //console.log($scope.selectId)
                $scope.selectId = tab.id;
                $scope.tabsClick(tab);
            };
        }
    };
}]);