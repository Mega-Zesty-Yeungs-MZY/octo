import io from 'socket.io-client';
import player from './assets/player.png';
import player_atlas from './assets/player_atlas.json'
import Player from './classes/Player.js'

export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    addPlayer(x, y) {
        this.player = new Player(this, x, y);
    }

    preload() {

        //this.load.spritesheet('player', player, { frameWidth: 48, frameHeight: 48 });
        this.load.atlas('player', player, player_atlas);
        // this.load.setBaseURL('http://localhost:8080/');
    }
    create() {

        this.socket = io('http://localhost:3000', { transports: ['websocket'] });

        this.socket.on('connect', function () {
            console.log('Connected!');
            //console.log(self.socket.id);
        });


        // declare variable called self and set it equal to "this"
        const self = this;

        this.socket.on('currentPlayers', function (players) {
            Object.keys(players).forEach(function (id) {
               if (players[id] === self.socket.id) { // issue here
                 console.log("die");
            }
                console.log("This is supposed to add players. It does not.");
            })
        })

        // TODO: Solve the error:
        /*
        ERROR
        undefined is not an object (evaluating 'self.socket.id')
        @
        forEach@[native code]
        @
        @
        emitEvent@
        onevent@
        onpacket@
        onpacket@[native code]
        @
        @
        promiseReactionJob@[native code]
        */
       // Implement adding players and movement. Should be good to go past that.

        this.addPlayer(400, 300)

        // ALSO TODO: Implement class for platforms
    }
    update() {
        this.player.update();
        // replaces all movement

    }
}