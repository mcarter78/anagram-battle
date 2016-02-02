// components needed
  // timer to start at 60 seconds and decrease as game is active
  // counter for number of games played
  // counter for number of monsters defeated
  // "Time's Up!" array with anagrams
  // Array of EASY words
  // Array of NORMAL words
  // Array of HARD words
  // monster hit points
  // counter of correct words entered
  // high score list object (HOW TO MAKE IT PERSIST?)

// start with prompt for player's name
// append form & submit button
  // validate input
    // if input is true
      // add player name to history (HOW TO ACHIEVE THIS?)
      // remove form & submit button

// change to display prompt to choose a difficulty
// append EASY, NORMAL, HARD buttons
  // set event listeners to button click a
  // when button clicked
    // make appropriate call to API for the corresponding array of anagrams
    // remove prompt text and buttons

// build main game screen
  // append "Time's up" display, loop through the array and change every 10 seconds
  // append array of anagrams, display each word as it is correctly guessed
  // append and display monster, hit points
  // append monster damage indicator, but only display when correct guess is made
    // fade out damage indicator
  // if all words are guessed
    // remove monster (effect?)
    // append next array of anagrams
    // change monster and reset monster hit points
    // add 15 seconds to timer
    // continue

// when timer reaches 0
  // display "Time's Up!"
  // remove array of anagrams
  // remove monster, hit points
  // append "You defeated (number of monsters defeated) monsters"
    // change wording of this display based on number defeated
    // higher number receives higher praise
  // append reset "start again" button
    // event listener on button
      // initializes new game
