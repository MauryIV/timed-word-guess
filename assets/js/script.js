var compWord = ""
var placeHolder = []
var wins = localStorage.getItem("wins")
var losses = localStorage.getItem("losses")
var timeLeft = ""
var time = ""
var aWin = false

// here we have the random word generator for the game
function compChoice() {
  const wordArray = ["elephant", "mountain", "blueberry", "fireplace", "waterfall", "sunflower", "butterfly", "happiness", "adventure", "pineapple", "rainbow", "whisper", "laughter", "chocolate", "bicycle", "moonlight", "carousel", "guitar", "ocean", "journey", "wonder", "serendipity", "harmony", "freedom", "breeze", "paradise", "reflection", "sunset", "dreamer", "silhouette", "enchanted", "fantasy", "captivate", "mystical", "inspire", "imagination",
  "tranquil", "whimsical", "melody", "sapphire", "emerald", "amethyst", "ruby", "diamond", "topaz", "pearl", "opulent", "velvet", "luminous", "vibrant", "radiant", "splendid", "exquisite", "majestic", "charming", "graceful", "elegant", "serene", "blissful", "delightful", "enchanting", "wondrous", "spellbound", "rhapsody", "celestial", "whisper", "harmony", "blossom", "twinkle", "magnificent", "serendipity", "captivating", "tranquility", "paradise"];
  compWord = wordArray[Math.floor(Math.random() * wordArray.length)];
  return compWord;
}

// then a timer needs to be in the background or side, when that hits 0, reset the code.
function timer() {
  time = 5
  timeLeft = setInterval(function() {
    time--;
    document.querySelector("#time-left").textContent = time + " seconds left!";
    if(time === 0) {
      clearInterval(timeLeft);
      // keeping track of losses
      losses++;
      localStorage.setItem("losses", losses);
      document.querySelector("#loss").textContent = ("Losses = " + losses + ".")
      document.getElementById("end").textContent = ("Maybe next time.")
      if (wins > 0) {
        document.querySelector("#win").textContent = ("Wins = " + wins + ".")
      }
    }
  }, 1000)
}

// this is the keydown event that activates the dashes and converts them to the correct letter when pressed
function keydownAction(event) {
  var whatever = []
  let userInput = event.key.toLowerCase()
  if (time === 0) {
    return;
  }
  for (i = 0; i < compWord.length; i++) {
    if (compWord[i] === userInput) {
      whatever.push(i)
    }
  }
  if (compWord.includes(userInput)) {
    for (let index of whatever) {
      placeHolder[index] = userInput;
    }
    document.getElementById("chosen-word").textContent = placeHolder.join("");
    if (!placeHolder.includes (" _ ")) {
      // keeping track of wins, stop timer, and to keep win counter from increasing
      if (!aWin) {
        clearInterval(timeLeft);
        wins++;
        localStorage.setItem("wins", wins);
        document.querySelector("#win").textContent = ("Wins = " + wins + ".")
        document.getElementById("end").textContent = ("Congrats! You got it!")
        aWin = true;
        if (losses > 0) {
          document.querySelector("#loss").textContent = ("Losses = " + losses + ".")
        }
      }
    }
  }
}

// this is to hide the word randomly generated but show an underscore for each letter
function placeHold () {
  for (let i = 0; i < compWord.length; i++) {
    placeHolder.push(" _ ");
  }
  document.getElementById("chosen-word").textContent = placeHolder.join("");
  }

// here we need to reset the placeholder and the input space as well as reset the functions of the game
function restart() {
  document.getElementById("guess").value = ("")
  placeHolder = []
  aWin = false
  compChoice();
  placeHold();
  timer();
}

// event listen for keyboard actions
document.querySelector("#guess").addEventListener("keydown", keydownAction);

// event listen for replaying
document.querySelector("#try-again").addEventListener("click", restart);

restart();
