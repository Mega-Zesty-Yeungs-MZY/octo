import Faceless from './Faceless.js';
let sprintaccel = 1;
let staminapts = 100;
let staminaspent = false;
 export default class PlayerClass extends Faceless {
     keyW;
     keyA;
     keyS;
     keyD;
   constructor(scene, x, y) {

     super(scene, x, y, 'player', 0);
     this.setScale(2);
     this.anims.create({
        key: 'walkLR',
        frames: this.anims.generateFrameNumbers('player', { start: 25, end: 29 }),
        frameRate: 6,
        repeat: -1
    }); this.anims.create({
        key: 'walkDOWN',
        frames: this.anims.generateFrameNumbers('player', { start: 19, end: 23 }),
        frameRate: 6,
        repeat: -1
    }); this.anims.create({
        key: 'walkUP',
        frames: this.anims.generateFrameNumbers('player', { start: 31, end: 35 }),
        frameRate: 6,
        repeat: -1
    }); this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }),
        frameRate: 7,
        repeat: -1
    });        //! input keys

    this.keyW = this.scene.input.keyboard.addKey('W');
    this.keyA = this.scene.input.keyboard.addKey('A');
    this.keyS = this.scene.input.keyboard.addKey('S');
    this.keyD = this.scene.input.keyboard.addKey('D');
    this.keySHIFT = this.scene.input.keyboard.addKey('SHIFT');


    }

   update() {
    const speed = 2.5;
    let playerVelocity = new Phaser.Math.Vector2();
    let isSprinting = false;  
    const sprintMultiplier = 5; // Speed when sprinting
    const staminaCost = 0.0; // The amount of stamina consumed per frame of movement
    const sprintStaminaCost = 1; // The amount of stamina consumed per frame of movement while sprinting
    const staminaRegenRate = 1; // The rate at which stamina regenerates per second
    
    //! walkLR animation (left and right)
    switch (true) {
        case (this.keyA.isDown && !this.keyD.isDown):
            playerVelocity.x = -1;
            if (!this.keyW.isDown && !this.keyS.isDown) {
                this.anims.play('walkLR', true).setFlipX(true);
            }
            break;
        case (this.keyD.isDown && !this.keyA.isDown):
            playerVelocity.x = 1;
            if (!this.keyW.isDown && !this.keyS.isDown) {
                this.anims.play('walkLR', true).setFlipX(false);
            }
            break;
    }
    
    
    //! walkUD animation (up and down)
    switch (true) {
        case (this.keyW.isDown && !this.keyS.isDown):
            playerVelocity.y = -1;
            this.anims.play('walkUP', true);
            break;
        case (this.keyS.isDown && !this.keyW.isDown):
            playerVelocity.y = 1;
            this.anims.play('walkDOWN', true);
            break;
    }

    
    //! idle animation
    if (playerVelocity.x === 0 && playerVelocity.y === 0) {
        this.anims.play('idle', true);
    }

    if (this.keySHIFT.isDown && (playerVelocity.x != 0 || playerVelocity.y != 0) && !staminaspent) {
        isSprinting = true;
        sprintaccel = sprintaccel >= sprintMultiplier? sprintMultiplier : sprintaccel + 0.1;
        console.log("accelerating" + sprintaccel);
        staminapts = staminapts <= 0? 0 : staminapts - 1
        console.log("stamina: " + staminapts)
    } else {
        isSprinting = false;
        sprintaccel = sprintaccel <= 1? 1 : sprintaccel - 0.1;
        console.log("decelerating" + sprintaccel)
        staminapts = staminapts >= 100? 100 : staminapts + 1
        console.log("stamina: " + staminapts)
    }

    if (staminapts == 0) {
        staminaspent = true;
    } else if (staminapts == 100) {
        staminaspent = false;
    }




    //! normalize and scale the velocity so that player can't move faster along a diagonal
    playerVelocity.normalize().scale(sprintaccel * speed);
    this.x += playerVelocity.x;
    this.y += playerVelocity.y;



//     const staminaCostX = Math.abs(playerVelocity.x) * (isSprinting ? sprintStaminaCost : staminaCost);
//     const staminaCostY = Math.abs(playerVelocity.y) * (isSprinting ? sprintStaminaCost : staminaCost);
//     // Stamina regeneration logic
//     if (playerVelocity.length() === 0 && this.currentStamina < this.staminaMaxWidth) {
//         this.currentStamina += staminaRegenRate;
//         if (this.currentStamina > this.staminaMaxWidth) {
//             this.currentStamina = this.staminaMaxWidth;
//         }
//         // Update the stamina bar fill width
//         const staminaFillWidth = (this.currentStamina / this.staminaMaxWidth) * this.staminaMaxWidth;
//         this.staminaBarFill.width = staminaFillWidth;
//     }
//     if (this.currentStamina >= staminaCostX && this.currentStamina >= staminaCostY) {
//         this.currentStamina -= Math.max(staminaCostX, staminaCostY);
//         // Update the stamina bar fill width
//         const staminaFillWidth = (this.currentStamina / this.staminaMaxWidth) * this.staminaMaxWidth;
//         this.staminaBarFill.width = staminaFillWidth;
//         // Move the player
//         const nextX = this.player.x + playerVelocity.x;
//         const nextY = this.player.y + playerVelocity.y;
//         const canvasWidth = this.game.config.width;
//         const canvasHeight = this.game.config.height;
//         if (nextX > 15 && nextX < canvasWidth - 15) {
//             this.player.x = nextX;
//         }
//         if (nextY > 15 && nextY < canvasHeight - 15) {
//             this.player.y = nextY;
//         }
//     }
    
}
}