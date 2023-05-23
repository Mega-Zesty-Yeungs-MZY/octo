import { Physics } from 'phaser';

export default class Faceless extends Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.getBody().setCollideWorldBounds(true);
  }
    checkFlip() {
    if (this.body.velocity.x < 0) {
      this.setFlipX(true);
    } else {
      this.setFlipX(true);
    }
  }
getBody(){
    return this.body;
  }
}
