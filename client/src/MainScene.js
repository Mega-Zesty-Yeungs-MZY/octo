import io from 'socket.io-client';
import background from './assets/background.png';
import player from './assets/player.png';
import obstacle from './assets/obstacle.png'
import ObstacleClass from './classes/ObstaclesClass.js'
import PlayerClass from './classes/PlayerClass.js';
import Timer from './classes/Timer.js';

export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
        this.timer = null;
        this.redLight = true;
    } preload() {
        console.log('preload')
        this.load.spritesheet('player', player, { frameWidth: 48, frameHeight: 48 }); 
        this.load.image('grass', background);
        this.load.image('obstacle', obstacle)
    }

    
    create() {        
        const self = this;
        this.bg = this.add.image(0,0, 'grass');
        this.bg.setScale(0.5).setScrollFactor(1);
        this.bg.x = this.bg.displayWidth/2;
        this.bg.y = this.bg.displayHeight/2;
        this.physics.world.setBounds(0, 0, this.bg.displayWidth, this.bg.displayHeight, true, true, true , true)
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
          this.socket.on('disconnect', function (playerId) {
            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
              if (playerId === otherPlayer.playerId) {
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

       
        
        
        this.obstacle = this.physics.add.sprite(400, 300, 'obstacle');    
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

        //! timer
        // Create the Timer instance
        this.timer = new Timer(this, 5000, this.timerCallback);
        
        // Create and position the timer text
        const timerTextStyle = { font: '24px Arial', fill: '#ffffff' };
        this.timer.createTimerText(10, 10, timerTextStyle);
        
        // Start the timer
        this.timer.start();
        
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
        
        this.timer.updateTimerText(); 
        
        
        
        if (this.player && this.obstacle) {
            if (this.physics.overlap(this.player, this.obstacle)) {
                console.log("Collision detected!");
            }
        }
        
        // ...
    }
    timerCallback() {
        // This function will be called when the timer duration is reached
        this.redLight = ! this.redLight;
        console.log('redlight: ', this.redLight);
        this.timer.start()
    }
    addPlayer(playerInfo){
        this.player = new PlayerClass(this, 300, 300, playerInfo.playerId);
        this.cameras.main.startFollow(this.player)
        this.cameras.main.setBounds(0, 0, this.bg.displayWidth, this.bg.displayHeight);
    }
    addOtherPlayers(playerInfo){
        const otherplayer = new PlayerClass(this, 300, 300);
        
        otherplayer.playerId = playerInfo.playerId;
        this.otherPlayersGroup.add(otherplayer);
        
    }
}
