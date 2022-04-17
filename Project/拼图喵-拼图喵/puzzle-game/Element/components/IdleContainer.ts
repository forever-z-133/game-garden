import Game from "../../Game";
import BaseElement from "../BaseElement";

class IdleContainer implements BaseElement {
  game: Game;
  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;

  constructor(game: Game) {
    this.game = game;

    const { windowHeight } = this.game.config;
    const { x: stageX, y: stageY, width: stageWidth, height: stageHeight } = this.game.stage.container;
    this.x = stageX;
    this.y = stageY * 2 + stageWidth;
    this.width = stageWidth;
    this.height = windowHeight - this.y;
  }

  draw() {}
}
export default IdleContainer;
