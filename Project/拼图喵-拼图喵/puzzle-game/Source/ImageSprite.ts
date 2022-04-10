import Sprite from './BaseSprite';
import ImageOM from './ImageOM';

/**
 * 图片素材
 */
class ImageSprite extends Sprite {
  source: ImageOM = null;
  clipX: number = 0;
  clipY: number = 0;
  clipWidth: number = 0;
  clipHeight: number = 0;
  get width(): number {
    return this.source.width;
  }
  get height(): number {
    return this.source.height;
  }

  constructor(src: string, width: number, height: number, clipX: number = 0, clipY: number = 0, clipWidth: number = width, clipHeight: number = height) {
    super();
    this.source = new ImageOM(src, width, height);
    this.clipX = clipX;
    this.clipY = clipY;
    this.clipWidth = clipWidth;
    this.clipHeight = clipHeight;
  }
}
export default ImageSprite;
