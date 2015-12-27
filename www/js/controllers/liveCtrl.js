angular.module('starter')

  .controller('LiveCtrl', function($scope, $stateParams) {

    var init, setListeners, startLive, setLivePosition;
    var startBtn, video, controls;

    init = function(){

      $scope.title = 'Fête de la musique';
      startBtn = document.getElementById('start');
      video = document.getElementById('video');
      controls = document.getElementsByClassName('controls');

      setListeners();

    }

    setListeners = function(){
      start.addEventListener("click", startLive);
      for(var i=0;i<controls.length;i++){
        controls[i].addEventListener('click', function(){
          setLivePosition(this.id);
        });
      }
    }

    startLive = function(){
      if (video.paused){
        video.play();
        $scope.$broadcast('isPlaying');
      }
      else {
        video.pause();
        $scope.$broadcast('isPaused');
      }
    }


    init();
  });
/**
 * Created by vague on 27/12/2015.
 */
