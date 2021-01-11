//Global Variables
var PLAY = 0, LOST = 1, WIN = 2;
var gameState = PLAY;
var wall, monkey, invisible;
var player_running;
var bananaImage, banana, bananaGroup;
var stone, stoneImage, stoneGroup;
var bg, bgImage;
var jungle, jungleImage;
var score = 0;


function preload() {

  bananaImage = loadImage("images/Banana.png");
  jungleImage = loadImage("images/jungle2.jpg");
  stoneImage = loadImage("images/stone.png");
  player_running = loadAnimation(
    "images/Monkey_01.png", "images/Monkey_02.png",
    "images/Monkey_03.png", "images/Monkey_04.png",
    "images/Monkey_05.png", "images/Monkey_06.png",
    "images/Monkey_07.png", "images/Monkey_08.png",
    "images/Monkey_09.png", "images/Monkey_10.png"
  );

}


function setup() {

  createCanvas(displayWidth - 20, displayHeight - 100);

  bg = createSprite(0, 300, 1000, 1000);
  bg.addImage(jungleImage);
  bg.scale = 1.5

  monkey = createSprite(100, 350, 600, 500);
  monkey.addAnimation("running", player_running);
  monkey.velocityX = 5;
  monkey.scale = 0.1;

  invisible = createSprite(350, 670, 1000000, 20);
  invisible.scale = 0.1;
  invisible.visible = true;

  bananaGroup = createGroup();
  stoneGroup = createGroup();

}


function draw() {

  background("pink");

  camera.position.x = monkey.x;

  if (bg.x < camera.position.x - 50) {

    bg.x = camera.position.x;

  }

  if (invisible.x < 0) {

    invisible.x = 200;

  }

  if (gameState === PLAY) {

    if (keyDown("space") && monkey.y >= 545) {

      monkey.velocityY = -15;

    }

    //spawning the bananas and the stones
    spawnBanana();
    spawnStone();


    if (keyDown(RIGHT_ARROW)) {

      monkey.x = monkey.x + 10;
      bg.velocityX = -1;

    }

    //making a scrolling background 
    if (bg.x < 100) {

      bg.x = 10;

    }

    if (monkey.isTouching(bananaGroup)) {

      //making the bananas disappear
      bananaGroup.destroyEach();

      //increasing score by a random value
      score += floor(map(random(), 0, 1, 5, 15));

      //winning the game
      if (score > 50) {

        gameState = WIN;

      }

      //making the monkey bigger in size based on the score
      else {

        monkey.scale = map(score, 0, 50, 0.1, 0.18);

      }

    }

    //applying gravity to the monkey
    monkey.velocityY++;

    monkey.collide(invisible);

  }

  //losing the game
  if (stoneGroup.isTouching(monkey)) {

    gameState = LOST;

  }

  //condition for losing the game
  if (gameState === LOST) {

    textSize(80);
    strokeWeight(5)
    stroke("black")
    fill("yellow");
    text("Game Over", camera.position.x - 150, 380);

    fill("magenta")
    text("Reload your page to play again", camera.position.x - 500, 550);
    end();

  }

  //condition for winning the game
  if (gameState === WIN) {

    fill(255);
    textSize(80);
    text("YOU WIN!!", camera.position.x - 100, 400);
    text("Reload your page to play again", camera.position.x - 500, 550);
    end();

  }

  drawSprites();

  //displaying score
  strokeWeight(5)
  stroke("black")
  fill("Red")
  textSize(50);
  text("Score : " + score, monkey.x - 50, 50);

  strokeWeight(5)
  stroke("black");
  fill("lime");
  textSize(50);
  text("Press right arrow to move faster", monkey.x - 300, 150);

  strokeWeight(5)
  stroke("black")
  fill("cyan")
  text(50);
  text("To win the required points are 50", monkey.x - 300, 250)

}


//funciton for ending the game
function end() {

  bg.visible = false;
  monkey.visible = false;

  bananaGroup.destroyEach();
  stoneGroup.destroyEach();

}


//function for spawning bananas
function spawnBanana() {

  if (frameCount % 100 === 0) {

    banana = createSprite(monkey.x + 400, 450, 500, 500);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 1000;
    bananaGroup.add(banana);

  }

}


//function for spawning stones
function spawnStone() {

  if (frameCount % 150 === 0) {

    stone = createSprite(monkey.x + 1000, 620);
    stone.addImage(stoneImage);
    stone.scale = 0.2;
    stone.lifetime = 1000;
    stoneGroup.add(stone);

  }

}