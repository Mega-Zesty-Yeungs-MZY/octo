/*

export default class ObstaclesClass extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, textureKey, player) {
        super(scene, x, y, textureKey);
        scene.add.existing(this);
        scene.physics.add.existing(this);


        this.setBodySize(this.width, this.height); 
        this.setRandomPosition(); // Set a random position for the obstacle
        this.body.setCollideWorldBounds(true); // Update this line
        this.setImmovable(true);
        this.setOrigin(0.5);

        this.scene = scene;
        this.player = player;
        this.scene.physics.add.collider(this.player, this, this.collisionHandler, null, this);
    }



    collisionHandler(player, obstacle) {
        if (player && obstacle) {
          console.log('Collision detected!');
          player.setVelocity(0, 0);
          player.setPosition(300, 300);
          if (player.staminapts) {
            player.staminapts -= 10;
          }
        }
      }
      
    

      setRandomPosition() {
        const { width, height } = this.scene.sys.game.config;
        const minX = this.displayWidth / 2;
        const maxX = width - this.displayWidth / 2;
        const minY = this.displayHeight / 2;
        const maxY = height - this.displayHeight / 2;
    
        let randomX = Phaser.Math.Between(minX, maxX);
        let randomY = Phaser.Math.Between(minY, maxY);
    
        // Adjust the position if it's outside the world bounds
        randomX = Phaser.Math.Clamp(randomX, minX, maxX);
        randomY = Phaser.Math.Clamp(randomY, minY, maxY);
    
        this.setPosition(randomX, randomY);
    }
}

*/

// don't uncomment this as it will basically break the server