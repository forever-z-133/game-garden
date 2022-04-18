import Animation from "../Animation/Animation";
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
    items.forEach((item) => {
      const inner = pointInRect(point, item);
      item.chosen = false;
      inner && !item.correct && matcher.push(item);
    });

    if (matcher && matcher.length) {
      const item = matcher.pop() as PuzzleItem;
      this._triggerItem = item;
      // 标记选中
      item.chosen = true;
      // 调整 z-index 层级
      const index = items.findIndex(e => e.index === item.index);
      this.game.stage.items.splice(index, 1);
      this.game.stage.items.push(item);
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
      this._triggerItem.chosen = false;
      const { x, y, width, height, answer } = this._triggerItem;
      const rect = { x, y, width, height };
      const inner = rectInRect(rect, expandRect(answer, 16));
      if (inner) {
        const item = this._triggerItem;
        item.correct = true;
        const anim = new Animation(rect, answer, 300, {
          onProgress: (data: any) => {
            const { x, y, width, height } = data;
            item.x = x;
            item.y = y;
            item.width = width;
            item.height = height;
          },
          onFinish: () => {
            item.chosen = false;
            const index = items.findIndex(e => e.index === item.index);
            this.game.stage.items.splice(index, 1);
            this.game.stage.items.unshift(item);
          }
        });
        this.game.animation.add(anim);
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
