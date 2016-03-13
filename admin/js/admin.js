(function(){
    'use strict';
    var user = true,
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
        .factory('userSrvc',[function(){
            return function(){
                return user;
            };
        }])
        .controller('indexCtrl',['userSrvc',function(userSrvc){
            var ctrl = this;
            ctrl.checkUser = function(){
                return userSrvc();
            };
        }]);
}());
