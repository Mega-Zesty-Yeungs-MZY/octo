import io from 'socket.io-client';
import player from './assets/player.png';
import PlayerClass from './classes/PlayerClass.js';
import Timer from './classes/Timer.js';

export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
        this.timer = null;
    } preload() {
        console.log('preload')
        this.load.spritesheet('player', player, { frameWidth: 48, frameHeight: 48 }); 
        
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
        
        //! Obstacle
        this.obstacle = this.physics.add.sprite(400, 300, "obstacle");        

        console.log("Occurs before player created")
        const staminaBarWidth = 200;
        const staminaBarHeight = 20;
        const staminaBarX = 400;
        const staminaBarY = 550;
        const staminaBarBackground = this.add.rectangle(staminaBarX, staminaBarY, staminaBarWidth, staminaBarHeight, 0x808080);
        const staminaBarFill = this.add.rectangle(staminaBarX - staminaBarWidth / 2, staminaBarY, 0, staminaBarHeight, 0x00ff00);
        this.staminaMaxWidth = staminaBarWidth;
        this.currentStamina = staminaBarWidth;
        this.staminaBarFill = staminaBarFill;

        //! timer
        // Create the Timer instance
        this.timer = new Timer(this, 5000, this.timerCallback);

        // Create and position the timer text
        const timerTextStyle = { font: '24px Arial', fill: '#ffffff' };
        this.timer.createTimerText(10, 10, timerTextStyle);

        // Start the timer
        this.timer.start();
    }
    update() {
        this.player.update();       
        this.timer.updateTimerText(); 

        // Retrieve and log the current time of the timer
        const currentTime = this.timer.getCurrentTime();
        console.log('Current time:', currentTime.toFixed(2));
    }
    timerCallback() {
        // This function will be called when the timer duration is reached
        console.log('Timer completed!');
        this.timer.start()
    }
}