// 拆分大格子成小格子
export type Rect = { x: number, y: number, width: number, height: number };
export type DivideRect = Rect & { row: number, col: number };
export const divideRect = (rowCount: number, colCount: number, puzzleWidth: number, puzzleHeight: number): DivideRect[] => {
  const items: DivideRect[] = [];

  const itemWidth = puzzleWidth / colCount;
  const itemHeight = puzzleHeight / rowCount;

  const length = rowCount * colCount;
  for (let i = 0; i < length; i++) {
    const row = i / colCount >> 0;
    const col = i % colCount;
    const width = itemWidth;
    const height = itemHeight;
    const x = col * itemWidth;
    const y = row * itemHeight;
    const item = { row, col, x, y, width, height };
    items.push(item);
  }

  return items;
}
