import { LoadedImageData } from "../../Base/SourceLoader";
import Game from "../../Game";
import ImageSprite from "../../Source/ImageSprite";
import { divideRect } from "../../utils/positionUtil";
import { getScaleData, ScaleData } from "../../utils/scaleUtil";
import BaseElement from "../BaseElement";
import PuzzleItem from "./PuzzleItem";

/**
 * 拼图中间的目标大格子
 */
class PuzzleContainer implements BaseElement {
  game: Game = null;
  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;

  constructor(game: Game) {
    this.game = game;

    const { canvasWidth, canvasHeight } = this.game.config;
    const rectWidth = Math.min(canvasWidth, canvasHeight) * 0.9;
    this.x = (canvasWidth - rectWidth) / 2;
    this.y = 50;
    this.width = rectWidth;
    this.height = rectWidth;
  }

  createItems(image: LoadedImageData): PuzzleItem[] {
    const { x: puzzleX, y: puzzleY, width: puzzleWidth, height: puzzleHeight } = this;
    const { rowCount, colCount } = this.game.data;
    const { src, width: imageWidth, height: imageHeight } = image;
    const items: PuzzleItem[] = [];

    const scaleData: ScaleData = getScaleData(imageWidth, imageHeight, puzzleWidth, puzzleHeight, 'cover');
    const { width: compressWidth, height: compressHeight } = scaleData;

    const rects = divideRect(rowCount, colCount, puzzleWidth, puzzleHeight);
    rects.forEach(rect => {
      const { row, col, x: itemX, y: itemY, width: itemWidth, height: itemHeight } = rect;

      const id = `item_${row}_${col}`;
      const x = puzzleX + itemX;
      const y = puzzleY + itemY;
      const clipX = -1 * col * itemWidth;
      const clipY = -1 * row * itemHeight;
      const clipWidth = compressWidth;
      const clipHeight = compressHeight;

      const sprite = new ImageSprite(src, imageWidth, imageHeight, clipX, clipY, clipWidth, clipHeight);
      const item = new PuzzleItem(id, sprite, x, y, itemWidth, itemHeight);

      items.push(item);
    });

    return items;
  }

  draw(ctx: UniApp.CanvasContext): void {}
}
export default PuzzleContainer;
