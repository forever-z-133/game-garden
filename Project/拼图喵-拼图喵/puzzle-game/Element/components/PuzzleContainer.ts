import { LoadedImageData } from "../../Base/SourceLoader";
import Game from "../../Game";
import ImageSprite from "../../Source/ImageSprite";
import { DivideRect, divideRect, randomPosition } from "../../utils/positionUtil";
import { getScaleData, ScaleData } from "../../utils/scaleUtil";
import BaseElement from "../BaseElement";
import PuzzleItem from "./PuzzleItem";

/**
 * 拼图中间的目标大格子
 */
class PuzzleContainer implements BaseElement {
  game: Game;
  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;

  constructor(game: Game) {
    this.game = game;

    const { canvasWidth, canvasHeight } = this.game.config;
    const rectWidth = Math.min(canvasWidth, canvasHeight) * 0.9;
    this.x = (canvasWidth - rectWidth) / 2;
    this.y = this.x;
    this.width = rectWidth;
    this.height = rectWidth;
  }

  createItems(image: LoadedImageData): PuzzleItem[] {
    const { x: puzzleX, y: puzzleY, width: puzzleWidth, height: puzzleHeight } = this;
    const { rowCount, colCount } = this.game.data;
    const { src, width: imageWidth, height: imageHeight } = image;
    const items: PuzzleItem[] = [];

    const scaleData: ScaleData = getScaleData(imageWidth, imageHeight, puzzleWidth, puzzleHeight, 'cover');
    const { scale } = scaleData;
    const offsetWidth = imageWidth - puzzleWidth / scale;
    const offsetHeight = imageHeight - puzzleHeight / scale;

    const rects: DivideRect[] = divideRect(rowCount, colCount, puzzleWidth, puzzleHeight);
    const clipRects: DivideRect[] = divideRect(rowCount, colCount, imageWidth, imageHeight - offsetHeight);
    rects.forEach((rect, index) => {
      const { x: itemX, y: itemY, width: itemWidth, height: itemHeight } = rect;
      const { x: clipOffsetX, y: clipOffsetY, width: clipOffsetWidth, height: clipOffsetHeight } = clipRects[index];

      const x = puzzleX + itemX;
      const y = puzzleY + itemY;
      const clipX = clipOffsetX + offsetWidth / 2;
      const clipY = clipOffsetY + offsetHeight / 2;
      const clipWidth = clipOffsetWidth;
      const clipHeight = clipOffsetHeight;

      const sprite = new ImageSprite(src, imageWidth, imageHeight, clipX, clipY, clipWidth, clipHeight);
      const item = new PuzzleItem(index, sprite, x, y, itemWidth, itemHeight);

      items.push(item);
    });

    return items;
  }

  random(items: PuzzleItem[]) {
    const { width: itemWidth, height: itemHeight } = items[0];
    const { x: wrapperX, y: wrapperY, width: wrapperWidth, height: wrapperHeight } = this.game.stage.idle;
    const scaleData: ScaleData = getScaleData(itemWidth, itemHeight, wrapperWidth * 0.8, wrapperHeight * 0.8, 'contain');
    const { scale, width: compressWidth, height: compressHeight } = scaleData;
    items.forEach(item => {
      const { x, y, width, height } = item;
      item.idleState = { scale, x, y, width, height };
      item.x = randomPosition(wrapperX, wrapperX + wrapperWidth, compressWidth);
      item.y = randomPosition(wrapperY, wrapperY + wrapperHeight, compressHeight);
      item.width = compressWidth;
      item.height = compressHeight;
    });
  }

  draw(ctx: UniApp.CanvasContext): void {
    const { items } = this.game.stage;
    if (!items || !items.length) return;
    ctx.setFillStyle('rgba(255, 255, 255, 0.5)');
    ctx.fillRect(this.x, this.y, this.width, this.height);
    items.forEach(item => {
      const { x, y, width, height } = item.answer;
      ctx.setStrokeStyle('#f3f3f3');
      ctx.setLineWidth(2);
      ctx.strokeRect(x, y, width, height);
    });
  }
}
export default PuzzleContainer;
