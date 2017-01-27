// CURRENT STATUS -- moved newMonster method to Monster prototype, which broke the app





var $resetButton = $("<button id='reset-button'>Reset</button>");               // selects the reset button element for later use
var chosenMonster;                                                              // inits the chosenMonster variable for hoisting purposes
//var monsterHP = 30;                                                             // inits the monster's HP value
var monstersDefeated = 0;                                                       // inits the player's counter for monsters defeated
var monsters = [                                                                // object containing monsters, their image, and words
  {                                                                             // that will be associated with them
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

function randomNumber(array){                                                // generates a random number for which monster to chose
  return Math.floor(Math.random() * array.length);
}
