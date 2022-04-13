import Drawer from "./Drawer";

/**
 * 游戏运行管理器
 */
class Updater {
  interval: number = 60;
  timer: any = null;
  drawer: Drawer = null;
  _time: number = 0;
  _pause: boolean = true;

  constructor(drawer: Drawer) {
    this.drawer = drawer;
    this._update = this._update.bind(this);
  }
  start(fps: number = 60) {
    if (!this._pause) return;
    this.interval = 1000 / fps;
    this._pause = false;
    this.timer = requestAnimationFrame(this._update);
  }
  pause() {
    if (this._pause) return;
    this._pause = true;
    this.timer = cancelAnimationFrame(this.timer);
  }
  resume() {
    if (!this._pause) return;
    this._pause = false;
    this.timer = requestAnimationFrame(this._update);
  }
  stop() {
    this.pause();
    this.timer = null;
  }
  _update() {
    const now = Date.now();
    if (now - this._time >= this.interval) {
      this._time = now;
      this.drawer.draw(now);
    }
    this.timer = requestAnimationFrame(this._update);
  }
}
export default Updater;
