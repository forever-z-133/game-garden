export type ScaleType = 'contain' | 'cover';
export type ScaleData = {
  scale: number;
  width: number;
  height: number;
}

// 传入容器和内容宽高，按短边或长边进行缩放
export function getScaleData(contentWidth: number, contentHeight: number, wrapperWidth: number, wrapperHeight: number, mode: ScaleType = 'contain'): ScaleData {
  const r1 = wrapperWidth / contentWidth;
  const r2 = wrapperHeight / contentHeight;
  const result = { scale: 1, width: 0, height: 0 };
  if (mode === 'contain') {
    const scale = Math.min(r1, r2);
    result.scale = scale;
    result.width = contentWidth * scale;
    result.height = contentHeight * scale;
  } else if (mode === 'cover') {
    const scale = Math.max(r1, r2);
    result.scale = scale;
    result.width = contentWidth * scale;
    result.height = contentHeight * scale;
  }
  return result;
}

// 传入内容尺寸和最大宽度，内容进行压缩
export function getMaxScaleData(width: number, height: number, maxWidth: number): ScaleData {
  let result = { scale: 1, width, height };
  if (width > maxWidth) {
    result = getScaleData(width, height, maxWidth, 999999, 'contain');
  }
  return result;
}
