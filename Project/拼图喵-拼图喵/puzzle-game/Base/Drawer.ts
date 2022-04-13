import Game from "../Game";
import CanvasOM from "../Source/CanvasOM";

/**
 * 绘制器
 */
class Drawer {
  game: Game = null;

  constructor(game: Game) {
    this.game = game;
  }

  draw(now: number) {
    if (!this.game.canvas) return;
    const { canvasWidth, canvasHeight } = this.game.config;
    const ctx = this.game.canvas.ctx;
    const stage = this.game.stage;
    const { background, items } = stage;
    // ctx.globalCompositeOperation = 'destination-over';

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    background.update(now);
    background.draw(ctx);

    items.forEach(item => item.update(now));
    items.forEach(item => item.draw(ctx));

    ctx.draw(false);
  }
}
export default Drawer;
