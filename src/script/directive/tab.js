'use strict';
angular.module('app').directive('appTab', [function() {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            list: '=',
            tabsClick: '&'
        },
        templateUrl: 'view/template/tab.html',
        link: function($scope) {
            $scope.click = function(tab) {
                $scope.selectId = tab.id;
                $scope.tabsClick(tab);
            };
        }
    };
}]);