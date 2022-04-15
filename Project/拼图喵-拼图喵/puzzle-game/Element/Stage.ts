import StageBackground from "./components/StageBackground";
import PuzzleItem from "./components/PuzzleItem";
import Game from "../Game";
import PuzzleContainer from "./components/PuzzleContainer";

/**
 * 拼图面板
 */
export type StageElementsConfig = {
  background: StageBackground;
  container: PuzzleContainer;
  items: PuzzleItem[];
}
class Stage implements StageElementsConfig {
  game: Game;
  background!: StageBackground;
  container!: PuzzleContainer;
  items: PuzzleItem[] = [];

  constructor(game: Game) {
    this.game = game;
  }

  addElement: classSet<StageElementsConfig> = (key, element) => {
    (this as StageElementsConfig)[key] = element;
  }
}
export default Stage;
