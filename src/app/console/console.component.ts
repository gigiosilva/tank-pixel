import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {

  @ViewChild('canvas') el:ElementRef;

  canvas;
  context;

  keys = [];

  width = 550;
  height = 400;
  speed = 3;

  player = {
    x: 30,
    y: 30,
    width: 30,
    height: 30,
    pos: 4,
    color: "blue"
  };

  playerCannon = {
    x: 60,
    y: 40,
    width: 10,
    height: 10,
    color: "blue"
  };

  multiPlayer = {
    x: 30,
    y: 30,
    width: 30,
    height: 30,
    pos: 4,
    color: "red",
    name: ""
  };

  multiPlayerCannon = {
    x: 30,
    y: 30,
    width: 30,
    height: 30,
    pos: 4,
    color: "red"
  };

  projectile = {
    x: 40,
    y: 40,
    width: 10,
    height: 10,
    shot: 0,
    speed: 10,
    dir: 4,
    color: "yellow"
  };

  enemy = {
    x: Math.round(Math.random() * (this.width - 30)),
    y: Math.round(Math.random() * (this.height - 30)),
    width: 30,
    height: 30,
    speed: 2,
    qty: 1,
    factor: 0.1,
    color: "red"
  };

  enemyCannon = {
    x: 60,
    y: 40,
    width: 10,
    height: 10,
    color: "red"
  };

  score = 0;
  highScore = 0;
  pressed = 0;

  gameOver = false;
  menu = true;
  waiting = false;
  inGame = false;
  scored = false;
  playerName;
  scoreTable;
  multiplayerMode = false;

  constructor() { }

  ngOnInit() {
    this.canvas = this.el.nativeElement;
    this.context = this.canvas.getContext("2d")

    window.addEventListener("keydown", (e) => {
      //console.log(e.keyCode);
      this.keys[e.keyCode] = true;
    }, false);
    
    window.addEventListener("keyup", (e) => {
      delete this.keys[e.keyCode];
      this.pressed = 0;
    }, false);

    setInterval( () => {
      this.game();
    }, 1000/30);
  }

  getName() {
    let name = prompt("Digite seu nome:", "");
      if (name != null) {
         this.playerName = name;
      //    $.post('operationsDB.php', { op: "saveUser", userName:playerName }, function(result) { 
      //      console.log(result); 
      // });
      }
  }

  game(){
    this.update();
    this.render();
  }

  process(){
    if(!this.gameOver){
      this.score++;
      this.enemy.x =  Math.round(Math.random() * (this.width - 20));
      this.enemy.y = Math.round(Math.random() * (this.height - 20));
  
      let difx = this.enemy.x - this.player.x;
      let dify = this.enemy.y - this.player.y;
  
      if(Math.abs(difx) < 50){
        this.enemy.x =  Math.round(Math.random() * (this.width - 20)) + difx;
      }
  
      if(Math.abs(dify) < 50){
        this.enemy.y =  Math.round(Math.random() * (this.width - 20)) + dify;
      }
    }
  }

  render(){
    this.context.clearRect(0, 0, this.width, this.height);
  
    if(this.menu){
  
      var gmx = this.canvas.width / 2;
          var gmy = this.canvas.height / 10;
  
      this.context.fillStyle = "blue";
      this.context.textAlign = 'center';
      this.context.font = "bold 65px helvetica";
      this.context.fillText("Tank Pixel Battle", gmx, 2 * gmy);
  
      this.context.fillStyle = "black";
      this.context.font = "bold 40px helvetica";
      this.context.fillText("Solo", gmx / 2, 6 * gmy);
  
      this.context.fillStyle = "black";
      this.context.font = "bold 20px helvetica";
      this.context.fillText("Press 1", gmx / 2, 7 * gmy);
  
      this.context.fillStyle = "black";
      this.context.font = "bold 40px helvetica";
      this.context.fillText("Versus", 2 * this.canvas.width / 3, 6 * gmy);
  
      this.context.fillStyle = "black";
      this.context.font = "bold 20px helvetica";
      this.context.fillText("Press 2", 2 * this.canvas.width / 3, 7 * gmy);
  
      
    }else if(this.waiting){
  
      var gmx = this.canvas.width / 2;
          var gmy = this.canvas.height / 10;
  
      this.context.fillStyle = "black";
      this.context.textAlign = 'center';
      this.context.font = "bold 40px helvetica";
      this.context.fillText("Esperando Jogador...", gmx, 5 * gmy);
  
      
    }else if(this.inGame){
  
      if(this.projectile.shot == 1){
        this.context.fillStyle = this.projectile.color;
        this.context.fillRect(this.projectile.x, this.projectile.y, this.projectile.width, this.projectile.height);
      }
  
      this.context.fillStyle = this.player.color;
      this.context.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
      this.context.fillRect(this.playerCannon.x, this.playerCannon.y, this.playerCannon.width, this.playerCannon.height);
  
      
      if(this.multiplayerMode){
        this.context.fillStyle = this.multiPlayer.color;
        this.context.fillRect(this.multiPlayer.x, this.multiPlayer.y, this.multiPlayer.width, this.multiPlayer.height);
        this.context.fillRect(this.multiPlayerCannon.x, this.multiPlayerCannon.y, this.multiPlayerCannon.width, this.multiPlayerCannon.height);
      }else{
  
        this.context.fillStyle = this.enemy.color;
        this.context.fillRect(this.enemy.x, this.enemy.y, this.enemy.width, this.enemy.height);
      }
  
  
  
  
      this.context.textAlign = 'center';
      this.context.fillStyle = "black";
      this.context.font = "bold 30px helvetica";
      this.context.fillText(this.score, this.canvas.width / 2, 30);
  
    }else if(this.gameOver){
  
      if(this.score > this.highScore) this.highScore = this.score;
      var gmx = this.canvas.width / 2;
          var gmy = this.canvas.height / 3;
      this.context.fillStyle = "red";
      this.context.textAlign = 'center';
      this.context.font = "bold 90px helvetica";
      this.context.fillText("Game Over", gmx, gmy);
  
      this.context.fillStyle = "black";
      this.context.font = "bold 40px helvetica";
      this.context.fillText("Score", gmx, 2 * gmy);
  
      this.context.fillStyle = "black";
      this.context.font = "bold 30px helvetica";
      this.context.fillText(this.score, gmx, 3 * this.canvas.height / 4);
  
      this.context.fillStyle = "black";
      this.context.font = "bold 20px helvetica";
      this.context.fillText("Aperte ENTER para tentar novamente", gmx, 4 * this.canvas.height / 4 - 10);
    }
  }

  update(){
    if(this.keys[38]){
      this.player.y-=this.speed + (this.score * this.enemy.factor);
      this.playerCannon.x = this.player.x + 10;
      this.playerCannon.y = this.player.y - 10;
      this.player.pos = 1;
    }
    if(this.keys[40]){
      this.player.y+=this.speed + (this.score * this.enemy.factor);
      this.playerCannon.x = this.player.x + 10;
      this.playerCannon.y = this.player.y + 30;
      this.player.pos = 2;
    }
    if(this.keys[37]){
      this.player.x-=this.speed + (this.score * this.enemy.factor);
      this.playerCannon.x = this.player.x - 10;
      this.playerCannon.y = this.player.y + 10;
      this.player.pos = 3;
    }
    if(this.keys[39]){
      this.player.x+=this.speed + (this.score * this.enemy.factor);
      this.playerCannon.x = this.player.x + 30;
      this.playerCannon.y = this.player.y + 10;
      this.player.pos = 4;
    }
  
    // if(this.multiplayerMode){
    //   $.post('operationsDB.php', { op: "updateUser", userName:this.playerName, posx:this.player.x, posy:this.player.y, direction:this.player.pos, shot:0, mstatus:1 }, function(result) { 
    //          //console.log(result); 
    //   });
    // }
    
    if(this.pressed == 0){
  
      if(this.keys[32]){
  
        //var tiro = $.extend(true, {}, projectile);
  
        this.projectile.x = this.player.x + 10;
        this.projectile.y = this.player.y + 10;
        this.projectile.shot = 1;
        this.projectile.dir = this.player.pos;
        this.pressed = 1;
      }
      
      if(this.gameOver){
        if(this.keys[13]){
          this.inGame = true;
          this.gameOver = false;
          this.score = 0;
  
          this.player.x = 30;
          this.player.y = 30;
          this.player.pos = 4;
  
          this.playerCannon.x = 60;
          this.playerCannon.y = 40;
  
          this.enemy.x = Math.round(Math.random() * (this.width - 30));
          this.enemy.y = Math.round(Math.random() * (this.height - 30));
          
          this.pressed = 1;
  
          this.scored = false;
        }
      }
    
    }
  
    if(this.menu){
      //Press 1 goto Solo
      if(this.keys[97] || this.keys[49]){
        this.getName();
        this.inGame = true;
        this.menu = false;
      }
  
      //Press 2 goto Multiplayer
      // if(keys[98] || keys[50]){
      // 	getName();
      // 	menu = false;
      // 	waiting = true;
      // 	multiplayerMode = true;
      // }
    }
  
    // if(waiting){
  
    //   $.post('operationsDB.php', { op: "updateUser", userName:playerName, posx:0, posy:0, direction:0, shot:0, mstatus:1 }, function(result) { 
    //        console.log(result); 
    //   });
  
    //   $.post('operationsDB.php', { op: "getActiveUser", userName:playerName }, function(userLogged) { 
    //        if(userLogged != ""){
    //          waiting = false;
    //          inGame = true;
    //          multiPlayer.name = userLogged;
    //        }
    //   });
  
    // }
  
    if(this.inGame){
  
      //AI enemy
      if(this.player.y >= this.enemy.y){
        this.enemy.y+=this.enemy.speed + (this.score * this.enemy.factor);
      }
      if(this.player.y < this.enemy.y){
        this.enemy.y-=this.enemy.speed + (this.score * this.enemy.factor);
      }
      if(this.player.x >= this.enemy.x){
        this.enemy.x+=this.enemy.speed + (this.score * this.enemy.factor);
      }
      if(this.player.x < this.enemy.x){
        this.enemy.x-=this.enemy.speed + (this.score * this.enemy.factor);
      }
  
      if(this.projectile.shot == 1){
  
        if(this.projectile.dir == 1){
          this.projectile.y -= this.projectile.speed;
        }
        if(this.projectile.dir == 2){
          this.projectile.y += this.projectile.speed;
        }
        if(this.projectile.dir == 3){
          this.projectile.x -= this.projectile.speed;
        }
        if(this.projectile.dir == 4){
          this.projectile.x += this.projectile.speed;
        }
  
      }
  
      if(this.score > 1){
        this.enemy.qty = 3;
      } 
  
      if(this.player.x < 0) this.player.x = 0;
      if(this.player.y < 0) this.player.y = 0;
      if(this.player.x >= this.width - this.player.width) this.player.x = this.width  - this.player.width;
      if(this.player.y >= this.height  - this.player.height) this.player.y = this.height - this.player.height;
      
      if(this.collision(this.projectile, this.enemy)){
        this.process();
        this.projectile.shot = 0;
        this.projectile.x = 1000;
        this.projectile.y = 1000;
      } 
  
      if(this.collision(this.player, this.enemy)){
        this.inGame = false;
        this.gameOver = true;
  
        if(!this.scored){
          // saveScore(score);
          // scoreTable.destroy();
          // createTableScore();
          // initialiseTable();
          this.scored = true;
        }
      } 
    }
  }

  collision(first, second){
    return !(first.x > second.x + second.width ||
          first.x + first.width < second.x  ||
          first.y > second.y + second.height ||
          first.y + first.height < second.y);
  }

}
