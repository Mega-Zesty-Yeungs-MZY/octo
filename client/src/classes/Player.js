import Faceless from './Faceless.js';
export default class Player extends Faceless {
    keyW;
    keyA;
    keyS;
    keyD;
  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    this.initAnimations();
    this.keyW = this.scene.input.keyboard.addKey('W');
    this.keyA = this.scene.input.keyboard.addKey('A');
    this.keyS = this.scene.input.keyboard.addKey('S');
    this.keyD = this.scene.input.keyboard.addKey('D');

    this.setScale(2);
  }

  initAnimations(){
    this.scene.anims.create({
        key: 'runUp',
        frames: this.scene.anims.generateFrameNames('ru-player', {
          prefix: 'runU-',
          end: 1,
        }),
        frameRate: 8,
      });

  }


  update() {
    const speed = 2.5;
    let playerVelocity = new Phaser.Math.Vector2();
    if (this.keyA.isDown) {
        playerVelocity.x = -1;
        this.setFrame(7).setFlipX(true);

    }
    if (this.keyD.isDown) {
        playerVelocity.x = 1;
        this.setFrame(7).setFlipX(false);
    } 
    if (this.keyW.isDown) {
        playerVelocity.y = -1;
        this.checkFlip();
        this.setFrame(13);
    }
    if (this.keyS.isDown) {
        playerVelocity.y = 1;
        this.checkFlip();
        !this.anims.isPlaying && this.anims.play('runUp', true);
    }
    playerVelocity.normalize().scale(speed);
    this.x += playerVelocity.x;
    this.y += playerVelocity.y;
    }
}