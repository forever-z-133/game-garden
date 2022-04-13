type InitCanvasResult = {
  ctx: UniApp.CanvasContext;
  tempCtx?: any;
}

export const initCanvas = (canvasId: string): InitCanvasResult => {
  const ctx: UniApp.CanvasContext = uni.createCanvasContext(canvasId)
  // const tempCanvas: UniApp.OffscreenCanvas = uni.createOffscreenCanvas();
  // const tempCtx = tempCanvas.getContext('2d');
  return { ctx };
}
