angular.module('starter')

  .controller('LiveCtrl', function($scope, $stateParams, databaseFactory, $timeout, $ionicGesture) {

    var init, setListeners, startLive, setLivePosition, launchTap;
    var startBtn, video, controls;
    var minutes, secondes;
    var start = null;

    init = function(){

      minutes = 0;
      secondes = 0;
      

      var id = $stateParams['liveId'];

      $scope.live = {
        author: 'vince'
      };

      $scope.live = databaseFactory.getCaptation(id);

      $scope.progress = 0;
      $scope.streams = Math.floor(Math.random() * 15) + 10;
      $scope.navigateurs = Math.floor(Math.random() * (3450 - 1500 + 1)) + 1500;
      $scope.time = calculTime();

      // startBtn = document.getElementById('start');
      video = document.getElementById('video');
      controls = document.getElementsByClassName('controls');

      timer();
      randomNumber();
      setListeners();
    }

    setListeners = function(){
      // startBtn.addEventListener("click", startLive);
      for(var i=0;i<controls.length;i++){
        controls[i].addEventListener('click', function(){
          setLivePosition(this.id);
        });
      }

      // Démarrage automatique

      $scope.$on('$ionicView.enter', function(event, toState, toParams, fromState, fromParams) {
        $timeout(function() {
          startLive();  
        }, 500);
      });

      $scope.$on('$ionicView.leave', function(event, toState, toParams, fromState, fromParams) {
          stopLive();

          $('.tap').remove();
      });
      
    }

    timer = function(timestamp) {
      $timeout(function() {
        $scope.progress = new Date();
      
        timer();
      }, 1000);
    }

    randomNumber = function() {
      $timeout(function() {
        $scope.streams = Math.floor(Math.random() * 15) + 10;
        $scope.navigateurs = Math.floor(Math.random() * (3450 - 1500 + 1)) + 1500;
      
        randomNumber();
      }, 10000);
    }

    calculTime = function() {
      return minutes + ':' + secondes;
    }

    stopLive = function() {
      TweenMax.to('.contour', 0.5, {
          alpha: 1,
          display: 'block'
        });

        video.pause();
        $scope.$broadcast('isPaused');
    }

    startLive = function(){
        TweenMax.to('.contour', 0.5, {
          alpha: 0,
          display: 'none'
        });

        video.play();
        $scope.$broadcast('isPlaying');
    }

    var rootLiveContent = $('#live-content');
    var tapSize = 70;
    var halfTapSize = tapSize / 2;

    $ionicGesture.on("tap", function (event) {
      var x = event.gesture.center.pageX;
      var y = event.gesture.center.pageY;

      launchTap(x, y);
    }, rootLiveContent);

    var colorList = ['red', 'blue', 'blue'];

    launchTap = function(x, y) {
      var val = Math.floor(Math.random() * 2) + 0;

      rootLiveContent.append('<div class="tap ' + colorList[val] + '" style="top:' + (y - halfTapSize) + 'px; left: ' + (x - halfTapSize) + 'px;"></div>')
    }

    init();
  });
/**
 * Created by vague on 27/12/2015.
 */
