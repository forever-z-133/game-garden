/**
 * canvas 元素
 */
class CanvasOM {
  ctx: UniApp.CanvasContext = null;
  width: number = 0;
  height: number = 0;

  constructor(ctx: UniApp.CanvasContext, width: number, height: number) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
  }
}
export default CanvasOM;
