angular.module('starter')

  .controller('CaptureCtrl', function($scope, $stateParams, uploadFactory, databaseFactory) {

    var init, captureError, captureSuccess, streamCam, successCam, camera;

    init = function(){
      $scope.title = 'Capture en cours';
      $scope.lives = databaseFactory.getCaptations();
      //streamCam();
      //console.log(MediaStreamTrack.getSources(gotSources));
    }

    gotSources = function(sourceInfos){
      for (var i = 0; i < sourceInfos.length; i++)
      {
        var sourceInfo = sourceInfos[i];

        if (sourceInfo.kind == 'video')
        {
          console.log(sourceInfo);
        }
      }
    }

    streamCam = function(){
      camera = document.getElementById("camera");
      var constraints = {audio:true, video:{optional: [{sourceId: '835acea08d27ea4ae22fbe97aaf8fb554e4cb0b7d106a77e9407cd87ed1175a6'}]}};

      navigator.getUserMedia = ( navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia);

      if (navigator.getUserMedia) {
        navigator.getUserMedia(constraints, successCam, failure);
      }
      else {
        alert("Your browser does not support getUserMedia()");
      }
    },

    successCam = function(stream){
      camera.src = window.URL.createObjectURL(stream);
      camera.play();
    }

    failure = function(){
      console.log("not ready to show");
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
