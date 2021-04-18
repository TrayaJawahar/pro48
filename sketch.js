// created variables
var backimage;
var stoneimage;
var bananaimage;
var play_running;
var score ;
var ground;
var mon;
var bananaGroup,obstaclesGroup;
var backgrounds;
var touches=[];

function preload() {
  // loaded images and animation 
  backimage = loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaimage = loadImage("banana.png");
  stoneimage = loadImage("stone.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  // created forest background
  backgrounds = createSprite(windowWidth-300,windowHeight-300,600,450);
  backgrounds.addImage(backimage);
  
  // created a continouous moving background
  backgrounds.velocityX=-5;
  backgrounds.x=backgrounds.width/2;
  backgrounds.scale=1.5;
  
// created ground and made it invisible
   ground = createSprite(windowWidth-1650,windowHeight-50,windowWidth,10);
   ground.visible=false;
  
  // created monkey 
   mon = createSprite(windowWidth-1500,windowHeight-410,20,20);
   mon.addAnimation("Running",player_running);
  mon.scale=0.1;
  
  // made banana and obstacle group
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  console.log(windowWidth,windowHeight);
  score=0;
}  

function draw() {
  background(225);
  
  
   
   // to make the monkey collide the ground 
 mon.collide(ground);
  
  // to make the monkey jump
   if(touches.lenght>0 || keyDown("space") && mon.y>=windowHeight-100) {
    mon.velocityY = -20;
    touches=[];
  }
  
  // to add gravity for the monkey
  mon.velocityY = mon.velocityY + 0.8
  
     // to increase the score when touched a banana
  if(bananaGroup.isTouching(mon)){
    score=score+2;
   bananaGroup.destroyEach(); 
  }
  
  // to bring back the initial size of the monkey when touched the monkey
   if(obstaclesGroup.isTouching(mon)){
     mon.scale=0.1  ;
     obstaclesGroup.destroyEach();
   }
  
  // to increase the size of the monkey when it reaches certain scores
  switch(score){
    case 10 : mon.scale=0.12;
      break;
      case 20 : mon.scale=0.14;
      break;
      case 30 : mon.scale =0.16;
      break;
      case 40: mon.scale=0.18;
      break;
      default:break;
  }
  
  // to make the background move continuously
  if(backgrounds.x<100){
    backgrounds.x=backgrounds.width/2;
  }
  
  //console.log(score);
  bana();
  obstacles();
  
  drawSprites();
  
stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 200,50);
}

// creating of bananas and adding it in banana group
function bana() {
  if (frameCount % 80 === 0) {
    var yt= random(windowHeight-200,windowHeight-300);
    var banana = createSprite(400,yt, 5, 5);
    banana.addImage (bananaimage);
    banana.scale = 0.05;
    banana.velocityX = -6;
    banana.lifetime = 70;
    //console.log(yt);
    bananaGroup.add(banana);
  }
}

//creating of stones and adding it in obstacles group
function obstacles() {
  if (frameCount % 300 === 0) {
    var stones = createSprite(400,windowHeight-50, 5, 5);
    stones.addImage(stoneimage);
    stones.scale = 0.15;
    stones.velocityX = -4;
    stones.lifetime = 100;
    obstaclesGroup.add(stones);
  }
}