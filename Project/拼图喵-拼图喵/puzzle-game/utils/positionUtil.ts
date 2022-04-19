export type Point = { x: number, y: number };
export type Rect = { x: number, y: number, width: number, height: number };
export type Divide = { row: number, col: number };
export type DivideRect = Rect & Divide;

// 拆分大格子成小格子
export const divideRect = (rowCount: number, colCount: number, puzzleWidth: number, puzzleHeight: number): DivideRect[] => {
  const items: DivideRect[] = [];

  const itemWidth = puzzleWidth / colCount;
  const itemHeight = puzzleHeight / rowCount;

  const length = rowCount * colCount;
  for (let i = 0; i < length; i++) {
    const { row, col } = getRowAndCol(i, rowCount, colCount);
    const width = itemWidth;
    const height = itemHeight;
    const x = col * itemWidth;
    const y = row * itemHeight;
    const item = { row, col, x, y, width, height };
    items.push(item);
  }

  return items;
}

// 扩展方块面积
export const expandRect = (rect: Rect, sizeX: number, sizeY = sizeX): Rect => {
  const x = rect.x - sizeX;
  const y = rect.y - sizeY;
  const width = rect.width + sizeX * 2;
  const height = rect.height + sizeY * 2;
  return { x, y, width, height };
}

// 根据索引和表格配置，获取索引所在行列
export const getRowAndCol = (index: number, rowCount: number, colCount: number): Divide => {
  const row = index / colCount >> 0;
  const col = index % colCount;
  return { row, col };
}

// 获取线段内可放置线段的位置随机值
export const randomPosition = (left: number, right: number, size: number): number => {
  return Math.random() * (right - size - left) + left;
}

// 判断点是否处于方块内部
export const pointInRect = (point: Point, rect: Rect): boolean => {
  const outer = point.x < rect.x || point.y < rect.y || point.x > (rect.x + rect.width) || point.y > (rect.y + rect.height);
  return !outer;
}

// 判断方块是否处于方块内部
export const rectInRect = (rect: Rect, bigRect: Rect): boolean => {
  const left = rect.x > bigRect.x;
  const right = rect.x + rect.width < bigRect.x + bigRect.width;
  const top = rect.y > bigRect.y;
  const bottom = rect.y + rect.height < bigRect.y + bigRect.height;
  return left && right && top && bottom;
}
