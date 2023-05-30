class Timer {
  constructor() {
    this.startTime = 0;
    this.endTime = 0;
    this.timerId = null;
  }

  start() {
    this.startTime = new Date().getTime();
    this.endTime = this.startTime + 5000; // 5 seconds
    this.timerId = setInterval(() => {
      const currentTime = new Date().getTime();
      const remainingTime = this.endTime - currentTime;
      if (remainingTime <= 0) {
        this.stop();
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.timerId);
  }

  getTime() {
    const currentTime = new Date().getTime();
    //const remainingTime = this.endTime - currentTime;
    return currentTime
  }
}
module.exports = Timer;
