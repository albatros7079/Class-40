class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100,200);
    car1.addImage("Car1", c1);
    car2 = createSprite(300,200);
    car2.addImage("Car2", c2);
    car3 = createSprite(500,200);
    car3.addImage("Car3", c3);
    car4 = createSprite(700,200);
    car4.addImage("Car4", c4); 
    cars = [car1,car2,car3,car4];
  }

  play(){
    form.hide();
    //textSize(30);
    //text("Game Start", 120, 100)
    Player.getPlayerInfo();
    player.getCarsAtEnd();

    if(allPlayers !== undefined){
      background(198,135,103);
      image(trackImg, 0, -displayHeight*4, displayWidth, displayHeight*5);
      var index = 0;
      var x = 175;
      var y;
      //var display_position = 130;
      for(var plr in allPlayers){
        index = index+1;
        x = x+200;
        y = displayHeight-allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          //cars[index-1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
       
        }
        
        //display_position+=20;
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(player.distance>3500) {
      gameState = 2;
      player.rank+=1;
      Player.updateCarsAtEnd(player.rank);
    }
    drawSprites();
  }
  end() {
    console.log("game ended")
    console.log(player.rank);
    var message = createElement('h2');
    message.html("congratulations "+player.name+" your rank is "+player.rank);
    message.position(displayWidth/2-80, displayHeight/4);
  }
}
