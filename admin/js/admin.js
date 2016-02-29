(function(){
    'use strict';
    var user,
    meanBlog = angular.module('meanBlog',['ngRoute','meanBlogCtrls']).config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/',{
            templateUrl:'./templates/index.html',
            controller:'indexCtrl'
        }).otherwise({
            redirectTo:'/'
        });
    }]),
    ctrls = angular.module('meanBlogCtrls',[]).controller('indexCtrl',[function(){
        var ctrl = this;
        ctrl.checkUser = function(){
            return true;
        };
    }]);
}());
