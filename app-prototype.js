var words = ["evil", "live", "veil", "vile"];
var monsterHP = 30;
var monstersDefeated = 0;
var monsters = [
  {
    name: "The Zombie",
    image: "img/zombie.jpg"
  },
  {
    name: "The Skeleton Warrior",
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
    name: "The Demon",
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
    $("#play-again").on("click", function(e){
      _this.resetGame();
    });
    $("#input-form").on("submit", function(e){
      e.preventDefault();
      var $formGuess = $("#input-field");
      if(words.length === 0) {                            // win condition
        _this.defeatMonster();
      } else {
        _this.checkWords($formGuess.val());
        $formGuess.val(null);

      }
    });

    this.newAnagram();
    this.newMonster();
  },

  resetGame: function() {
    var newGame = new Game();
    newGame.init();
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
    monsterHP = 30;
    var chosenMonster = monsters[this.randomNumber(monsters)];
    console.log(chosenMonster);
    // display its name
    $("#monster-name").html("<h1>You have been attacked by</br> <span class='red'>" + chosenMonster.name + "</span>!</h1>");
    // display its image
    $("#monster-image").html("<img src=" + chosenMonster.image + ">");
    $("#monster-image").append("<h3>" + chosenMonster.name + " -- HP: <span id='hp'>" + monsterHP + "</span><span id='damage' class='hidden'>  -10</span></h3>"); // placeholder hp
    $("#defeated").html("<h3>Monsters Defeated: " + monstersDefeated + "</h3>");
    // pop the monster object from the array so it will not repeat
    monsters.splice(monsters.indexOf(chosenMonster), 1);
    var _this = this;
    if(monsters.length === 0){
      _this.youWin();
    }
    console.log(monsters);
  },

  randomNumber: function(array){
    return Math.floor(Math.random() * (array.length -1));
  },

  checkWords: function(guess){
    var _this = this;
    var targetWordIndex = words.indexOf(guess);
    if (targetWordIndex != -1) { // if user guess is included in the array...
      var $newListItem = $("<li>");
      var targetWord = words[targetWordIndex];
      words.splice(targetWordIndex, 1); // remove word from array
      $newListItem.html(targetWord);
      $("#guesses ul").append($newListItem);
      _this.doDamage();
      if (words.length === 0){
        $("#input-field").submit();
      }
    }
    console.log(guess);
  },

  doDamage: function(){
    monsterHP = monsterHP - 10;
    $("#hp").html(monsterHP);
    $("#damage").removeClass("hidden");
    $("#damage").fadeOut().delay(200).addClass("hidden");       // not working -- fix later
  },

  defeatMonster: function(){
    monstersDefeated++;
    words = ["evil", "live", "veil", "vile"];         // placeholder, resetting the words array
    $("#input-field").val(null);
    $("#guesses ul").empty();
    this.newAnagram();
    this.newMonster();
  },

  youWin: function(){
    $("#screen").empty();
    $("#screen").html("<h1 class='huge red'>YOU DEFEATED ALL THE MONSTERS!</h1>");
    $("#screen").append("<h3>Monsters Defeated: " + monstersDefeated + "</h3>");
    $("#screen").append("<button id='play-again'>Play Again</button>");
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

var Monster = function(name, image, hp){
  this.name = name;
  this.image = image;
};

Monster.prototype = {

};
