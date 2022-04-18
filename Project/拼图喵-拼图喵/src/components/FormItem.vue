<template>
  <view class="form-item">
    <view class="form-item-label">
      <text>{{label}}</text>
    </view>
    <view class="form-item-container">
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
type Props = {
  label?: string;
}
import { useSlots, toRefs, withDefaults } from "vue";

withDefaults(defineProps<Props>(), {
  label: '',
});
</script>
