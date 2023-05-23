import io from 'socket.io-client';
import player from './assets/player.png';
import PlayerClass from './classes/PlayerClass.js';

export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    } preload() {
        console.log('preload')
        this.load.spritesheet('player', player, { frameWidth: 48, frameHeight: 48 }); 
        
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
        
        this.player = new PlayerClass(this, 300, 300);

        //! background        
        
        //! Obstacle
        this.obstacle = this.physics.add.sprite(400, 300, "obstacle");        

       console.log("Occurs before player created")
       
    }
    update() {
        this.player.update();        
    }
}