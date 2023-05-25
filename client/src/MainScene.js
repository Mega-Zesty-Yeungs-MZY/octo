import io from 'socket.io-client';
import background from './assets/jungle tileset.png';
import player from './assets/player.png';
import PlayerClass from './classes/PlayerClass.js';
import map from './assets/map.json';

export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    } preload() {

        const gameHeight = this.game.config.height;
        const gameWidth = this.game.config.width;

        console.log('preload')
        this.load.spritesheet('player', player, { frameWidth: 48, frameHeight: 48 }); 
        this.load.image('grass', background);
        // this.load.tilemapTiledJSON('map', map);
    }
    create() {
        const self = this;
        this.socket = io('http://localhost:3000', { transports: ['websocket'] });

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
        
        this.player = new PlayerClass(this, 300, 300);

        //! background
        // this.background = this.add.tileSprite(0, 0, 800, 600, 'grass').setOrigin(0, 0);  
             
        // const grass = this.add.sprite(0, 0, 'grass', '10')
        // const map = this.make.tilemap({ key: 'map' });
        // const tileset = map.addTilesetImage('jungle', 'grass', 32, 32);
        // const tileWidth = map.tileWidth;
        // const tileHeight = map.tileHeight;
        // const mapWidth = map.width;
        // const mapHeight = map.height;
        // const mapPx = mapWidth * tileWidth;
        // const mapPy = mapHeight * tileHeight;

        // const layer1 = this.add.tileSprite(0, 0, 800, 600, 'grass').setOrigin(0, 0);

        //! Obstacle
        this.obstacle = this.physics.add.sprite(400, 300, "obstacle");        

       console.log("Occurs before player created")
       
    }
    update() {
        this.player.update();      
    }
}