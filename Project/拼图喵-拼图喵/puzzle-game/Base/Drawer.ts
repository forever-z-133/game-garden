import Game from "../Game";

/**
 * 绘制器
 */
class Drawer {
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  draw(now: number) {
    if (!this.game.canvas) return;
    const { canvasWidth, canvasHeight } = this.game.config;
    const animation = this.game.animation;
    const ctx = this.game.canvas.ctx;
    const stage = this.game.stage;
    const { background, container, items } = stage;
    // ctx.globalCompositeOperation = 'destination-over';

    animation.list.forEach(item => {
      item.update(now);
    });

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    background.update(now);
    background.draw(ctx);

    container.draw(ctx);

    items.forEach(item => item.update(now));
    items.forEach(item => item.draw(ctx));

    ctx.draw(false);
  }
}
export default Drawer;
