angular.module('starter')
  .factory('databaseFactory', function($firebase, $firebaseArray, $firebaseObject, $firebaseAuth, $firebaseUtils, config) {
    return {

      getData: function(){
        var lives = [{
          location: 'Port-Barcarès',
          locationImg: 'img/thumbs/briseglace.png',
          title: 'Don Diablo',
          grid_url: 'movie/dondiablo.mp4',
          preview: 'img/thumbs/dondiablo.mp4',
          tag: '#ELECTRO #Electrobeach'
        }, {
          location: 'Annecy',
          locationImg: 'img/thumbs/briseglace.png',
          title: 'Bigflo et Oli',
          preview: 'img/thumbs/concert2.mp4',
          grid_url: 'movie/dondiablo.mp4',
          tag: '#RAP #HIP-HOP'
        }, {
          location: 'Paris',
          locationImg: 'img/thumbs/briseglace.png',
          title: 'L.E.J',
          preview: 'img/thumbs/concert1.mp4',
          grid_url: 'movie/output.mp4',
          tag: '#MASHUP #VIOLONCELLE'
        }, {
          location: 'Grenoble',
          locationImg: 'img/thumbs/briseglace.png',
          title: 'Les insiders',
          grid_url: 'movie/output.mp4',
          preview: 'img/thumbs/concert2.mp4',
          tag: '#GOBELINS #SOUTENANCE'
        }
        ];

        return lives;
      },

      getCaptations : function(){
        //var query = config.BDD + 'captations/';
        //var result = new Firebase(query);
        //return $firebaseObject(result);

        return this.getData();
      },

      getCaptation : function(id){
        //var query = config.BDD + 'captations/' + id;
        //var result = new Firebase(query);
        //return $firebaseObject(result);
        var data = this.getData();
        return data[id];
      }
    }
  });
