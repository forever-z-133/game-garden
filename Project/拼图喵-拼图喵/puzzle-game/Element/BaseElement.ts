/**
 * 拼图面板
 */
interface BaseElement {
  update?(now: number): void;
  draw(ctx: UniApp.CanvasContext): void;
  destroy?(): void;
}
export default BaseElement;