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
import EventControl, { EventMap } from "./Event/EventControl";
import IdleContainer from "./Element/components/IdleContainer";
import AnimationControl from "./Animation/AnimationControl";

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
  event!: EventControl;
  animation!: AnimationControl;
  success: boolean = false;

  constructor(config: Partial<GameConfig> = {}) {
    this.config = new Config(config);
    this.drawer = new Drawer(this);
    this.timer = new Updater(this.drawer);
    this.animation = new AnimationControl();
  }

  initEvent(customEvnets: Partial<EventMap> = {}): EventMap {
    this.event = new EventControl(this, customEvnets);
    return this.event;
  }

  prepare(ctx: UniApp.CanvasContext, sources: SourcesConfig, options?: Partial<GameDataConfig>) {
    const { canvasWidth, canvasHeight } = this.config;
    this.canvas = new CanvasOM(ctx as any, canvasWidth, canvasHeight);

    this.data = new GameData(options);

    const images = sources.images as LoadedImageData[];
    const backgroundImage = images.find(e => e.id === 'background') as LoadedImageData;
    const sourceImage = images.find(e => e.id === 'puzzle-source') as LoadedImageData;

    this.stage = new Stage(this);
    const background: StageBackground = new StageBackground(this, backgroundImage);
    this.stage.addElement('background', background);
    const container: PuzzleContainer = new PuzzleContainer(this);
    this.stage.addElement('container', container);
    const idle: IdleContainer = new IdleContainer(this);
    this.stage.addElement('idle', idle);
    const items: PuzzleItem[] = container.createItems(sourceImage);
    this.stage.addElement('items', items);

    // container.random(items);

    this.config.set('initialized', true);
  }

  gameSuccess() {
    this.success = true;
    uni.showToast({ title: '成功' });
  }

  start() {
    this.success = false;
    this.event.disable = false;
    this.timer.start(120);
  }
  pause() {
    this.event.disable = true;
    this.timer.pause();
  }
  resume() {
    this.event.disable = false;
    this.timer.resume();
  }
  stop() {
    this.success = false;
    this.event.disable = true;
    this.timer.stop();
  }
  destroy() {
    this.config.set('initialized', false);
    this.stop();
  }
}
export default Game;
