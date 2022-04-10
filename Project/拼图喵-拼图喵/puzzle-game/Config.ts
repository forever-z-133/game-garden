/**
 * 游戏配置
 */
class Config {
  fps: number = 60;
  initialized: boolean = false;
  pause: boolean = false;

  set(key: string, value: any) {
    this[key] = value;
  }
}
export default Config;
