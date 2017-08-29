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