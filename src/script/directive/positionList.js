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
