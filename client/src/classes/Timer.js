export default class Timer {
    constructor(scene, duration, callback) {
      this.scene = scene;
      this.duration = duration;
      this.callback = callback;
      this.timerEvent = null;
      this.timerText = null;
    }
  
    createTimerText(x, y, style) {
      this.timerText = this.scene.add.text(x, y, '', style);
    }
  
    updateTimerText() {
      if (this.timerText) {
        const remainingTime = Math.max(0, this.timerEvent.getRemainingSeconds());
        this.timerText.setText(`Time: ${remainingTime.toFixed(2)}`);
      }
    }
  
    start() {
      this.timerEvent = this.scene.time.addEvent({
        delay: this.duration,
        callback: this.callback,
        callbackScope: this.scene,
        loop: false
      });
    }
  
    stop() {
      if (this.timerEvent) {
        this.timerEvent.remove();
      }
    }
  }
  
// In MainScene.js add the following code
// import the following:
// import Timer from './classes/Timer.js';

// add this to constructor:
// this.timer = null;

// in create()
//      //! timer
//    // Create the Timer instance
//    this.timer = new Timer(this, 5000, this.timerCallback);

//    // Create and position the timer text
//    const timerTextStyle = { font: '24px Arial', fill: '#ffffff' };
//    this.timer.createTimerText(10, 10, timerTextStyle);

//    // Start the timer
//    this.timer.start();

// in update()
// this.timer.updateTimerText();

// under update add a new function:
// timerCallback() {
//     // This function will be called when the timer duration is reached
//     console.log('Timer completed!');
//   }