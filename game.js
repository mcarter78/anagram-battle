var Game = function(){                                                          // constructor function for the game
  this.score = 0;                                                               // contents will be used for later features
  this.timer = 60;
  this.monster = new Monster();
};

Game.prototype = {                                                              // game methods defined here

  init: function() {                                                            // method to initialize a new game
    monstersDefeated = 0;
    monsterHP = 30;
    this.startScreen();
  },

  startGame: function(){                                                        // method called when play button is clicked
    $("#screen").empty();                                                       // wipes the screen and calls methods to
    this.getArrays();                                                           // load array, monster and battle screen
    this.battleScreen();
    this.monster.newMonster();
    var _this = this;
    $("#reset-button").on("click", function(){                                  // event listener on reset button
      _this.resetGame();
    });
    $("#input-form").on("submit", function(e){                                  // event listener on form submit
      console.log("input");
      e.preventDefault();
      var $formGuess = $("#input-field");
      if(chosenMonster.words.length === 0) {                                    // win condition
        _this.defeatMonster(chosenMonster);
      } else {                                                                  // calls method to check for correct word input
        _this.checkWords($formGuess.val());
        $formGuess.val(null);
      }
    });
  },

  startTimer: function() {
    var _this = this;
    var seconds = 60;
    var timer = setInterval(function() {
      $('#timer').html('time left: ' + seconds);
      seconds -= 1;
      if (seconds === -1) {
        _this.youLose();
        clearInterval(timer);
      }
    }, 1000);
  },

  startScreen: function(){                                                      // method to build start screen and append to the DOM
    $("#screen").empty();
    $("#screen").append("<h1 class=huge>Instructions:</h1>");
    $("#screen").append("<h3>Battle monsters with Anagrams!</br>Enter 3 Anagrams to defeat the current monster and move on to the next.</br>Press Enter to submit your answer.");
    $("#screen").append("<button id='play-button'>Play!</button>");
    var _this = this;
    $("#play-button").on("click", function(e){                                  // event trigger on play button to start game when clicked
      console.log("click");
      _this.startGame();
      _this.startTimer();
    });
  },

  battleScreen: function(){                                                     // method to build battle screen and append it to the DOM
    $("#screen").empty();
    $("#screen").append("<div id='left'>");
    $("#screen").append("<div id='right'>");
    $("#left").append("<div id='monster-name'>");
    $("#left").append("<div id='current-word'>");
    $("#left").append("<div id='input'>");
    $("#left").append("<div id='guesses'>");
    $("#left").append("<div id='timer'>");
    $("#left").append("<div id='defeated'>");
    $("#input").append("<form id='input-form'  autocomplete='off'>");
    $("#input-form").append("<input id='input-field' autofocus type='text' placeholder='Attack!'>");
    $("#input-form").append("<input id='submit-button' type='submit'>");
    $("#guesses").append("<ul>");
    $("#right").append("<div id='monster-image'>");
    $("body").append($resetButton);
  },

  resetGame: function() {                                                       // method to reset game -- WIP
    // var newGame = new Game();                                                // currently simply reloads the page
    // newGame.init();
    location.reload();
  },

  getArrays: function(){                                                        // word arrays hardcoded for now
    // make ajax calls for arrays of anagrams                                   // come back to this if time allows
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



  checkWords: function(guess){                                                  // method to check if word submitted is one of the anagrams
    var _this = this;
    var targetWordIndex = chosenMonster.words.indexOf(guess);
    if (targetWordIndex != -1) {                                                 // if user guess is included in the array...
      var $newListItem = $("<li>");
      var targetWord = chosenMonster.words[targetWordIndex];
      chosenMonster.words.splice(targetWordIndex, 1);                           // remove word from array
      $newListItem.html(targetWord);
      $("#guesses ul").append($newListItem);
      _this.doDamage();
      if (chosenMonster.words.length === 0){
        setTimeout(function(){$("#input-field").submit();}, 800);
      }
    }
    console.log(guess);
  },

  doDamage: function(){                                                         // method to decrease monster HP when correct word is submitted
    monsterHP = monsterHP - 10;                                                 // also causes monster shake effect to trigger
    $("#hp").html(monsterHP);
    $("#monster-image img").effect("shake");
    var $damage = $("#damage").removeClass("hidden");
    $damage.fadeIn(400);
    $damage.delay(400).fadeOut(400);       // not working -- fix later
  },

  defeatMonster: function(){                                                    // method to remove monster when defeated
    var _this = this;
    $("#monster-image").effect("shake").effect("shake").fadeOut(800);
    monsters.splice(monsters.indexOf(chosenMonster), 1);
    monstersDefeated++;
    $("#input-field").val(null);
    $("#guesses ul").empty();
    setTimeout(function(){_this.monster.newMonster();}, 1600);
    if(monsters.length === 0){
      setTimeout(function(){_this.youWin();}, 1600);
    }
  },

  youWin: function(){                                                           // method to build you win screen and add to the DOM
    $("#screen").empty();                                                       // when all monsters are defeated
    $("#reset-button").remove();
    $("#screen").html("<h1 class='huge red'>YOU DEFEATED ALL THE MONSTERS!</h1>");
    $("#screen").append("<h3>Monsters Defeated: " + monstersDefeated + "</h3>");
    $("#screen").append("<button id='play-again'>Again?</button>");
    var _this = this;
    $("#play-again").on("click", function(e){             // NOT WORKING YET, DOES NOT RESET VARIABLES
      console.log("click");
      _this.resetGame();
    });
  },
  youLose: function(){                                                           // method to build you win screen and add to the DOM
    $("#screen").empty();                                                       // when all monsters are defeated
    $("#reset-button").remove();
    $("#screen").html("<h1 class='huge red'>You were defeated by " + chosenMonster.name + "!</h1>");
    $("#screen").append("<h3>Monsters Defeated: " + monstersDefeated + "</h3>");
    $("#screen").append("<button id='play-again'>Again?</button>");
    var _this = this;
    $("#play-again").on("click", function(e){             // NOT WORKING YET, DOES NOT RESET VARIABLES
      console.log("click");
      _this.resetGame();
    });
  }
};
