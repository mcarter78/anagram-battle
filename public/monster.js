var Monster = function(name, image){                                            // unused constructor, for use with future features
  this.name = name;
  this.image = image;
};

Monster.prototype = {
  newMonster: function(){                                                       // method to choose a monster from the monsters object,
    monsterHP = 30;
    // monster object lives in monsters array index 0-7                         // add its name, image, and set of words to the battle screen
    // select a random monster (number between 0 and array.length - 1)
    chosenMonster = monsters[randomNumber(monsters)];
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
    // for each letter in currentWord, create a div with that letter as innerText
    currentWord = currentWord.split('');
    console.log(currentWord);
    var $currentWord = $("<h1>Input 3 Anagrams For:</h1><div id='tileset'></div><br><h1>To Fight Back!</h1>");
    $("#current-word").html($currentWord);
    currentWord.forEach(function(letter) {
      var $el = $('<div class="tile"></div>');
      $el.html(letter);
      $("#tileset").append($el);
    });
  },
};
