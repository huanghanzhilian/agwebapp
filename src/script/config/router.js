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
    });





    /**
     * $urlRouterProvider 他的作用就是做一个默认的跳转，
     * otherwise函数，意思是如果配置的路由都没有匹配上，那么这个函数就会生效了，他就会转发到main这个路由下面
     */
    $urlRouterProvider.otherwise('main');
}]);