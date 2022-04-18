<template>
  <view class="game-container">
    <canvas
      class="canvas game-canvas"
      :style="{width: `${canvasWidth}px`, height: `${canvasHeight}px`}"
      canvas-id="gameCanvas"
      id="gameCanvas"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    />
    <button class="btn btn-custom" @click="openCustomSettings">自定义游戏</button>
    <view
      class="modal custom-setting-modal"
      :class="{ visible: customSettingVisible }"
    >
      <view class="modal-mask" @click="closeCustomSettings"></view>
      <view class="modal-container">
        <FormItem label="图片">111</FormItem>
        <FormItem label="行数">
          <slider min="1" max="9" block-size="12" />
        </FormItem>
        <FormItem label="列数">
          <slider min="1" max="9" block-size="12" />
        </FormItem>
        <FormItem label="是否可旋转">444</FormItem>
        <view class="buttons">
          <button class="btn btn-cancel">取消</button>
          <button class="btn btn-submit">确定</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import FormItem from '../../components/FormItem.vue';
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { LoadedImageData, SourcesConfig } from '../../../puzzle-game/Base/SourceLoader';
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
      src: 'http://www.51pptmoban.com/d/file/2019/01/02/99bf843b61dc5592e097bee522cdb28d.jpg'
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

const customSettingVisible = ref(false);
const openCustomSettings = () => {
  customSettingVisible.value = true;
}
const closeCustomSettings = () => {
  customSettingVisible.value = false;
}

const customSettingFormData = reactive<GameDataConfig & { source?: LoadedImageData }>({
  rowCount: 2,
  colCount: 2,
  rotatable: false,
});

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
@import '../../uni.scss';
.canvas {
  display: block;
}
.modal {
  @include modal();
}
.game-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  .btn-custom {
    position: absolute;
    top: 10rpx;
    left: 10rpx;
  }
  .custom-setting-modal {
    .modal-container {
      margin: 80rpx auto;
      width: 600rpx;
      height: 80%;
      background-color: #fff;
      border-radius: 10rpx;
    }
  }
}
</style>
