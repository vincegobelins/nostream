angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('LivesCtrl', function($scope, databaseFactory) {
    // $scope.lives = databaseFactory.getCaptations();

    $scope.lives = [{
      location: 'Albertville',
      title: 'Fête de la musique',
      author: 'vince'
    }, {
      location: 'Annecy',
      title: 'Tomorowland',
      author: 'adrien'
    }];

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
})
