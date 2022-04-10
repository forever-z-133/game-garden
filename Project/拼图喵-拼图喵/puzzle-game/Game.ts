import Drawer from "./Base/Drawer";
import PuzzleItemCreator from "./Base/PuzzleItemCreator";
import { SourcesConfig } from "./Base/SourceLoader";
import Updater from "./Base/Updater";
import Config from "./Config";
import GameData from "./GameData";

/**
 * 游戏主程序
 */
class Game {
  config: Config = null;
  data: GameData = null;
  sources: SourcesConfig = null;
  timer: Updater = null;
  drawer: Drawer = null;

  constructor() {
    this.config = new Config();
    this.data = new GameData();
    this.timer = new Updater();
    this.drawer = new Drawer();
  }

  setSources(sources: SourcesConfig) {
    this.sources = sources;
  }
  start() {
    const items = PuzzleItemCreator.create();
    this.timer.start(this.config.fps);
  }
  pause() {}
  resume() {}
  stop() {}
  destroy() {}
}
export default Game;
