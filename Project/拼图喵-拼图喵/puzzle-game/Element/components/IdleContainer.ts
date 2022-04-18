import { LoadedImageData } from "../../Base/SourceLoader";
import Game from "../../Game";
import ImageSprite from "../../Source/ImageSprite";
import { DivideRect, divideRect } from "../../utils/positionUtil";
import { getScaleData, ScaleData } from "../../utils/scaleUtil";
import BaseElement from "../BaseElement";

class IdleContainer implements BaseElement {
  game: Game;
  sprite: ImageSprite;
  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;

  constructor(game: Game, image: LoadedImageData) {
    this.game = game;

    const { x: stageX, y: stageY, width: stageWidth, height: stageHeight } = this.game.stage.container;
    const rectWidth = stageY - 40;
    this.x = stageX + stageWidth - rectWidth;
    this.y = 30;
    this.height = rectWidth;
    this.width = rectWidth;

    const { src, width: imageWidth, height: imageHeight } = image;
    const scaleData: ScaleData = getScaleData(imageWidth, imageHeight, this.width, this.height, 'cover');
    const { scale } = scaleData;
    const offsetWidth = imageWidth - this.width / scale;
    const offsetHeight = imageHeight - this.height / scale;
    const clipRects: DivideRect[] = divideRect(1, 1, imageWidth, imageHeight - offsetHeight);
    const { x: clipOffsetX, y: clipOffsetY, width: clipOffsetWidth, height: clipOffsetHeight } = clipRects[0];
    const clipX = clipOffsetX + offsetWidth / 2;
    const clipY = clipOffsetY + offsetHeight / 2;
    const clipWidth = clipOffsetWidth;
    const clipHeight = clipOffsetHeight;
    this.sprite = new ImageSprite(src, imageWidth, imageHeight, clipX, clipY, clipWidth, clipHeight);
  }

  draw(ctx: UniApp.CanvasContext) {
    const { x, y, width, height } = this;
    const { src, clipX, clipY, clipWidth, clipHeight } = this.sprite;
    ctx.drawImage(src, clipX, clipY, clipWidth, clipHeight, x, y, width, height);
  }
}
export default IdleContainer;
