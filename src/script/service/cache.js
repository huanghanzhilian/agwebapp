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
