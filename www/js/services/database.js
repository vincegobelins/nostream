angular.module('starter')
  .factory('databaseFactory', function($firebase, $firebaseArray, $firebaseObject, $firebaseAuth, $firebaseUtils, config) {
    return {

      getCaptations : function(){
        var query = config.BDD + 'captations/';
        var result = new Firebase(query);
        return $firebaseObject(result);
      },

      getCaptation : function(id){
        var query = config.BDD + 'captations/' + id;
        var result = new Firebase(query);
        return $firebaseObject(result);
      }
    }
  });
