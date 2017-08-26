//严格模式
'use strict';
/**
 * angular.module  创建模块
 * 第一个参数为模块名称
 * 第二模块依赖
 */
angular.module('app', ['ui.router']);
//严格模式
'use strict';

/**
 * 对app.js进行配置
 * 引用模块 angular.module('app');
 * 配置调用config函数，专门用来进行配置  config参数1函数，函数的参数就是要配置的
 * 显示声明方式配置config([Provider就是对前面uelRouter这个服务进行配置的一个入口],fn  声明之后还要传入一个函数，函数形参的名字最好和声明一致 )
 * $stateProvider它是用来配置路由的，
 */
angular.module('app').config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider){
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
	});
	/**
	 * $urlRouterProvider 他的作用就是做一个默认的跳转，
	 * otherwise函数，意思是如果配置的路由都没有匹配上，那么这个函数就会生效了，他就会转发到main这个路由下面
	 */
	$urlRouterProvider.otherwise('main');
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
/**
 * [首页列表指令]
 * appPositionList 定义指令名称
 * 函数返回对象
 * restrict 声明指令通过什么方式使用
 * replace 就是将模版的内容追加到元素中，如果设置为 true，那么模版的内容将会替换元素的内容。
 * templateUrl 指令模板文件路径
 */
angular.module('app').directive('appPositionList', [function(){
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/positionList.html',
    scope:{
    	data:'='
    },
  };
}]);

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
