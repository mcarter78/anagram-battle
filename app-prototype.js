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

var Game = function(){
  this.score = 0;
  this.timer = 60;
};

Game.prototype = {

  init: function() {
    monstersDefeated = 0;
    monsterHP = 30;
    this.startScreen();
  },

  startGame: function(){
    $("#screen").empty();
    this.getArrays();
    this.battleScreen();
    this.newMonster();
    var _this = this;
    $("#input-form").on("submit", function(e){
      console.log("input");
      e.preventDefault();
      var $formGuess = $("#input-field");
      if(chosenMonster.words.length === 0) {                            // win condition
        _this.defeatMonster(chosenMonster);
      } else {
        _this.checkWords($formGuess.val());
        $formGuess.val(null);
      }
    });
  },

  startScreen: function(){
    $("#screen").empty();
    $("#screen").append("<h1 class=huge>Instructions:</h1>");
    $("#screen").append("<h3>Battle monsters with Anagrams!</br>Enter 3 Anagrams to defeat the current monster and move on to the next.</br>Press Enter to submit your answer.");
    $("#screen").append("<button id='play-button'>Play!</button>");
    var _this = this;
    $("#play-button").on("click", function(e){
      console.log("click");
      _this.startGame();
    });
  },

  battleScreen: function(){
    $("#screen").empty();
    $("#screen").append("<div id='left'>");
    $("#screen").append("<div id='right'>");
    $("#left").append("<div id='monster-name'>");
    $("#left").append("<div id='current-word'>");
    $("#left").append("<div id='input'>");
    $("#left").append("<div id='guesses'>");
    $("#left").append("<div id='defeated'>");
    $("#input").append("<form id='input-form'  autocomplete='off'>");
    $("#input-form").append("<input id='input-field' autofocus type='text' placeholder='Attack!'>");
    $("#input-form").append("<input id='submit-button' type='submit'>");
    $("#guesses").append("<ul>");
    $("#right").append("<div id='monster-image'>");
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

  newMonster: function(){
    // monster object lives in monsters array index 0-7
    // select a random monster (number between 0 and array.length - 1)
    monsterHP = 30;
    chosenMonster = monsters[this.randomNumber(monsters)];

    console.log(chosenMonster);
    // display its name
    $("#monster-name").html("<h1>You have been attacked by</br> <span class='red'>" + chosenMonster.name + "</span>!</h1>");
    // display its image
    $monsterImage = $("#monster-image").html("<img src=" + chosenMonster.image + ">");
    $monsterImage.fadeIn(800);
    $("#monster-image").append("<h3>" + chosenMonster.name + " -- HP: <span id='hp'>" + monsterHP + "</span><span id='damage' class='hidden'> -10</span></h3>"); // placeholder hp
    $("#defeated").html("<h3>Monsters Defeated: " + monstersDefeated + "</h3>");
    // pop the monster object from the array so it will not repeat

    // append array of anagrams
    var currentWord = chosenMonster.words.shift();
    var $currentWord = $("<h1>Input 3 Anagrams For: </br></br><span class='huge green'>" + currentWord + "</span></br></br>To Fight Back!</h1>");
    $("#current-word").html($currentWord);
    var _this = this;

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
        setTimeout(function(){$("#input-field").submit();}, 800);
      }
    }
    console.log(guess);
  },

  doDamage: function(){
    monsterHP = monsterHP - 10;
    $("#hp").html(monsterHP);
    $("#monster-image img").effect("shake");
    var $damage = $("#damage").removeClass("hidden");
    $damage.fadeIn(400);
    $damage.delay(400).fadeOut(400);       // not working -- fix later
  },

  defeatMonster: function(){
    var _this = this;
    $("#monster-image").effect("shake").effect("shake").fadeOut(800);
    monsters.splice(monsters.indexOf(chosenMonster), 1);
    monstersDefeated++;
    $("#input-field").val(null);
    $("#guesses ul").empty();
    setTimeout(function(){_this.newMonster();}, 1600);
    if(monsters.length === 0){
      setTimeout(function(){_this.youWin();}, 1600);
    }
  },

  youWin: function(){
    $("#screen").empty();
    $("#screen").html("<h1 class='huge red'>YOU DEFEATED ALL THE MONSTERS!</h1>");
    $("#screen").append("<h3>Monsters Defeated: " + monstersDefeated + "</h3>");
    $("#screen").append("<button id='play-again'>Again?</button>");
    var _this = this;
    $("#play-again").on("click", function(e){             // NOT WORKING YET, DOES NOT RESET VARIABLES
      console.log("click");
      _this.resetGame();
    });
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
