'use strict';
angular.module('app').controller('companyCtrl', ['$http', '$state', '$scope', function($http, $state, $scope) {
    $http.get('data/company.json?id=' + $state.params.id).success(function(resp) {
        $scope.company = resp;
        /*//向下广播abc事件
        $scope.$broadcast('abc', { id: 1 });
        //接收子元素广播事件
        $scope.$on('cba', function(event, data) {
            console.log(event,data);
        });*/
    });
}]);