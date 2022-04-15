import { LoadedImageData } from "../../Base/SourceLoader";
import Game from "../../Game";
import ImageSprite from "../../Source/ImageSprite";
import { getScaleData, ScaleData } from "../../utils/scaleUtil";
import BaseElement from "../BaseElement";

/**
 * 拼图面板背景
 */
class StageBackground implements BaseElement {
  sources: ImageSprite[] = [];

  constructor(game: Game, image: LoadedImageData) {
    const { canvasWidth, canvasHeight } = game.config;
    const { src, width: imageWidth, height: imageHeight } = image;

    const scaleData: ScaleData = getScaleData(imageWidth, imageHeight, canvasWidth, canvasHeight, 'cover');
    const { width, height } = scaleData;

    const sprite = new ImageSprite(src, width, height);

    this.sources.push(sprite);
  }

  update(now: number): void {}

  draw(ctx: UniApp.CanvasContext): void {
    const { src, width, height } = this.sources[0];
    ctx.drawImage(src, 0, 0, width, height);
  }
}
export default StageBackground;
