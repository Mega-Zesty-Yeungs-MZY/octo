export class ObstaclesClass  {
  constructor(scene, playerGroup) {
    this.scene = scene;
    this.obstaclesGroup = this.scene.physics.add.group();
    this.playerGroup = playerGroup;

    // Create and add obstacles to the group
    for (let i = 0; i < 5; i++) {
      const obstacle = this.createObstacle();
      this.obstaclesGroup.add(obstacle);
    }

    // Set obstacle collisions with player group
    this.scene.physics.add.collider(
      this.playerGroup,
      this.obstaclesGroup,
      (player, obstacle) => this.collisionHandler(player, obstacle),
      null,
      this
    );
  }

  createObstacle() {
    const obstacle = this.scene.physics.add.sprite(0, 0, 'obstacle');
  
    // Set obstacle properties
    obstacle.setScale(0.1);
    this.setRandomPosition(obstacle);
    obstacle.setImmovable(true);
    obstacle.setOrigin(0.5);
    obstacle.setSize(100, 100);
    obstacle.setOffset(70, 70);
    
  
    return obstacle;
  }

  collisionHandler(player, obstacle) {
    if (player && obstacle) {
      console.log('Collision detected!');
      player.setVelocity(0, 0);
      player.setPosition(300, 300);
      if (player.staminapts) {
        player.staminapts -= 10;
      }
  
      // when the player hits the obstacle, their velocity will be reduced by half (but only temporarily)
      player.setVelocityX(player.body.velocity.x * 0.5);
      player.setVelocityY(player.body.velocity.y * 0.5);
  
      // restores the player's velocity back to the origianl
      this.scene.time.delayedCall(2000, () => {
        player.setVelocityX(player.body.velocity.x * 2);
        player.setVelocityY(player.body.velocity.y * 2);
      });
    }
  }

  // each time the page is refreshed, obstacles will be placed in random positions throughout the scene

  setRandomPosition(obstacle) {
    const { width, height } = this.scene.sys.game.config;
    const minX = obstacle.displayWidth / 2;
    const maxX = width - obstacle.displayWidth / 2;
    const minY = obstacle.displayHeight / 2;
    const maxY = height - obstacle.displayHeight / 2;

    const randomX = Phaser.Math.Between(minX, maxX);
    const randomY = Phaser.Math.Between(minY, maxY);

    obstacle.setPosition(randomX, randomY);
  }
}
