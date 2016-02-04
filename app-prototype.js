var $inputForm = $("#input-form");
var chosenMonster;
var monsterHP = 30;
var monstersDefeated = 0;
var monsters = [
  {
    name: "The Zombie",
    image: "img/zombie.jpg",
    words: ["bruise","buries","busier","rubies"]
  },
  {
    name: "The Skeleton Warrior",
    image: "img/skeleton-warrior.jpg",
    words: ["coins","icons","scion","sonic"]
  },
  {
    name: "The Rock Monster",
    image: "img/rock-monster.jpg",
    words: ["evil","live","veil","vile"]
  },
  {
    name: "The Red Dragon",
    image: "img/dragon.jpg",
    words: ["glare","lager","large","regal"]
  },
  {
    name: "The Demon",
    image: "img/demon.jpg",
    words: ["limes","miles","slime","smile"]
  },
  {
    name: "Godzilla",
    image: "img/godzilla.jpg",
    words: ["naps","pans","snap","span"]
  },
  {
    name: "Indominus Rex",
    image: "img/indominus-rex.jpg",
    words: ["past","pats","spat","taps"]
  },
  {
    name: "The Venus Flytrap",
    image: "img/venus-flytrap.jpg",
    words: ["serve","sever","veers","verse"]
  },
];
console.log(monsters);


var Game = function(){
  this.score = 0;
  this.timer = 60;
};

Game.prototype = {

  init: function() {
    //set event listeners
    this.getArrays();
    var _this = this;
    $("#play-again").on("click", function(e){             // NOT WORKING YET, DOES NOT RESET VARIABLES
      _this.resetGame();
    });
    $("#input-form").on("submit", function(e){
      e.preventDefault();
      var $formGuess = $("#input-field");
      if(chosenMonster.words.length === 0) {                            // win condition
        _this.defeatMonster();
      } else {
        _this.checkWords($formGuess.val());
        $formGuess.val(null);

      }
    });

    //this.newAnagram();
    this.newMonster();
  },

  resetGame: function() {
    var newGame = new Game();
    newGame.init();
  },

  getArrays: function(){                                          // word arrays hardcoded for now
    // make ajax calls for arrays of anagrams                     // come back to this if time allows
    // for(var i = 0; i < monsters.length; i++){
    //   $.ajax({
    //     method: 'GET',
    //     url: 'http://www.anagramica.com/best/:' + monsters[i].word,
    //     success: function(data){
    //       data.best.shift();
    //       monsters[i].wordArray = data.best;
    //     }
    //   });
    // }
    // http://www.anagramica.com/best/:
    // store arrays in monsters[index].words (give each monster his own array of words)
    // loop through each array to remove starter word (maybe choose only with index 0 and don't loop?)
    // fix game functions to grab the words from the monster objects
  },

  newAnagram: function(){

  },

  newMonster: function(){

    // monster object lives in monsters array index 0-7
    // select a random monster (number between 0 and array.length - 1)
    monsterHP = 30;
    chosenMonster = monsters[this.randomNumber(monsters)];
    console.log(chosenMonster);
    // display its name
    $("#monster-name").html("<h1>You have been attacked by</br> <span class='red'>" + chosenMonster.name + "</span>!</h1>");
    // display its image
    $("#monster-image").html("<img src=" + chosenMonster.image + ">");
    $("#monster-image").append("<h3>" + chosenMonster.name + " -- HP: <span id='hp'>" + monsterHP + "</span><span id='damage' class='hidden'>  -10</span></h3>"); // placeholder hp
    $("#defeated").html("<h3>Monsters Defeated: " + monstersDefeated + "</h3>");
    // pop the monster object from the array so it will not repeat
    monsters.splice(monsters.indexOf(chosenMonster), 1);
    // append array of anagrams
    var currentWord = chosenMonster.words.shift();
    var $currentWord = $("<h1>Input Anagrams For: </br></br><span class='huge green'>" + currentWord + "</span></br></br>To Fight Back!</h1>");
    $("#current-word").html($currentWord);
    var _this = this;
    if(monsters.length === 0){
      _this.youWin();
    }
    console.log(monsters);
  },

  randomNumber: function(array){
    return Math.floor(Math.random() * array.length);
  },

  checkWords: function(guess){
    var _this = this;
    var targetWordIndex = chosenMonster.words.indexOf(guess);
    if (targetWordIndex != -1) { // if user guess is included in the array...
      var $newListItem = $("<li>");
      var targetWord = chosenMonster.words[targetWordIndex];
      chosenMonster.words.splice(targetWordIndex, 1); // remove word from array
      $newListItem.html(targetWord);
      $("#guesses ul").append($newListItem);
      _this.doDamage();
      if (chosenMonster.words.length === 0){
        $("#input-field").submit();
      }
    }
    console.log(guess);
  },

  doDamage: function(){
    monsterHP = monsterHP - 10;
    $("#hp").html(monsterHP);
    $("#monster-image img").effect("shake");
    $("#damage").removeClass("hidden");
    $("#damage").fadeOut().delay(200).addClass("hidden");       // not working -- fix later
  },

  defeatMonster: function(){
    monstersDefeated++;
    //words = ["evil", "live", "veil", "vile"];         // placeholder, resetting the words array
    $("#input-field").val(null);
    $("#guesses ul").empty();
    //this.newAnagram();
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

var Monster = function(name, image){
  this.name = name;
  this.image = image;
};

Monster.prototype = {

};
