angular.module('app').controller('helpRequestCtrl', function helpRequestCtrl($scope, Project, Class, User, HelpRequest) {
    // helper function for adding rows to the question collection
    var addRowAsync = function(studentData, i, requests, collection) {
      collection.push({
        studentId: studentData.id,
        name: studentData.firstName + ' ' + studentData.lastName,
        question: requests[i].question,
        resolved: requests[i].resolved,
        acknowledged: requests[i].acknowledged,
        _id: requests[i].id
      });
    };

    var deleteRow = function(question, collection) {
      var index = collection.indexOf(question);
      if (index !== -1) {
        collection.splice(index, 1);
      }
    };
    
    // requests on initial page
    HelpRequest.refreshRequests().then(function (requests) {      
      for(var i in requests) {
        (function (index) {
          User.getStudent(requests[index].StudentId).then(function (studentData) {
            if(requests[index].acknowledged) {
              addRowAsync(studentData, index, requests, $scope.acknowledgedQuestionCollection);
            } else {
              addRowAsync(studentData, index, requests, $scope.questionCollection);
            }
          });
        })(i);
      }
    });
    
    // requests that come in via sockets
    HelpRequest.establishHelpRequestSocket($scope, function() {
      HelpRequest.refreshRequests().then(function (requests) {
        User.getStudent(requests[0].StudentId).then(function (studentData) {
          addRowAsync(studentData, 0, requests, $scope.questionCollection);
        })
      })
    });
    
    $scope.questionCollection = [];
    $scope.acknowledgedQuestionCollection = [];
   
    $scope.acknowledgeRequest = function acknowledgeRequest(question, collection) {

      // modifying view
      $scope.acknowledgedQuestionCollection.push(question);
      deleteRow(question, collection);
    
      // toggle db
      HelpRequest.toggleRequest(question._id, 'acknowledged').then(function () {
        console.log('db toggled');
      });

      // send acknowledgement socket to student
      HelpRequest.acknowledge(question.studentId);

    };

    $scope.resolveRequest = function resolveRequest(question, collection) {
      deleteRow(question, collection);

      HelpRequest.toggleRequest(question._id, 'resolved').then(function () {
        console.log('success');
      });

    };

});