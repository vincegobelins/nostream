angular.module('starter')

  .controller('LiveCtrl', function($scope, $stateParams, databaseFactory) {

    var init, setListeners, startLive, setLivePosition;
    var startBtn, video, controls;

    init = function(){
      var id = $stateParams['liveId'];

      $scope.live = {
        author: 'vince'
      };

      $scope.live = databaseFactory.getCaptation(id);

      startBtn = document.getElementById('start');
      video = document.getElementById('video');
      controls = document.getElementsByClassName('controls');

      setListeners();
    }

    setListeners = function(){
      startBtn.addEventListener("click", startLive);
      for(var i=0;i<controls.length;i++){
        controls[i].addEventListener('click', function(){
          setLivePosition(this.id);
        });
      }
    }

    startLive = function(){
      if (video.paused){

        TweenMax.to('.contour', 0.5, {
          alpha: 0,
          display: 'none'
        });

        video.play();
        $scope.$broadcast('isPlaying');
      }
      else {

        TweenMax.to('.contour', 0.5, {
          alpha: 1,
          display: 'block'
        });

        video.pause();
        $scope.$broadcast('isPaused');
      }
    }

    init();
  });
/**
 * Created by vague on 27/12/2015.
 */
