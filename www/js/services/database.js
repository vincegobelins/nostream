angular.module('starter')
  .factory('databaseFactory', function($firebase, $firebaseArray, $firebaseObject, $firebaseAuth, $firebaseUtils, config) {
    return {

      getData: function(){
        var lives = [{
          location: 'Annecy',
          locationImg: 'img/thumbs/briseglace.png',
          title: 'Bigflo et Oli',
          preview: 'img/thumbs/concert2.mp4',
          tag: '#RAP #HIP-HOP'
        }, {
          location: 'Paris',
          locationImg: 'img/thumbs/briseglace.png',
          title: 'L.E.J',
          preview: 'img/thumbs/concert1.mp4',
          tag: '#MASHUP #VIOLONCELLE'
        }, {
          location: 'Grenoble',
          locationImg: 'img/thumbs/briseglace.png',
          title: 'Les insiders',
          preview: 'img/thumbs/concert2.mp4',
          tag: '#GOBELINS #SOUTENANCE'
        }];

        return lives;
      },

      getCaptations : function(){
        //var query = config.BDD + 'captations/';
        //var result = new Firebase(query);
        //return $firebaseObject(result);

        return this.getData();
      },

      getCaptation : function(id){
        var query = config.BDD + 'captations/' + id;
        var result = new Firebase(query);
        return $firebaseObject(result);
      }
    }
  });
