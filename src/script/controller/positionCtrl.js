'use strict';
/**
 * [description]
 * @param  {[type]} $log    [description]
 * @param  {[type]} $q      [pms 岩石夹在服务]
 * @param  {[type]} $http   [请求]
 * @param  {[type]} $state  [路由状态]
 * @param  {[type]} $scope) {               $scope.isLogin [description]
 * @return {[type]}         [description]
 */
angular.module('app').controller('positionCtrl', ['$log', '$q', '$http', '$state', '$scope', function($log, $q, $http, $state, $scope) {
    $scope.isLogin = true;
    $scope.message = $scope.isLogin ? '投个简历' : '去登录';
    //console.log($q.defer())
    function getPosition() {
        var def = $q.defer();
        $http.get('data/position.json', {
            params: {
                id: $state.params.id
            }
        }).success(function(resp) {
            $scope.position = resp;
            if (resp.posted) {
                $scope.message = '已投递';
            }
            def.resolve(resp);
        }).error(function(err) {
            def.reject(err);
        });
        return def.promise;
    }

    getPosition().then(function(obj) {
        getCompany(obj.companyId);
    });

    function getCompany(id) {
        $http.get('data/company.json?id=' + id).success(function(resp) {
            $scope.company = resp;
        })
    }
    $scope.go = function() {
        if ($scope.message !== '已投递') {
            if ($scope.isLogin) {
                $http.post('data/handle.json', {
                    id: $scope.position.id
                }).success(function(resp) {
                    $log.info(resp);
                    $scope.message = '已投递';
                });
            } else {
                $state.go('login');
            }
        }
    }
}]);