import MainScene from "./MainScene.js";
import MenuScene from "./MenuScene.js";
import GameScene from "./GameScene.js";
import LeaderboardScene from "./LeaderboardScene.js";

const config = {
    width: 1024,
    height: 600,
    backgroundColor: '#333333',
    type: Phaser.AUTO,
    scene: [MenuScene, MainScene],
    physics: {
        default: 'arcade',
        matter: {
            debug: true,
            gravity: {y: 0}
        }
    }
    // plugins: {
    //     scene: [
    //         {
    //             plugin: PhaserMatterCollisionPlugin,
    //             key: 'matterCollision',
    //             mapping: 'matterCollision'
    //         }
    //     ]
    // }
}

new Phaser.Game(config)