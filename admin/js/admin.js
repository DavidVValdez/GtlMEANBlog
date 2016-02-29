(function(){
    'use strict';
    var user,
    meanBlog = angular.module('meanBlog',['ngRoute','meanBlogCtrls'])
        .config(['$routeProvider',function($routeProvider){
            $routeProvider.when('/',{
                templateUrl:'./templates/index.html',
                controller:'indexCtrl'
            }).otherwise({
                redirectTo:'/'
            });
        }]),
    ctrls = angular.module('meanBlogCtrls',['ngResource'])
        .factory('userSrvc',['$resource',function($resource){
            return $resource('./gato-:gatoName.json',{},{
                query:{method:'GET',params:{gatoName:'gato'},isArray:true}
            });
        }])
        .controller('indexCtrl',['userSrvc',function(){
            var ctrl = this;
            ctrl.checkUser = function(){
                return true;
            };
        }]);
}());
