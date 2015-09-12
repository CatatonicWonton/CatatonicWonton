angular.module('app')
  .controller('studentHelpRequestCtrl', function studentHelpRequestCtrl($scope, $state, HelpRequest){
    $scope.getTeacherId = function();

    $scope.submitHelpRequest = function (teacherId, question) {
      HelpRequest.submitHelpRequest(teacherId, question).then(function (data) {
        console.log('your request was submitted successfully\n\n********\n', data);
      });
    };

  });