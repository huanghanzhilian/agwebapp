//严格模式
'use strict';
/**
 * angular.module  创建模块
 * 第一个参数为模块名称
 * 第二模块依赖
 */
angular.module('app', ['ui.router']);
'use strict';
angular.module('app').controller('companyCtrl', ['$http', '$state', '$scope', function($http, $state, $scope){
  $http.get('data/company.json?id='+$state.params.id).success(function(resp){
    $scope.company = resp;
  });
}]);

'use strict';
angular.module('app').controller('mainCtrl', ['$http', '$scope', function($http, $scope) {
    $http.get('data/positionList.json').success(function(resp) {
        $scope.list = resp;
    }).error(function(err){
        console.log(err);
    });
}]);
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
'use strict';
angular.module('app').directive('appCompany', [function(){
  return {
    restrict: 'A',
    replace: true,
    scope: {
      com: '='
    },
    templateUrl: 'view/template/company.html'
  };
}]);

'use strict';
angular.module('app').directive('appFoot', [function(){
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/foot.html'
  }
}]);

'use strict';
angular.module('app').directive('appHeadBar', [function(){
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
    }
  };
}]);

'use strict';
angular.module('app').directive('appHead', [function(){
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/head.html',
    /*link: function($scope) {
      $scope.name = cache.get('name') || '';
    }*/
  };
}]);

'use strict';
angular.module('app').directive('appPositionClass', [function(){
  return {
    restrict: 'A',
    replace: true,
    scope: {
      com: '='
    },
    templateUrl: 'view/template/positionClass.html',
    link: function($scope) {
      $scope.showPositionList = function(idx) {
        $scope.positionList = $scope.com.positionClass[idx].positionList;
        $scope.isActive = idx;
      }
      $scope.$watch('com', function(newVal){
        if(newVal) $scope.showPositionList(0);
      });
    }
  };
}]);

'use strict';
angular.module("app").directive('appPositionInfo', ['$http', function($http) {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'view/template/positionInfo.html',
        scope: {
            isActive: '=',
            isLogin: '=',
            pos: '='
        },
        link: function($scope) {
            $scope.$watch('pos', function(newVal) {
                if (newVal) {
                    $scope.pos.select = $scope.pos.select || false;
                    $scope.imagePath = $scope.pos.select ? 'image/star-active.png' : 'image/star.png';
                }
            })
            $scope.favorite = function() {
                $scope.imagePath = $scope.pos.select ? 'image/star-active.png' : 'image/star.png';
                /*$http.post('data/favorite.json', {
                    id: $scope.pos.id,
                    select: !$scope.pos.select
                }).success(function(resp) {
                    $scope.pos.select = !$scope.pos.select;
                    $scope.imagePath = $scope.pos.select ? 'image/star-active.png' : 'image/star.png';
                });*/
            }
        }
    }
}]);
'use strict';
/**
 * [首页列表指令]
 * appPositionList 定义指令名称
 * 函数返回对象
 * restrict 声明指令通过什么方式使用
 * replace 就是将模版的内容追加到元素中，如果设置为 true，那么模版的内容将会替换元素的内容。
 * templateUrl 指令模板文件路径
 * scope对象，也就是说指定变量名，然后数据传给我这个指令，
 * data就是指定的变量名称，后面是一个等号，指令中会创建一个作用域，
 * 而控制器中创建一个作用域，指令相当于控制器一个子元素，
 * =等号就代表他们两个的scope是共享的，是同一个scope
 * 当然并不是完整的scope共享，而只是这里声明的属性完全共享
 * 其他的还是隔离的，简而言之 data:'=' 说明暴露一个data的接口，
 * 所以指令htnl要使用data循环dom
 * 然后在调用这个指令的时候为他添加一个属性data然后映射到控制器的一个数据属性
 * 因为这里我们定义的属性叫data
 * 比如调用这个指令，我想将控制器$scope.list数据渲染指令，
 * <div app-position-list data="list"></div>
 * transclude 意思是当引用指令的元素内部有节点是
 * 如果transclude为true，就是说允许他在指令中存在，
 * 但是要在templateUrl或者template中使用ng-transclude指令否则没有效果和意义
 * 比如在指令html中写入<div class="ssspp" ng-transclude></div>
 * 这样就会嵌入引用指令的节点
 * link 他是一个函数，常用的是他前面3个参数
 * $scope 
 * element
 * atter
 */
angular.module('app').directive('appPositionList', [function() {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'view/template/positionList.html',
        //transclude:true,
        scope: {
            data: '='
        },
        link: function($scope,elm,attr,controller) {
		    //$scope.name = cache.get('name') || '';
		}
    };
}]);

/*link: function($scope,elm,attr,controller) {
    $scope.name = cache.get('name') || '';
}*/
//严格模式
'use strict';

/**
 * 对app.js进行配置
 * 引用模块 angular.module('app');
 * 配置调用config函数，专门用来进行配置  config参数1函数，函数的参数就是要配置的
 * 显示声明方式配置config([Provider就是对前面uelRouter这个服务进行配置的一个入口],fn  声明之后还要传入一个函数，函数形参的名字最好和声明一致 )
 * $stateProvider它是用来配置路由的，
 */
angular.module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    //$stateProvider用来配置路由的，他的state()函数有两个参数
    /**
     * state函数两个参数main主页面，可以理解为主页面的id当用服务来进行跳转的时候就会用到这个id，唯一标识的一个路径
     * 后面就会有一个对象
     * [url 哈希值 路径]  这个也是可以传参数的，使用url: '/position/:id',冒号的方式
     * [templateUrl 路径对应的页面]
     * [controller  页面逻辑，控制器] 命名方式 页面名称+Ctrl
     */
    $stateProvider.state('main', {
        url: '/main',
        templateUrl: 'view/main.html',
        controller: 'mainCtrl'
    }).state('position', {
        url: '/position/:id',
        templateUrl: 'view/position.html',
        controller: 'positionCtrl'
    }).state('company', {
        url: '/company/:id',
        templateUrl: 'view/company.html',
        controller: 'companyCtrl'
    });





    /**
     * $urlRouterProvider 他的作用就是做一个默认的跳转，
     * otherwise函数，意思是如果配置的路由都没有匹配上，那么这个函数就会生效了，他就会转发到main这个路由下面
     */
    $urlRouterProvider.otherwise('main');
}]);