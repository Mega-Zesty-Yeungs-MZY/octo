import MainScene from "./MainScene.js";
import GameScene from "./GameScene.js";
const config = {
    width: 1200,
    height: 800,
    backgroundColor: '#333333',
    type: Phaser.AUTO,
    scene: [MainScene, GameScene],
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