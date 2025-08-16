<template>
  <div class="gantt-drag-backdrop" :style="dragBackdrop.style">
    <div class="date-range" :style="dragBackdrop.rangeStyle">
      <span class="start">{{ dragBackdrop.data.startDate }}</span
      ><span class="end">{{ dragBackdrop.data.endDate }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useDragBackdrop from '@/composables/useDragBackdrop';
const { dragBackdrop } = useDragBackdrop();
</script>

<style lang="scss">
.gantt-drag-backdrop {
  position: absolute;
  z-index: 10;
  width: auto;
  height: 100%;

  &::before {
    display: block;
    width: 100%;
    height: 100%;
    content: '';
    background: var(--gantt-color-primary);
    opacity: 0.1;
  }

  .date-range {
    position: absolute;
    top: 43px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    width: 100%;
    min-width: 120px;
    min-height: 37px;
    padding: 0 10px;
    font-size: 12px;
    font-weight: 600;
    line-height: 37px;
    color: var(--gantt-color-white);
    background: var(--gantt-color-primary);
    border-radius: 4px;
  }
}
</style>