import ImageSprite from "../Source/ImageSprite";
import BaseElement from "./BaseElement";

/**
 * 单片拼图
 */
class PuzzleItem implements BaseElement {
  id: string = '';
  image: ImageSprite = null;
  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;
  faceTo: PuzzleItemFaceTo = PuzzleItemFaceTo.UP; // 转向状态
  chosen: boolean = false; // 正在操作中
  correct: boolean = false; // 已完成匹配

  constructor(id: string, image: ImageSprite, x: number, y: number, width: number, height: number, faceTo = PuzzleItemFaceTo.UP) {
    this.id = id;
    this.image = image;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.faceTo = faceTo;
  }

  update(now: number): void {}

  draw(ctx: UniApp.CanvasContext): void {
    const { id, x, y, width, height } = this;
    const { src, clipX, clipY, clipWidth, clipHeight } = this.image;
    // const pattern = ctx.createPattern(src, 'no-repeat')
    // ctx.fillStyle = pattern as unknown as string;
    // ctx.fillRect(x - 50, y - 50, 200, 200);
    ctx.drawImage(src, x, y, clipWidth, clipHeight);
    if (this.chosen) {
      ctx.setStrokeStyle('red');
      ctx.setLineWidth(10);
      ctx.strokeRect(x + 5, y + 5, width - 10, height - 10);
    }
  }
}
export default PuzzleItem;

export enum PuzzleItemFaceTo {
  UP = 'UP',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  DOWN = 'DOWN',
}
