import Drawer from "./Base/Drawer";
import { LoadedImageData, SourcesConfig } from "./Base/SourceLoader";
import Updater from "./Base/Updater";
import Config, { GameConfig } from "./Config";
import PuzzleItem from "./Element/components/PuzzleItem";
import Stage from "./Element/Stage";
import StageBackground from "./Element/components/StageBackground";
import GameData, { GameDataConfig } from "./GameData";
import CanvasOM from "./Source/CanvasOM";
import PuzzleContainer from "./Element/components/PuzzleContainer";

/**
 * 游戏主程序
 */
class Game {
  config: Config;
  data!: GameData;
  timer: Updater;
  drawer: Drawer;
  canvas!: CanvasOM;
  stage!: Stage;

  constructor(config: Partial<GameConfig> = {}) {
    this.config = new Config(config);
    this.drawer = new Drawer(this);
    this.timer = new Updater(this.drawer);
  }

  prepare(ctx: UniApp.CanvasContext, sources: SourcesConfig, options?: Partial<GameDataConfig>) {
    const { canvasWidth, canvasHeight } = this.config;
    this.canvas = new CanvasOM(ctx as any, canvasWidth, canvasHeight);

    this.data = new GameData(options);

    const images = sources.images as LoadedImageData[];
    const backgroundImage = images.find(e => e.id === 'background') as LoadedImageData;
    const sourceImage = images.find(e => e.id === 'puzzle-source') as LoadedImageData;

    const background: StageBackground = new StageBackground(this, backgroundImage);
    const container: PuzzleContainer = new PuzzleContainer(this);
    const items: PuzzleItem[] = container.createItems(sourceImage);

    this.stage = new Stage(this);
    this.stage.addElement('background', background);
    this.stage.addElement('container', container);
    this.stage.addElement('items', items);

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
    this.stop();
  }
}
export default Game;
