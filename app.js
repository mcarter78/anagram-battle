// components needed
  // timer to start at 60 seconds and decrease as game is active
  // counter for number of games played                     (Player.gamesPlayed)
  // counter for number of monsters defeated                (Player.score)
  // "Time's Up!" array with anagrams
  // Array of NORMAL words
  // Array of HARD words
  // monster hit points                                     (Monster.hp)
  // counter of correct words entered
  // high score list object (HOW TO MAKE IT PERSIST?

var Game = function(){
  this.score = 0;
  this.timer = 60;
};


var Player = function(name, gamesPlayed){
  this.name = name;
  this.gamesPlayed = gamesPlayed;
};

var Monster = function(name, hp, image){
  this.name = name;
  this.hp = hp;
  this.image = image;
};

Game.prototype = {
  init: function(player) {
     //set event listeners
  },
  reset: function() {

  }

  // move more appropriate functions in here

};

function getPlayerName(str){
  // start with prompt for player's name
  // append form & submit button
    // validate input
      // if input is true
        // add player name to history (HOW TO ACHIEVE THIS?)
        // remove form & submit button
}

function chooseDifficulty(){
  // change to display prompt to choose a difficulty
  // append NORMAL, HARD buttons
    // set event listeners to button click
    // when button clicked
      // make appropriate calls to API for the corresponding arrays of anagrams
        // forEach word in NORMAL or HARD array:
        // ajax GET request
        // url: http://www.anagramica.com/best/:starterword
        // store response (object containing array of words) in a variable
        // loop through response and remove starterword if it exists (not always at index 0)
        // unshift starter word into array (force it to index 0)
      // remove prompt text and buttons
      // startTimer();
      // newAnagram();
      // newMonster();
}

function startTimer(){
  // start pre-timer -- 3 seconds
  // display each number (fadeIn / fadeOut)
  // start game-timer -- 60 seconds
  // display game-timer (static)
}

function doDamage(){
  // subtract 10 from Monster.hp
  // append monster damage indicator, but only display when correct guess is made
    // fade out damage indicator
}

function timesUp(arr){
  // append "Time's up" display, loop through the array and change every 10 seconds
  // if timer reaches 0, display "Time's Up!"
  // remove array of anagrams, monster hp display, input form
  // append "You defeated (number of monsters defeated) monsters"
    // change wording of this display based on number defeated
    // higher number receives higher praise
}

function newAnagram(str){
  // append array of anagrams, display each word as it is correctly guessed
  // startTimer();
  // doDamage();
}

function defeatMonster(){
  // if all words are guessed
    // remove monster (effect?)
    // newMonster();
    // newAnagram();
}

function newMonster(){
  // display random monster from Monster object, with name and hp
}
