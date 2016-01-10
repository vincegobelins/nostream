angular.module('starter')

  .controller('HomeCtrl', function($scope) {

    var tl = new TimelineMax({ delay:0.5 });

    tl.from('.fadeInDown', 1, {
      alpha: 0,
      top: 0
    })
    .from('.cadre', 1.5, {
      alpha: 0,
      scale: 0.8,
      ease: Elastic.easeOut
    }, "-=1")
    .from('.fadeIn', 1, {
      alpha: 0
    }, "-=1")
    .from('.fadeInUp', 0.75, {
      alpha: 0,
      bottom: '10%'
    }, "-=1")
    .from('.btn-entrez', 0.75, {
      alpha: 0
    }, '-=0.5');

    $scope.$on('$ionicView.enter', function(event, toState, toParams, fromState, fromParams) {
      tl.restart();
    });

    $scope.$on('$ionicView.leave', function(event, toState, toParams, fromState, fromParams) {
      tl.seek(0).pause();
    });

  });
