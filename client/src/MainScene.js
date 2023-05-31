import io from 'socket.io-client';
// import background from './assets/background.png';
import player from './assets/player.png';
import obstacle from './assets/teleportation1.png'
import { ObstaclesClass } from './classes/ObstaclesClass.js';
import PlayerClass from './classes/PlayerClass.js';
import Timer from './classes/Timer.js';
import redLight from './assets/red-light.png';
import greenLight from './assets/Green-light.png';
import grassTileset from './assets/texture/grassTileset.png';
import stoneTileset from './assets/texture/stoneGroundTileset.png';
import wallTileset from './assets/texture/wallTileset.png';
import plantTileset from './assets/texture/plantTileset.png';
import propsTileset from './assets/texture/propsTileset.png';
import plantShadowTileset from './assets/texture/plantShadowTileset.png';
import structTileset from './assets/texture/structTileset.png';
import map from './assets/texture/map.json';

export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
        this.timer = null;
        this.redLight = true;
    } preload() {
        console.log('preload')
        this.load.spritesheet('player', player, { frameWidth: 48, frameHeight: 48 }); 
        // this.load.image('grass', background);
        this.load.image('teleportation1', obstacle)
        this.load.image('red', redLight)
        this.load.image('green', greenLight)
        this.load.image('grassTileset', grassTileset);
        this.load.image('stoneTileset', stoneTileset);
        this.load.image('wallTileset', wallTileset);
        this.load.image('plantTileset', plantTileset);
        this.load.image('propsTileset', propsTileset);
        this.load.image('plantShadowTileset', plantShadowTileset);
        this.load.image('structTileset', structTileset);
        this.load.tilemapTiledJSON('map', map);
    }

    
    create() {        
        const self = this;
        // this.bg = this.add.image(0,0, 'checkerboard');
        // this.bg.setScale(0.5).setScrollFactor(1);
        // this.bg.x = this.bg.displayWidth/2;
        // this.bg.y = this.bg.displayHeight/2;
        this.physics.world.setBounds(0, 0, 1024, 4096, true, true, true , true)
        this.socket = io('http://localhost:3000', { transports: ['websocket'] });

        this.socket.on('connect', function () {
            console.log('Connected!');
            //console.log(self.socket.id);
        });

        this.otherPlayersGroup = this.physics.add.group();

        this.socket.on('currentPlayers', function (players) {
            Object.keys(players).forEach(function (id) {
                if (players[id].playerId === self.socket.id) { // issue here
                    self.addPlayer(players[id]);
                } else {
                    self.addOtherPlayers(players[id]);
                }
            })
        });
        this.socket.on('newPlayer', function (playerInfo) {
            self.addOtherPlayers(playerInfo);
          });
          this.socket.on('left', function (identity) {
            self.otherPlayersGroup.getChildren().forEach(function (otherPlayer) {
              if (identity === otherPlayer.playerId) {
                otherPlayer.destroy();
              }
            });
          });

       
        this.socket.on('playerMoved', function (playerInfo){
            self.otherPlayersGroup.getChildren().forEach(function(otherPlayer){
                if(playerInfo.playerId === otherPlayer.playerId) {
                    otherPlayer.setPosition(playerInfo.x, playerInfo.y);
                }
            })
            console.log("player movement tracked");
        })

        //! background        
        var map = this.make.tilemap({key: 'map'});
        var grassTiles = map.addTilesetImage('grassTileset');
        var stoneTiles = map.addTilesetImage('stoneTileset');
        var wallTiles = map.addTilesetImage('wallTileset');
        var plantTiles = map.addTilesetImage('plantTileset');
        var propsTiles = map.addTilesetImage('propsTileset');
        var plantShadowTiles = map.addTilesetImage('plantShadowTileset');
        var structTiles = map.addTilesetImage('structTileset');

        var baseLayer = map.createLayer('baseLayer', [grassTiles, stoneTiles, wallTiles, plantTiles, propsTiles, plantShadowTiles, structTiles], 0, 0);
        var shadow = map.createLayer('shadow', [grassTiles, stoneTiles, wallTiles, plantTiles, propsTiles, plantShadowTiles, structTiles], 0, 0);
        var level2 = map.createLayer('level2', [grassTiles, stoneTiles, wallTiles, plantTiles, propsTiles, plantShadowTiles, structTiles], 0, 0);
        var walls = map.createLayer('walls', [grassTiles, stoneTiles, wallTiles, plantTiles, propsTiles, plantShadowTiles, structTiles], 0, 0);
        var props = map.createLayer('props', [grassTiles, stoneTiles, wallTiles, plantTiles, propsTiles, plantShadowTiles, structTiles], 0, 0);
       
        //!
        
        this.obstacle = this.physics.add.sprite(400, 300, 'teleportation1');    
        this.obstacle.setScale(0.1, 0.1);
        
        
        
        const staminaBarWidth = 400;
        const staminaBarHeight = 40;
        const staminaBarX = this.cameras.main.centerX;
        const staminaBarY = this.cameras.main.centerY + 300;
        this.staminaBarBackground = this.add.rectangle(staminaBarX, staminaBarY, staminaBarWidth, staminaBarHeight, 0x808080);
        this.staminaBarBackground.setScrollFactor(0);
        this.staminaBarFill = this.add.rectangle(staminaBarX - staminaBarWidth / 2, staminaBarY, 0, staminaBarHeight, 0x00ff00);
        this.staminaBarFill.setScrollFactor(0);
        this.staminaMaxWidth = staminaBarWidth;
        this.currentStamina = staminaBarWidth;
        // this.staminaBarFill = staminaBarFill;

        // light
        this.light = this.add.image(20, 60, 'red')
        this.light.setScrollFactor(0);
        this.light.setScale(0.2, 0.2)

        this.obstaclesGroup = new ObstaclesClass(this, this.otherPlayersGroup);

        this.obstaclesGroup.collisionHandler = this.collisionHandler.bind(this);


        
    }
    update() {
        if (this.player) { // Check if player object is defined before updating
            console.log(this.staminaBarFill.width);
            this.player.update();
            this.staminaBarFill.width = this.player.getstamina()/100 * this.staminaBarBackground.width;
            if (this.player.getstaminaspent()) {
                this.staminaBarFill.fillColor = 0xFF8000;
            } else {
                this.staminaBarFill.fillColor = 0x00FF00;
            }
            var x = this.player.x;
            var y = this.player.y;
            
            if (this.player.oldPosition && (x !== this.player.oldPosition.x || y !== this.player.oldPosition.y)){
                console.log("emitted!");
                this.socket.emit('heDothMoveth', {x : this.player.x, y : this.player.y});
            }
            
            this.player.oldPosition = {
                x : this.player.x,
                y: this.player.y
            };
        }  
                
        
        if (this.player && this.obstaclesGroup) {
            this.physics.add.collider(this.player, this.obstaclesGroup.obstaclesGroup, this.collisionHandler, null, this);
  
        // ...
    }

}
// depricated code to change light color, use timer from server.js
    // timerCallback() {
    //     // This function will be called when the timer duration is reached
    //     this.redLight = ! this.redLight;
    //     if (this.redLight == false){
    //         this.light.destroy();
    //         this.light = this.add.image(20, 60, 'green')
    //         this.light.setScale(0.2, 0.2)
    //         this.light.setScrollFactor(0);
    //     } else{
    //         this.light.destroy();
    //         this.light = this.add.image(20, 60, 'red')
    //         this.light.setScale(0.2, 0.2)
    //         this.light.setScrollFactor(0);
    //     }
    //     console.log('redlight: ', this.redLight);
    //     this.timer.start()
    // }
    addPlayer(playerInfo){
        this.player = new PlayerClass(this, 300, 300, playerInfo.playerId);
        this.cameras.main.startFollow(this.player)
        this.cameras.main.setBounds(0, 0, 1024, 4096);
    }
    addOtherPlayers(playerInfo){
        const otherplayer = new PlayerClass(this, 300, 300);
        
        otherplayer.playerId = playerInfo.playerId;
        this.otherPlayersGroup.add(otherplayer);
        
    }

    collisionHandler(player, obstacle) {
        if (player && obstacle) {
          console.log('Collision detected!');
          player.setVelocity(0, 0);

             
          const collisionDistance = 300; 
        
        //  distance between the player and the obstacle
          const distance = Phaser.Math.Distance.Between(player.x, player.y, obstacle.x, obstacle.y);
        
        // checks if the player is within the collision distance
        if (distance <= collisionDistance) {
        
            const angle = Phaser.Math.Angle.Between(player.x, player.y, obstacle.x, obstacle.y);
            
            // Calculates the block position based on the obstacle's size
            const blockX = obstacle.x + Math.cos(angle) * (obstacle.displayWidth / 2 + player.displayWidth / 2);
            const blockY = obstacle.y + Math.sin(angle) * (obstacle.displayHeight / 2 + player.displayHeight / 2);
        
        // repositions the player outside the collision zone
            player.setPosition(blockX, blockY);
    }
          if (player.staminapts) {
            player.staminapts -= 10;
          }
      
          // reduces the player's velocity temporarily 
          player.setVelocityX(player.body.velocity.x * 0.8);
          player.setVelocityY(player.body.velocity.y * 0.8);
      
          // restores player's original velocity
          this.time.delayedCall(2000, () => {
            player.setVelocityX(player.body.velocity.x * 1.25);
            player.setVelocityY(player.body.velocity.y * 1.25);
          });
        }
      }
}
//