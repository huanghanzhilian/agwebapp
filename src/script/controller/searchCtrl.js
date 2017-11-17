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