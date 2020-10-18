
var playerImage,player,ground,backGroundImage,backGround
var banana,bananaImage,obstacle,obstacleImage,gameoverImage,diamond,
gameover;
var FoodsGroup,StonesGroup,survivalTime = 0;
var score = 0,gameState = "start",life = 2;

function preload()
{  
  
  playerImage = loadImage("elsa.png")
  backGroundImage = loadImage("elsa background.jpg");
  bananaImage = loadImage("diamond1.png");
  obstacleImage = loadImage("ghost.png");
  gameoverImage = loadImage("gameover.png");
 
}
function setup() 
{
 
  backGround = createSprite(300,330); 
  backGround.addImage(backGroundImage);
  backGround.velocityX = -3;
  backGround.scale = 1.3;

   createCanvas(600,600); 
    background(225); 
  
  
  ground = createSprite(300,600,600,10);
  // ground.velocityX = -4;
 // ground.visible = false;
   
  player = createSprite(50,470,30,30);    
 player.addImage(playerImage);
  player.scale = 0.15;
   obstaclesGroup = new Group();
  diamondsGroup = new Group();
   
  
}
function draw() 
{  
 
background(225); 
  textSize(20);
    text("LIFE : "+life,500,50);
  textSize(20);
   
  text("score:  "+score,200,50);
  
   

  if(backGround.x<200)
    {
       backGround.x = backGround.width/2;
    }
      player.setCollider("circle",40,30);

  
     diamonds();
    stone();     
     
   player.collide(ground);
    player.scale = 0.2;
   if (keyWentDown("space") && player.x >= 50)
    {
     player.velocityY =  -13; 
      
    }    
    player.velocityY = player.velocityY + 0.3;
      
   if(player.isTouching(obstaclesGroup))
   {
     gameState = "play";
     life = life-1;  
     obstaclesGroup.destroyEach();
   }
   if(player.isTouching(diamondsGroup))
   {
     gameState = "play";
     score = score+2; 
   }
  
    if(life == 0)
     {
       gameState = "end";
     }
   if(gameState == "play")
    {
      obstaclesGroup.destroyEach();
      diamondsGroup.destroyEach();

     
      stone();  
      gameState = "start";
    }  
  if(gameState == "end")
    {
      obstaclesGroup.destroyEach();
      diamondsGroup.visible = false;
      player.destroy();
      ground.destroy();
      gameover = createSprite(300,300,30,30);
      gameover.addImage(gameoverImage);
      gameover.scale = 0.2;
      backGround.x = backGround.width/2;
    }
  
  

drawSprites(); 
  

}

function stone()
{
 if(World.frameCount%300 == 0)
 { 
  obstacle = createSprite(600,520,100,100);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.05;
  obstacle.velocityX =-3;
  obstaclesGroup.add(obstacle); 
 }  
  }
 
 function diamonds()
{
if(World.frameCount%120 == 0){ 
  diamond = createSprite(500,200,200,200);
  diamond.addImage(bananaImage);
  diamond.velocityX = -3;
  diamond.setLifetime = 100;
  diamond.scale = 0.2;
  diamondsGroup.add(diamond);
}
}
