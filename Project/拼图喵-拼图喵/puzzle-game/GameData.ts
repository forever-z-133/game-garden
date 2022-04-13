/**
 * 游戏数据
 */
export interface GameDataConfig {
  rowCount: number;
  colCount: number;
  rotatable: boolean;
}

class GameData implements GameDataConfig {
  rowCount: number = 2;
  colCount: number = 2;
  rotatable: boolean = false; // 是否可旋转
  answer = []; // 答案
  rights = []; // 已正确选项

  constructor(config: Partial<GameDataConfig> = {}) {
    Object.keys(config).forEach(key => {
      this[key] = config[key];
    });
    if (this.rowCount < 1) {
      throw new Error('GameData 中 rowCount 不可小于 1');
    }
    if (this.colCount < 1) {
      throw new Error('GameData 中 colCount 不可小于 1');
    }
  }
  set(key: keyof GameDataConfig, value: any) {
    this[key as string] = value;
  }
}
export default GameData;
