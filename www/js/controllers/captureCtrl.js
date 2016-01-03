angular.module('starter')

  .controller('CaptureCtrl', function($scope, $stateParams, uploadFactory, databaseFactory) {

    var init, captureError, captureSuccess;

    init = function(){
      $scope.title = 'Capture en cours';
      $scope.lives = databaseFactory.getCaptations();
    }

    $scope.capture = function(eventId){
      console.log("logged");
      $scope.currentEventId = eventId;
      navigator.device.capture.captureVideo(captureSuccess, captureError, {duration: 10, quality: 0});
    }

    captureError = function(e) {
      console.log("capture error: "+JSON.stringify(e));

    }

    captureSuccess = function(mediaFiles) {
      console.log("Success");
      for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path = mediaFiles[i].fullPath;
        uploadFactory.uploadFile(path);
      }
    }


    init();
  });
