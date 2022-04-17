import StageBackground from "./components/StageBackground";
import PuzzleItem from "./components/PuzzleItem";
import Game from "../Game";
import PuzzleContainer from "./components/PuzzleContainer";
import IdleContainer from "./components/IdleContainer";

/**
 * 拼图面板
 */
export type StageElementsConfig = {
  background: StageBackground;
  container: PuzzleContainer;
  idle: IdleContainer;
  items: PuzzleItem[];
}
class Stage implements StageElementsConfig {
  game: Game;
  background!: StageBackground;
  container!: PuzzleContainer;
  idle!: IdleContainer;
  items: PuzzleItem[] = [];

  constructor(game: Game) {
    this.game = game;
  }

  addElement: classSet<StageElementsConfig> = (key, element) => {
    (this as StageElementsConfig)[key] = element;
  }
}
export default Stage;
