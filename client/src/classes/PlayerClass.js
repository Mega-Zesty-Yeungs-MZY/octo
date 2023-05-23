import Faceless from './Faceless.js';
 export default class PlayerClass extends Faceless {
     keyW;
     keyA;
     keyS;
     keyD;
   constructor(scene, x, y) {
     super(scene, x, y, 'player', 0);

     this.setScale(2);
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
    });        //! input keys

    this.keyW = this.scene.input.keyboard.addKey('W');
    this.keyA = this.scene.input.keyboard.addKey('A');
    this.keyS = this.scene.input.keyboard.addKey('S');
    this.keyD = this.scene.input.keyboard.addKey('D');

    /*
    this.inputKeys = this.scene.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D
    });
    */
   }
   update() {
    const speed = 2.5;
    let playerVelocity = new Phaser.Math.Vector2();  
    
    //! walkLR animation (left and right)
    if (this.keyA.isDown) {
        playerVelocity.x = -1;
        this.player.anims.play('walkLR', true).setFlipX(true);
    } else if (this.keyD.isDown) {
        playerVelocity.x = 1;
        this.player.anims.play('walkLR', true).setFlipX(false);
    } 
    
    //! walkUD animation (up and down)
    if (this.keyW.isDown) {
        playerVelocity.y = -1;
        this.player.anims.play('walkUP', true);
    } else if (this.keyS.isDown) {
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
 }
}