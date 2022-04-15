/**
 * 游戏配置
 */
export interface GameConfig {
  fps: number;
  windowWidth: number;
  windowHeight: number;
  canvasWidth: number;
  canvasHeight: number;
  initialized: boolean;
  pause: boolean;
}
class Config implements GameConfig {
  fps: number = 60;
  windowWidth: number = 0;
  windowHeight: number = 0;
  canvasWidth: number = 0;
  canvasHeight: number = 0;
  initialized: boolean = false;
  pause: boolean = false;

  constructor(config: Partial<GameConfig> = {}) {
    Object.keys(config).forEach(key => {
      this.set(key as any, (config as any)[key]);
    });
  }

  set: classSet<GameConfig> = (key, value) => {
    (this as GameConfig)[key] = value;
  }
}
export default Config;
