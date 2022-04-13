import StageBackground from "./StageBackground";
import PuzzleItem from "./PuzzleItem";
import Game from "../Game";

/**
 * 拼图面板
 */
class Stage {
  game: Game = null;
  background: StageBackground = null;
  items: PuzzleItem[] = [];

  constructor(game: Game, background: StageBackground, items: PuzzleItem[]) {
    this.game = game;
    this.background = background;
    this.items = items;
  }
}
export default Stage;
