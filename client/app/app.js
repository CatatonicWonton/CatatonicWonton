angular.module('app', ['ui.router', 'ngSanitize', 'froala'])
.config(function($urlRouterProvider, $stateProvider) {
  $stateProvider
    .state("landing", {
        url: "/",
        templateUrl: "app/landing/landingView.html",
        controller: "landingCtrl"
    })
    .state("login", {
        url: "/login",
        templateUrl: "app/login/loginView.html",
        controller: "loginCtrl"
    })
    .state("studentHome", {
        url: "/studentHome",
        templateUrl: "app/studentHome/studentHomeView.html",
        controller: "studentHomeCtrl"
    })
    .state("studentProject", {
        url: "/studentProject",
        templateUrl: "app/studentProject/studentProjectView.html",
        controller: "studentProjectCtrl"
    })
    .state("teacherClass", {
        url: "/teacherClass",
        templateUrl: "app/teacherClass/teacherClassView.html",
        controller: "teacherClassCtrl"
    })
    .state("teacherHome", {
        url: "/teacherHome",
        templateUrl: "app/teacherHome/teacherHomeView.html",
        controller: "teacherHomeCtrl"
    })
    .state("teacherProject", {
        url: "/teacherProject",
        templateUrl: "app/teacherProject/teacherProjectView.html",
        controller: "teacherProjectCtrl"
    });

  $urlRouterProvider.otherwise("/");

});