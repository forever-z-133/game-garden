// 拆分大格子成小格子
export const divideRect = (rowCount: number, colCount: number, puzzleWidth: number, puzzleHeight: number) => {
  const items = [];

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
