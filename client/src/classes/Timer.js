export default class Timer {
  constructor(scene, duration, callback) { //location should be an array defined as [x,y]
    this.scene = scene;
    this.duration = duration;
    this.callback = callback;
    this.timerEvent = null;
    this.timerText = null;
    this.scrollFactor = 0;
  }

  createTimerText(x, y, style) {
    this.timerText = this.scene.add.text(x, y, '', style);
    this.timerText.setScrollFactor(this.scrollFactor);
  }

  updateTimerText() {
    if (this.timerText) {
      const remainingTime = Math.max(0, this.timerEvent.getRemainingSeconds());
      this.timerText.setText(`Time: ${remainingTime.toFixed(2)}`);
    }
  }

  getCurrentTime() {
    if (this.timerEvent) {
      return Math.max(0, this.duration - this.timerEvent.getElapsed());
    }
    return 0;
  }

  setScrollFactor(factor) {
    this.scrollFactor = factor;
    if (this.timerText) {
      this.timerText.setScrollFactor(this.scrollFactor);
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