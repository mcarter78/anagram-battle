var words = ["evil", "live", "veil", "vile"];
var monstersDefeated = 0;
var monsters = [
  {
    name: "a Zombie",
    image: "img/zombie.jpg"
  },
  {
    name: "a Skeleton Warrior",
    image: "img/skeleton-warrior.jpg"
  },
  {
    name: "The Rock Monster",
    image: "img/rock-monster.jpg"
  },
  {
    name: "The Red Dragon",
    image: "img/dragon.jpg"
  },
  {
    name: "a Demon",
    image: "img/demon.jpg"
  },
  {
    name: "Godzilla",
    image: "img/godzilla.jpg"
  },
  {
    name: "Indominus Rex",
    image: "img/indominus-rex.jpg"
  },
  {
    name: "The Venus Flytrap",
    image: "img/venus-flytrap.jpg"
  },
];
var $inputForm = $("#input-form");


var Game = function(){
  this.score = 0;
  this.timer = 60;
};

Game.prototype = {

  init: function() {
    //set event listeners
    var _this = this;
    $("#input-form").on("submit", function(e){
      e.preventDefault();
      var $formGuess = $("#input-field");
      if(words.length === 0) {                            // win condition
        monstersDefeated++;
        words = ["evil", "live", "veil", "vile"];         // placeholder, resetting the words array
        $formGuess.val(null);
        $("#guesses ul").empty();
        _this.newAnagram();
        _this.newMonster();
      } else {
        var targetWordIndex = words.indexOf($formGuess.val());
        if (targetWordIndex != -1) { // if user guess is included in the array...
          var $newListItem = $("<li>");
          var targetWord = words[targetWordIndex];
          words.splice(targetWordIndex, 1); // remove word from array
          $newListItem.html(targetWord);
          $("#guesses ul").append($newListItem);
          if (words.length === 0){
            $formGuess.submit();
          }
        }
        console.log($formGuess.val());
        $formGuess.val(null);

      }
    });
    this.newAnagram();
    this.newMonster();
  },

  reset: function() {

  },

  newAnagram: function(){
    // append array of anagrams
    var currentWord = words.shift();
    var $currentWord = $("<h1>Input Anagrams For: </br><span class='huge green'>" + currentWord + "</span></br>To Fight Back!</h1>");
    $("#current-word").html($currentWord);
  },

  newMonster: function(){
    // monster object lives in monsters array index 0-7
    // select a random monster (number between 0 and array.length - 1)
    var chosenMonster = monsters[this.randomNumber(monsters)];
    console.log(chosenMonster);
      // display its name
      $("#monster-name").html("<h1>You have been attacked by</br> <span class='red'>" + chosenMonster.name + "</span>!</h1>");
      // display its image
      $("#monster-image").html("<h3>" + chosenMonster.name + " -- HP: " + 30 + "</h3>"); // placeholder hp
      $("#monster-image").append("<img src=" + chosenMonster.image + ">");
      $("#defeated").html("<h3>Monsters Defeated: " + monstersDefeated + "</h3>");
      // pop the monster object from the array so it will not repeat
      monsters.splice(monsters.indexOf(chosenMonster), 1);
      if(monsters.length === 0){
        Game.prototype.youWin();
      }
      console.log(monsters);
  },

  randomNumber: function(array){
    return Math.floor(Math.random() * (array.length -1));
  },

  checkWords: function(){


  },
  youWin: function(){
    $("body").empty();
    $("body").html("<h1 class='huge red'>YOU DEFEATED ALL THE MONSTERS!</h1>");
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

var Monster = function(name, image){
  this.name = name;
  this.hp = 30;
  this.image = image;
};

Monster.prototype = {

};
