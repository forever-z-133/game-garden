<template>
  <div></div>
</template>

<script setup lang="ts">
import { PropType, reactive } from 'vue';
import { SourcesConfig } from '../../puzzle-game/Base/SourceLoader';
const props = defineProps({
  sources: {
    type: Object as PropType<SourcesConfig>,
    default: () => ({}),
  }
});
const state = reactive({
  progress: 0,
});
</script>
