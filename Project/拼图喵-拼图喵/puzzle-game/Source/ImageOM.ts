/**
 * 图片对象模型
 */
class ImageOM {
  src: string = '';
  width: number = 0;
  height: number = 0;

  constructor(src: string, width: number, height: number) {
    this.src = src;
    this.width = width;
    this.height = height;
  }
}
export default ImageOM;
