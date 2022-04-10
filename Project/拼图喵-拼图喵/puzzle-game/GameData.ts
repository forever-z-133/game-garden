/**
 * 游戏数据
 */
class GameData {
  rowCount: number = 2;
  colCount: number = 2;
  rotatable: boolean = false; // 是否可旋转
  answer = []; // 答案
  rights = []; // 已正确选项

  set(key: string, value: any) {
    this[key] = value;
  }
}
export default GameData;
