import StageBackground from "./components/StageBackground";
import PuzzleItem from "./components/PuzzleItem";
import Game from "../Game";
import PuzzleContainer from "./components/PuzzleContainer";
import { GameConfig } from "../Config";

/**
 * 拼图面板
 */
 export type StageElementsConfig = {
  background: StageBackground;
  container: PuzzleContainer;
  items: PuzzleItem[];
}
class Stage implements StageElementsConfig {
  game: Game = null;
  background: StageBackground = null;
  container: PuzzleContainer = null;
  items: PuzzleItem[] = [];

  constructor(game: Game) {
    this.game = game;
  }

  addElement<T extends keyof StageElementsConfig>(key: T, element: StageElementsConfig[T]): void {
    this[key as string] = element;
  }
}
export default Stage;
