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
angular.module('app').controller('positionCtrl', ['$log', '$q','$timeout','$interval', '$http', '$state', '$scope', function($log, $q,$timeout,$interval, $http, $state, $scope) {
    $scope.isLogin = true;
    $scope.message = $scope.isLogin ? '投个简历' : '去登录';
    //console.dir($q)

    function getPosition() {
        var def = $q.defer();
        /*
         $http有四种请求方法 下面三种和另一种get
         get是没有数据对象也就是请求体
         get的参数可以也在地址栏里，
         get参数可以写在他的第二个参数{params对象中}
         $http['post'/'delete'/'put'].('url',{
            //第二个参数
            //数据对象，也就是说传入请求的body
         },{
            //第三个参数
            //配置对象
         })
         如果以上四种都不能满足请求需求可以直接使用$http
         $http({
            url:'',//请求地址
            method:'post',//方法
            params:{},//地址栏参数
            data:{}//请求body
         })
         */
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



    /*$q.all([aac(1),aac2(1)]).then(function(result) {
        console.log(result)
    })
    $q.all({a:aac(1),b:aac2(1)}).then(function(result) {
        console.log(result)
    })
    function aac(id) {
        var def = $q.defer();
        $http.get('data/company.json?id=' + id).success(function(resp) {
            def.resolve(resp);
            //$scope.company = resp;
        })
        return def.promise;
    }
    function aac2(id) {
        var def2 = $q.defer();
        $http.get('data/company.json?id=' + id).success(function(resp) {
            def2.resolve(resp);
            //$scope.company = resp;
        })
        return def2.promise;
    }*/

    /*$timeout(function(){
        console.log("我是延迟")
    },1000);

    $interval(function(){
        console.log("我是循环")
    },1000)*/

    //调用$rootScope
    //$scope.im();


    //使用cache 为cookies增删查
    //cache.put('to','day')
    //删除
    //cache.remove('to');


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