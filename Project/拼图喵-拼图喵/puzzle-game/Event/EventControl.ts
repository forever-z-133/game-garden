import PuzzleItem from "../Element/components/PuzzleItem";
import Game from "../Game";
import { expandRect, Point, pointInRect, rectInRect } from "../utils/positionUtil";

/**
 * 游戏交互
 */
export interface EventMap {
  onClick?: (e: Event) => void;
  onTouchStart?: (e?: TouchEvent) => void;
  onTouchMove?: (e?: TouchEvent) => void;
  onTouchEnd?: (e?: TouchEvent) => void;
};
class EventControl implements EventMap {
  game: Game;
  customEvnets: EventMap;
  disable: boolean = true;
  _triggerItem?: PuzzleItem;
  _lastPoint?: Point;

  constructor(game: Game, customEvnets: Partial<EventMap> = {}) {
    this.game = game;
    this.customEvnets = customEvnets;
  }

  onTouchStart = (e: any) => {
    if (this.disable) return;

    this.customEvnets?.onTouchStart?.(e as TouchEvent);

    const point = e.touches[0];
    this._lastPoint = point;

    const { items } = this.game.stage;
    if (!items || !items.length) return;

    // 找到 [点中&未正确] 的格子进行选中
    this._triggerItem = undefined;
    const matcher: PuzzleItem[] = [];
    this.game.stage.items.forEach((item) => {
      const inner = pointInRect(point, item);
      item.chosen = false;
      inner && !item.correct && matcher.push(item);
    });
    if (matcher && matcher.length) {
      this._triggerItem = matcher.pop() as PuzzleItem;
      this._triggerItem.chosen = true;
    }
  }
  onTouchMove = (e: any) => {
    if (this.disable) return;

    this.customEvnets?.onTouchMove?.(e as TouchEvent);

    const point = e.touches[0];

    const { items } = this.game.stage;
    if (!items || !items.length) return;

    // 将选中的方格进行拖动
    if (this._triggerItem && this._lastPoint) {
      const { x: lastX, y: lastY } = this._lastPoint;
      const offsetX = point.x - lastX;
      const offsetY = point.y - lastY;
      this._triggerItem.x += offsetX;
      this._triggerItem.y += offsetY;
      this._lastPoint = point;
    }
  }
  onTouchEnd = (e: any) => {
    if (this.disable) return;

    this.customEvnets?.onTouchEnd?.(e as TouchEvent);

    this._lastPoint = undefined;

    const { items } = this.game.stage;
    if (!items || !items.length) return;

    // 拖完放置元素时，判断选中元素是否正确
    if (this._triggerItem) {
      const { x, y, width, height, answer } = this._triggerItem;
      const rect = { x, y, width, height };
      const inner = rectInRect(rect, expandRect(answer, 16));
      if (inner) {
        this._triggerItem.setCorrect();
        this._triggerItem = undefined;
      }
    }

    // 每次放置判断是否游戏结束
    const isAllRight = items.every(item => item.correct);
    if (isAllRight && !this.game.success) {
      this.game.event.disable = true;
      this.game.gameSuccess();
    }
  }

  onTouchCancel = (e: TouchEvent) => {
    this.onTouchEnd(e);
  }
}
export default EventControl;
