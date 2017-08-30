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