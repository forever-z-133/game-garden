import PuzzleItem from "../Element/PuzzleItem";
import Game from "../Game";
import ImageSprite from "../Source/ImageSprite";
import { getScaleData, ScaleData } from "../utils/scaleUtil";
import { LoadedImageData } from "./SourceLoader";

/**
 * 拼图生成器
 */
class PuzzleItemCreator {
  static create(game: Game, image: LoadedImageData): PuzzleItem[] {
    const { canvasWidth, canvasHeight } = game.config;
    const { rowCount, colCount } = game.data;
    const { src, width: imageWidth, height: imageHeight } = image;

    const items: PuzzleItem[] = [];

    const scaleData: ScaleData = getScaleData(imageWidth, imageHeight, canvasWidth, canvasHeight, 'cover');
    const { width: compressWidth, height: compressHeight } = scaleData;

    const itemWidth = canvasWidth / colCount;
    const itemHeight = canvasHeight / rowCount;
    const offsetX = (compressWidth - canvasWidth) / -2;
    const offsetY = (compressHeight - canvasHeight) / -2;

    const length = rowCount * colCount;
    for (let i = 0; i < length; i++) {
      const id = `item_${i}`;
      const row = rowCount <= 1 ? 0 : (i / colCount >> 0);
      const col = colCount <= 1 ? 0 : (i % rowCount);
      const width = itemWidth;
      const height = itemHeight;
      const x = col * itemWidth;
      const y = row * itemHeight;
      const clipX = offsetX;
      const clipY = offsetY;
      const clipWidth = compressWidth;
      const clipHeight = compressHeight;
      const sprite = new ImageSprite(src, imageWidth, imageHeight, clipX, clipY, clipWidth, clipHeight);
      const item = new PuzzleItem(id, sprite, x, y, width, height);
      items.push(item);
    }

    return items;
  }
}
export default PuzzleItemCreator;
