import io from 'socket.io-client';
import player from './assets/player.png'

export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    preload() {

        this.load.spritesheet('player', player, { frameWidth: 48, frameHeight: 48 });
        // this.load.setBaseURL('http://localhost:8080/');
    }
    create() {

        this.socket = io('http://localhost:3000', { transports : ['websocket'] });

        this.socket.on('connect', function () {
        	console.log('Connected!');
        });

        this.player = this.add.image(400,300, 'player')
        this.player.setScale(2);
        //! player animation
        // this.anims.create({
        //     key: 'idle',
        //     frames: this.anims.generateFrameNumbers('player', { frames: [ 0, 1, 2, 3, 4 ] }),
        //     frameRate: 4,
        //     repeat: -1
        // });
        // this.player.play('idle');

        //! input keys
        this.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
        


        // Add a platform as a rectangle
        const platform = this.add.rectangle(400, 500, 200, 20, 0x00ff00);
        
        // Enable physics for the platform
        this.physics.add.existing(platform, true);
        
        // Make the platform immovable
        platform.body.immovable = true;

    }
    update() {

        const speed = 2.5;
        let playerVelocity = new Phaser.Math.Vector2();
        if (this.inputKeys.left.isDown) {
            playerVelocity.x = -1;
            this.player.setFrame(7).setFlipX(true);

        }
        if (this.inputKeys.right.isDown) {
            playerVelocity.x = 1;
            this.player.setFrame(7).setFlipX(false);
        } 
        if (this.inputKeys.up.isDown) {
            playerVelocity.y = -1;
            this.player.setFrame(13);
        }
        if (this.inputKeys.down.isDown) {
            playerVelocity.y = 1;
            this.player.setFrame(1);
        }
        playerVelocity.normalize().scale(speed);
        this.player.x += playerVelocity.x;
        this.player.y += playerVelocity.y;
        
    }
}