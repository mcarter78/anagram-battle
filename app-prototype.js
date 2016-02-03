var words = ["evil", "live", "veil", "vile"];
var monsters = [
  {
    name: "Zombie",
    image: "img/zombie.jpg"
  },
  {
    name: "Skeleton Warrior",
    image: "img/skeleton-warrior.jpg"
  },
  {
    name: "Rock Monster",
    image: "img/rock-monster.jpg"
  },
  {
    name: "Dragon",
    image: "img/dragon.jpg"
  },
  {
    name: "Demon",
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
    name: "Venus Flytrap",
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
      $formGuess.val(null);
    });
    this.newAnagram();
    this.newMonster();
  },

  reset: function() {

  },

  newAnagram: function(){
    // append array of anagrams
    var currentWord = words.shift();
    var $currentWord = $("<h1>Input Anagrams For: </br><span class='huge'>" + currentWord + "</span></h1>");
    $("#current-word").append($currentWord);
  },

  newMonster: function(){                                                 // FUNCTION IS BUGGY
    // monster object lives in monsters array index 0-7
    // select a random monster (number between 0 and array.length - 1)
    var chosenMonster = monsters[this.randomNumber(monsters)];
    console.log(chosenMonster);
      // display its name
      $("#monster-name").html("<h1>" + chosenMonster.name + "</h1>");
      // display its image
      $("#monster-image").html("<img src=" + chosenMonster.image + ">");
      // pop the monster object from the array so it will not repeat
      monsters.splice(monsters.indexOf(chosenMonster), 1);
      console.log(monsters);
  },

  randomNumber: function(array){
    return Math.floor(Math.random() * (array.length -1));
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
