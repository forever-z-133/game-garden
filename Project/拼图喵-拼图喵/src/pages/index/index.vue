<template>
  <div class="game-container">
    <canvas
      class="canvas game-canvas"
      :style="{width: `${canvasWidth}px`, height: `${canvasHeight}px`}"
      canvas-id="gameCanvas"
      id="gameCanvas"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    />
    <canvas
      class="canvas temp-canvas"
      canvas-id="tempCanvas"
      id="tempCanvas"
    />
    <button @click="pauseGame">暂停</button>
    <button @click="resumeGame">恢复</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { SourcesConfig } from '../../../puzzle-game/Base/SourceLoader';
import Game from '../../../puzzle-game/Game';
import { GameDataConfig } from '../../../puzzle-game/GameData';
import { initCanvas } from '../../utils/initCanvas';
import { loadImage } from '../../utils/loadImage';

const systemInfo = uni.getSystemInfoSync();
const { windowWidth, windowHeight } = systemInfo;

let ctx: UniApp.CanvasContext | null = null;
const canvasWidth = windowWidth;
const canvasHeight = windowHeight;

const game: Game = new Game({
  windowWidth,
  windowHeight,
  canvasWidth,
  canvasHeight,
});

const options: GameDataConfig = {
  rowCount: 2,
  colCount: 2,
  rotatable: false,
};
const sources: SourcesConfig = {
  images: [
    {
      id: 'background',
      src: 'https://images.996pic.com/281821367c3246e6885715a9480c801b680_680.jpg'
    },
    {
      id: 'puzzle-source',
      src: 'https://images.996pic.com/683dc278306d410785ccde558e081e96680_680.jpg'
    }
  ],
};

const {
  onTouchStart,
  onTouchMove,
  onTouchEnd,
} = game.initEvent();

const startGame = async () => {
  if (!ctx) return;
  game.prepare(ctx, sources, options);
  setTimeout(() => {
    game.start();
  }, 200);
}

const pauseGame = () => {
  game.pause();
}
const resumeGame = () => {
  game.resume();
}

onMounted(async () => {
  for (let i = 0; i < sources.images.length; i++) {
    const loadedImage = await loadImage(sources.images[i]);
    sources.images[i] = loadedImage;
  }
  ctx = ctx || initCanvas('gameCanvas').ctx;
  startGame();
});

onUnmounted(() => {
  game.destroy();
});
</script>

<style lang="scss">
.canvas {
  display: block;
}
.game-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  .temp-canvas {
    position: absolute;
    left: -9999px;
    width: 1980px;
    height: 1980px;
  }
}
</style>
