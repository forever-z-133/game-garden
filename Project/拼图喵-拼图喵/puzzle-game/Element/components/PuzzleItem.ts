import ImageSprite from "../../Source/ImageSprite";
import { Rect } from "../../utils/positionUtil";
import BaseElement from "../BaseElement";

/**
 * 单片拼图
 */
class PuzzleItem implements BaseElement {
  index: number = -1;
  image: ImageSprite;
  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;
  answer: Rect & { faceTo?: PuzzleItemFaceTo }; // 答案
  faceTo: PuzzleItemFaceTo = PuzzleItemFaceTo.UP; // 转向状态
  chosen: boolean = false; // 正在操作中
  correct: boolean = false; // 已完成匹配
  idleState?: Rect & { scale: number }; // 待机状态下的尺寸位置

  constructor(index: number, image: ImageSprite, x: number, y: number, width: number, height: number, faceTo = PuzzleItemFaceTo.UP) {
    this.index = index;
    this.image = image;
    this.answer = { x, y, width, height };
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.faceTo = faceTo;
  }

  update(now: number): void {}

  draw(ctx: UniApp.CanvasContext): void {
    const { x: offsetX, y: offsetY, width: offsetWidth, height: offsetHeight } = this;
    const { src, clipX, clipY, clipWidth, clipHeight } = this.image;
    ctx.drawImage(src, clipX, clipY, clipWidth, clipHeight, offsetX, offsetY, offsetWidth, offsetHeight);
    if (this.correct) {
    } else if (this.chosen) {
      const borderWidth = 4;
      ctx.setStrokeStyle('pink');
      ctx.setLineWidth(borderWidth);
      ctx.strokeRect(offsetX, offsetY, offsetWidth, offsetHeight);
    } else {
      const borderWidth = 2;
      ctx.setStrokeStyle('#999');
      ctx.setLineWidth(borderWidth);
      ctx.strokeRect(offsetX, offsetY, offsetWidth, offsetHeight);
    }
  }

  setCorrect() {
    const { x, y, width, height } = this.answer;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.correct = true;
    this.chosen = false;
  }
}
export default PuzzleItem;

export enum PuzzleItemFaceTo {
  UP = 'UP',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  DOWN = 'DOWN',
}
