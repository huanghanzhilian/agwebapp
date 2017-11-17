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
