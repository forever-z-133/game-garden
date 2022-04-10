<template>
  <div class="game-container">
    <canvas
      class="canvas game-canvas"
      :style="{width: '500px', height: 9999}"
      canvas-id="tempCanvas"
      id="tempCanvas"
    />
    <canvas
      class="canvas temp-canvas"
      canvas-id="tempCanvas"
      id="tempCanvas"
    />
  </div>
</template>

<script setup lang="ts">
const systemInfo = uni.getSystemInfoSync();
console.log(systemInfo);
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
