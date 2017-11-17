//严格模式
'use strict';
/**
 * angular.module  创建模块
 * 第一个参数为模块名称
 * 第二模块依赖
 * run  方法初始化全局的数据 , 只对全局作用域起作用  如 $rootScope，局部的$scope不管用
 * run 初始化执行 也就是说所有页面加载之前执行的
 */
angular.module('app', ['ui.router','ngCookies'])

/*.run(['$rootScope',function($rootScope){
	$rootScope.im=function(){
		console.log('im')
	}
}]);*/
'use strict';
angular.module('app').value('dict', {}).run(['dict', '$http', function(dict, $http){
  $http.get('data/city.json').success(function(resp){
    dict.city = resp;
  });
  $http.get('data/salary.json').success(function(resp){
    dict.salary = resp;
  });
  $http.get('data/scale.json').success(function(resp){
    dict.scale = resp;
  });
}]);

'use strict';
angular.module('app').config(['$provide', function($provide){
  $provide.decorator('$http', ['$delegate', '$q', function($delegate, $q){
    $delegate.post = function(url, data, config) {
      var def = $q.defer();
      $delegate.get(url).success(function(resp) {
        def.resolve(resp);
      }).error(function(err) {
        def.reject(err);
      });
      return {
        success: function(cb){
          def.promise.then(cb);
        },
        error: function(cb) {
          def.promise.then(null, cb);
        }
      }
    }
    return $delegate;
  }]);
}]);

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
    }).state('search', {
        url: '/search',
        templateUrl: 'view/search.html',
        controller: 'searchCtrl'
    }).state('login', {
        url: '/login',
        templateUrl: 'view/login.html',
        controller: 'loginCtrl'
    }).state('register', {
        url: '/register',
        templateUrl: 'view/register.html',
        controller: 'registerCtrl'
    }).state('me', {
        url: '/me',
        templateUrl: 'view/me.html',
        controller: 'meCtrl'
    }).state('post', {
        url: '/post',
        templateUrl: 'view/post.html',
        controller: 'postCtrl'
    }).state('favorite', {
        url: '/favorite',
        templateUrl: 'view/favorite.html',
        controller: 'favoriteCtrl'
    });





    /**
     * $urlRouterProvider 他的作用就是做一个默认的跳转，
     * otherwise函数，意思是如果配置的路由都没有匹配上，那么这个函数就会生效了，他就会转发到main这个路由下面
     */
    $urlRouterProvider.otherwise('main');
}]);
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
'use strict';
angular.module('app').controller('favoriteCtrl', ['$http', '$scope', function($http, $scope){
  $http.get('data/myFavorite.json').success(function(resp) {
    $scope.list = resp;
  });
}]);

'use strict';
angular.module('app').controller('loginCtrl', ['cache', '$state', '$http', '$scope', function(cache, $state, $http, $scope){
  $scope.submit = function() {
    $http.post('data/login.json', $scope.user).success(function(resp){
      cache.put('id',resp.id);
      cache.put('name',resp.name);
      cache.put('image',resp.image);
      $state.go('main');
    });
  }
}]);

'use strict';
angular.module('app').controller('mainCtrl', ['$http', '$scope', function($http, $scope) {
	//console.log($scope.$root);
    $http.get('data/positionList.json').success(function(resp) {
        $scope.list = resp;
    }).error(function(err){
        console.log(err);
    });
}]);
'use strict';
angular.module('app').controller('meCtrl', ['$state', 'cache', '$http', '$scope', function($state, cache, $http, $scope){
  if(cache.get('name')) {
    $scope.name = cache.get('name');
    $scope.image = cache.get('image');
  }
  $scope.logout = function() {
    cache.remove('id');
    cache.remove('name');
    cache.remove('image');
    $state.go('main');
  };
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
'use strict';
angular.module('app').controller('postCtrl', ['$http', '$scope', function($http, $scope){
  $scope.tabList = [{
    id: 'all',
    name: '全部'
  }, {
    id: 'pass',
    name: '面试邀请'
  }, {
    id: 'fail',
    name: '不合适'
  }];
  $http.get('data/myPost.json').success(function(res){
    $scope.positionList = res;
  });
  $scope.filterObj = {};
  $scope.tClick = function(id, name) {
    switch (id) {
      case 'all':
        delete $scope.filterObj.state;
        break;
      case 'pass':
        $scope.filterObj.state = '1';
        break;
      case 'fail':
        $scope.filterObj.state = '-1';         
        break;
      default:

    }
  }
}]);

'use strict';
angular.module('app').controller('registerCtrl', ['$interval', '$http', '$scope', '$state', function($interval, $http, $scope, $state){
  $scope.submit = function() {
    $http.post('data/regist.json',$scope.user).success(function(resp){
      $state.go('login');
    });
  };
  var count = 60;
  $scope.send = function() {
    $http.get('data/code.json').success(function(resp){
      if(1===resp.state) {
        count = 60;
        $scope.time = '60s';
        var interval = $interval(function() {
          if(count<=0) {
            $interval.cancel(interval);
            $scope.time = '';
          } else {
            count--;
            $scope.time = count + 's';
          }
        }, 1000);
      }
    });
  }
}]);

'use strict';
angular.module('app').controller('searchCtrl', ['dict', '$http', '$scope', function(dict, $http, $scope) {
    $scope.name = '';
    //查询方法函数
    $scope.search = function() {
        $http.get('data/positionList.json?name=' + $scope.name).success(function(resp) {
            $scope.positionList = resp;
        });
    };
    //初始化查询
    $scope.search();

    //弹出层对象
    $scope.sheet = {};

    //选择标签
    $scope.tabList = [{
        id: 'city',
        name: '城市'
    }, {
        id: 'salary',
        name: '薪水'
    }, {
        id: 'scale',
        name: '公司规模'
    }];

    $scope.filterObj = {};

    //获取tab的id
    var tabId = '';

    //定义方法 筛选
    $scope.tClick = function(id, name) {
        tabId = id;
        //得到弹出层数组
        $scope.sheet.list = dict[id];
        //将弹出层状态为true
        $scope.sheet.visible = true;
    };

    //点击弹出层item事件
    $scope.sClick = function(id, name) {
        if (id) {
            angular.forEach($scope.tabList, function(item) {
                if (item.id === tabId) {
                    item.name = name;
                }
            });
            $scope.filterObj[tabId + 'Id'] = id;
        } else {
            delete $scope.filterObj[tabId + 'Id'];
            angular.forEach($scope.tabList, function(item) {
                if (item.id === tabId) {
                    switch (item.id) {
                        case 'city':
                            item.name = '城市';
                            break;
                        case 'salary':
                            item.name = '薪水';
                            break;
                        case 'scale':
                            item.name = '公司规模';
                            break;
                        default:
                    }
                }
            });
        }
    }
}]);
'use strict';
angular.module('app').service('cache', ['$cookies', function($cookies){
    this.put = function(key, value){
      $cookies.put(key, value);
    };
    this.get = function(key) {
      return $cookies.get(key);
    };
    this.remove = function(key) {
      $cookies.remove(key);
    };
}]);

/*.factory('cache', ['$cookies', function($cookies){
	//服务工厂方式
	//他的优势是在调用之前可以写私有属性  也就是这个服务内部属性，外部不可访问
	//service是没有的
	return {
		put : function(key, value){
	      $cookies.put(key, value);
	    },
	    get : function(key) {
	      $cookies.get(key);
	    },
	    remove : function(key) {
	      $cookies.remove(key);
	    },
	}
}]);*/

'use strict';
angular.module('app').filter('filterByObj', [function() {
    return function(list, obj) {
        var result = [];
        angular.forEach(list, function(item) {
            var isEqual = true;
            for (var e in obj) {
                if (item[e] !== obj[e]) {
                    isEqual = false;
                }
            }
            if (isEqual) {
                result.push(item);
            }
        });
        return result;
    };
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
angular.module('app').directive('appPositionList', ['$http',function($http) {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'view/template/positionList.html',
        //transclude:true,
        scope: {
            data: '=',
            filterObj: '=',
            isFavorite: '=',
        },
        link: function($scope, elm, attr, controller) {
            $scope.select = function(item) {
                $http.post('data/favorite.json', {
                    id: item.id,
                    select: !item.select
                }).success(function(resp) {
                    item.select = !item.select;
                })
            };
        }
    };
}]);

/*link: function($scope,elm,attr,controller) {
    $scope.name = cache.get('name') || '';
}*/
'use strict';
angular.module('app').directive('appSheet', [function(){
  return {
    restrict: 'A',
    replace: true,
    scope: {
      list: '=',//得到弹出层数据列表
      visible: '=',//得到弹出层状态
      select: '&'//点击弹出层item事件
    },
    templateUrl: 'view/template/sheet.html'
  };
}]);

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