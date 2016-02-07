angular.module('starter')

  .controller('LivesCtrl', function($scope, databaseFactory) {

    var init;


    init = function(){
      $scope.lives = databaseFactory.getCaptations();
    }

    var tl = new TimelineMax();

    setTimeout(function() {

      TweenMax.set('.ns-list', {
        display: 'block'
      });

      tl.staggerFrom(".ns-list", .35, {
        left: -100,
        opacity: 0,
        delay: 0.2,
        force3D: true
      }, 0.2)
        .staggerFrom('.btn-capture', 1, {
          alpha: 0
        }, 0.2, '-=0.4');

      tl.play();

    }, 10);

    $scope.$on('$ionicView.enter', function(event, toState, toParams, fromState, fromParams) {
      tl.restart();
    });

    $scope.$on('$ionicView.leave', function(event, toState, toParams, fromState, fromParams) {
      tl.seek(0).pause();
    });

    init();
  })
