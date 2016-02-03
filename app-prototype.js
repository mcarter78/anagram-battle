var words = ["evil", "live", "veil", "vile"];
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
    $("#input-form").on("submit", function(e){
      e.preventDefault();
      var $formGuess = $("#input-field");
      if(words.length === 0){
        words = ["evil", "live", "veil", "vile"];         // placeholder, resetting the words array
        $formGuess.val(null);
        $("#guesses ul").empty();
        Game.prototype.newAnagram();
        Game.prototype.newMonster();
      }
      else {                                              // BUGGY -- this function will
        words.forEach(function(index){                    // only accept a correct answer
          if($formGuess.val() === index){                 // if it is at words[0]
            var $newListItem = $("<li>");
            var addThis = words.splice(index, 1);
            $newListItem.html(addThis + " ");
            $("#guesses ul").append($newListItem);
            console.log(words);
            if (words.length === 0){
              $formGuess.submit();
            }
          }
          console.log($formGuess.val());
          $formGuess.val(null);

        });
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
