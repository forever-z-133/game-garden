import Drawer from "./Drawer";

/**
 * 游戏运行管理器
 */
class Updater {
  timer: any = null;
  drawer: Drawer = null;
  private _pause: boolean = true;

  start(fps: number = 30) {
    this._pause = false;
    this.timer = requestAnimationFrame(this._update);
  }
  pause() {
    this._pause = true;
    this.timer = cancelAnimationFrame(this.timer);
  }
  resume() {
    this._pause = false;
    this.timer = requestAnimationFrame(this._update);
  }
  stop() {
    this.pause();
    this.timer = null;
  }
  private _update() {
    this.drawer.draw();
  }
}
export default Updater;
