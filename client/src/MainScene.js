import io from 'socket.io-client';
import player from './assets/player.png';
import PlayerClass from './classes/PlayerClass.js';

export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    } preload() {
        console.log('preload')
        this.load.spritesheet('player', player, { frameWidth: 48, frameHeight: 48 }); this.load.setBaseURL('http://127.0.0.1:5500/');
    }
    create() {
        this.socket = io('http://localhost:8080', { transports: ['websocket'] });

        this.socket.on('connect', function () {
            console.log('Connected!');
            //console.log(self.socket.id);
        });

        this.socket.on('currentPlayers', function (players) {
            

            Object.keys(players).forEach(function (id) {
               if (players[id] === self.socket.id) { // issue here
                 console.log("die");
                }
                console.log("This is supposed to add players. It does not.");
            })
        })
        
        console.log(typeof(new PlayerClass(this, 100, 100)));

        const player = new PlayerClass(this, 300, 300);

        //! background        //! Obstacle
        this.obstacle = this.physics.add.sprite(400, 300, "obstacle");        //! player
        this.player = this.add.sprite(300, 300, 'player')
        this.player.setScale(2);
        
        //! player animation
        this.anims.create({
            key: 'walkLR',
            frames: this.anims.generateFrameNumbers('player', { start: 25, end: 29 }),
            frameRate: 6,
            repeat: -1
        }); this.anims.create({
            key: 'walkDOWN',
            frames: this.anims.generateFrameNumbers('player', { start: 19, end: 23 }),
            frameRate: 6,
            repeat: -1
        }); this.anims.create({
            key: 'walkUP',
            frames: this.anims.generateFrameNumbers('player', { start: 31, end: 35 }),
            frameRate: 6,
            repeat: -1
        }); this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }),
            frameRate: 7,
            repeat: -1
        });        
        
        //! input keys
        this.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
        */
       console.log("Occurs before player created")
       
    }
    update() {
        this.player.update();        
        /*
        const speed = 2.5;
        let playerVelocity = new Phaser.Math.Vector2();  
        
        //! walkLR animation (left and right)
        if (this.inputKeys.left.isDown) {
            playerVelocity.x = -1;
            
            if (!this.inputKeys.up.isDown && !this.inputKeys.down.isDown) {
                this.player.anims.play('walkLR', true).setFlipX(true);
            }
        }
        if (this.inputKeys.right.isDown) {
            playerVelocity.x = 1;
            if (!this.inputKeys.up.isDown && !this.inputKeys.down.isDown) {
                this.player.anims.play('walkLR', true).setFlipX(false);
            }
        } 
        
        //! walkUD animation (up and down)
        if (this.inputKeys.up.isDown) {
            playerVelocity.y = -1;
            this.player.anims.play('walkUP', true);
        } else if (this.inputKeys.down.isDown) {
            playerVelocity.y = 1;
            this.player.anims.play('walkDOWN', true);
        }
        
        //! idle animation
        if (playerVelocity.x === 0 && playerVelocity.y === 0) {
            this.player.anims.play('idle', true);
        }

        //! normalize and scale the velocity so that player can't move faster along a diagonal
        playerVelocity.normalize().scale(speed);
        this.player.x += playerVelocity.x;
        this.player.y += playerVelocity.y;
        */
    }
}