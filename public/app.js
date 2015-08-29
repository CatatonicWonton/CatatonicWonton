angular.module('app', ['ui.router'])
.config(function($urlRouterProvider, $stateProvider) {
  $stateProvider
    .state("landing", {
        url: "/",
        templateUrl: "landing/landingView.html",
        controller: "landingCtrl"
    })
    .state("login", {
        url: "/login",
        templateUrl: "login/loginView.html",
        controller: "loginCtrl"
    })
    .state("studentHome", {
        url: "/studentHome",
        templateUrl: "studentHome/studentHomeView.html",
        controller: "studentHomeCtrl"
    })
    .state("studentProject", {
        url: "/studentProject",
        templateUrl: "studentProject/studentProjectView.html",
        controller: "studentProjectCtrl"
    })
    .state("teacherClass", {
        url: "/teacherClass",
        templateUrl: "teacherClass/teacherClassView.html",
        controller: "teacherClassCtrl"
    })
    .state("teacherHome", {
        url: "/teacherHome",
        templateUrl: "teacherHome/teacherHomeView.html",
        controller: "teacherHomeCtrl"
    })
    .state("teacherProject", {
        url: "/teacherProject",
        templateUrl: "teacherProject/teacherProjectView.html",
        controller: "teacherProjectCtrl"
    });

  $urlRouterProvider.otherwise("/");
  
});