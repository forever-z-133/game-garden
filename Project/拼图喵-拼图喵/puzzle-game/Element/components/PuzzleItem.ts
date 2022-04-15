import ImageSprite from "../../Source/ImageSprite";
import BaseElement from "../BaseElement";

/**
 * 单片拼图
 */
class PuzzleItem implements BaseElement {
  id: string = '';
  image: ImageSprite;
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
    const { x: offsetX, y: offsetY, width: offsetWidth, height: offsetHeight } = this;
    const { src, width: imageWidth, height: imageHeight, clipX, clipY, clipWidth, clipHeight } = this.image;
    const x = offsetX + clipX;
    const y = offsetY + clipY;
    ctx.drawImage(src, 0, 0, imageWidth, imageHeight, x, y, clipWidth, clipHeight);
    if (this.chosen) {
      const borderWidth = 10;
      ctx.setStrokeStyle('red');
      ctx.setLineWidth(borderWidth);
      ctx.strokeRect(offsetX + 5, offsetY + 5, offsetWidth - 10, offsetHeight - 10);
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
