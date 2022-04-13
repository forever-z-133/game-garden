import Drawer from "./Base/Drawer";
import PuzzleItemCreator from "./Base/PuzzleItemCreator";
import { LoadedImageData, SourcesConfig } from "./Base/SourceLoader";
import Updater from "./Base/Updater";
import Config, { GameConfig } from "./Config";
import PuzzleItem from "./Element/PuzzleItem";
import Stage from "./Element/Stage";
import StageBackground from "./Element/StageBackground";
import GameData, { GameDataConfig } from "./GameData";
import CanvasOM from "./Source/CanvasOM";

/**
 * 游戏主程序
 */
class Game {
  config: Config = null;
  data: GameData = null;
  timer: Updater = null;
  drawer: Drawer = null;
  canvas: CanvasOM = null;
  stage: Stage = null;

  constructor(config: Partial<GameConfig> = {}) {
    this.config = new Config(config);
    this.drawer = new Drawer(this);
    this.timer = new Updater(this.drawer);
  }

  prepare(ctx: UniApp.CanvasContext, sources?: SourcesConfig, options?: Partial<GameDataConfig>) {
    const { canvasWidth, canvasHeight } = this.config;
    this.canvas = new CanvasOM(ctx as any, canvasWidth, canvasHeight);
    this.data = new GameData(options);
    const images = sources.images as LoadedImageData[];
    const backgroundImage = images.find(e => e.id === 'background');
    const sourceImage = images.find(e => e.id === 'puzzle-source');
    const background: StageBackground = new StageBackground(this, backgroundImage);
    const items: PuzzleItem[] = PuzzleItemCreator.create(this, sourceImage);
    this.stage = new Stage(this, background, items);
    this.config.set('initialized', true);
  }

  start() {
    this.timer.start(1);
  }
  pause() {
    this.timer.pause();
  }
  resume() {
    this.timer.resume();
  }
  stop() {
    this.timer.stop();
  }
  destroy() {
    this.config.set('initialized', false);
    this.canvas = null;
    this.data = null;
    this.stage = null;
    this.stop();
  }
}
export default Game;
