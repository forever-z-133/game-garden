import ImageSprite from "../Source/ImageSprite";

/**
 * 单片拼图
 */
class PuzzleItem {
  id: string = '';
  image: ImageSprite = null;
  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;
  faceTo: PuzzleItemFaceTo = PuzzleItemFaceTo.UP; // 转向状态
  chosen: boolean = false; // 正在操作中
  correct: boolean = false; // 已完成匹配
}
export default PuzzleItem;

export enum PuzzleItemFaceTo {
  UP = 'UP',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  DOWN = 'DOWN',
}
