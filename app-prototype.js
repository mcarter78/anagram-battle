

  var words = ["evil", "live", "veil", "vile"];
  var $inputForm = $("#input-form");


  var Game = function(){
    this.score = 0;
    this.timer = 60;
  };

  Game.prototype = {

    init: function() {
      //set event listeners
      $("#input-form").on("submit", function(e){
        e.preventDefault();
        var $formGuess = $("#input-field");
        words.forEach(function(index){
          if($formGuess.val() === index){
            var $newListItem = $("<li>");
            $newListItem.html(index + " ");
            $("#guesses ul").append($newListItem);
          }
        });
        console.log($formGuess.val());
        $formGuess.val(null);                               // does not work
      });
      this.newAnagram();
    },

    reset: function() {

    },

    newAnagram: function(){
      // append array of anagrams
      var currentWord = words.shift();
      var $currentWord = $("<h1>Input Anagrams For: </br><span class='huge'>" + currentWord + "</span></h1>");
      $("#current-word").append($currentWord);
    }
  };

  var Player = function(name, gamesPlayed){
    this.name = name;
    this.gamesPlayed = gamesPlayed;
  };

  Player.prototype = {
    input: function(str){

    }
  };
