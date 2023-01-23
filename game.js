var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var running = false;
var level = 0;
var highScore = 0;
$(".btn").on("click", function (params) {
  var id = $(this).attr("id");
  highScore = Math.max(highScore, level);
  $("#highscore").text("High Score : " + highScore);
  userClickedPattern.push(id);
  checkAnswer(id, userClickedPattern.length);
  //   console.log(userClickedPattern);
  clickAnimation(id);
  playSound(id);
});

$(document).on("keypress", () => {
  if (running == false) {
    nextSequence();
    running = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text(`Level ${level}`);
  var n = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[n];
  gamePattern.push(randomChosenColour);
  //   console.log(randomChosenColour);
  //   clickAnimation(randomChosenColour);
  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
function playSound(colour) {
  var audio = new Audio(`sounds/${colour}.mp3`);
  audio.play();
}

function clickAnimation(colour) {
  $(`#${colour}`).addClass("pressed");
  setTimeout(() => {
    $(`#${colour}`).removeClass("pressed");
  }, 100);
}

function checkAnswer(colour, idx) {
  if (gamePattern[idx - 1] !== colour) {
    $("#level-title").text("Game Over! Press any key to restart");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    restartGame();
  } else {
    if (idx == gamePattern.length && running) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  }
}

function restartGame() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  running = false;
}
