<template>
  <div ref="tableBodyRef" class="xg-table-body" :style="{ height: bodyHeight }">
    <template v-if="inView.length > 0">
      <template v-for="d in inView" :key="d.id">
        <RowVue class="xg-table-row" :data="d">
          <template v-for="(c, i) in $slotsBox.cols" :key="`${d.uuid}_${i}`">
            <component :is="c" :data="d" />
          </template>
        </RowVue>
      </template>
    </template>
    <component v-else :is="$slotsBox.empty" />
  </div>

  <div
    :style="{
      height: `${props.gap}px`,
      width: '100%',
    }"
  />
</template>

<script lang="ts" setup>
import { reactive, ref, Ref, watchEffect, WatchStopHandle } from 'vue';
import { compareArrays } from '@/utils/common';
import useInView from '@/composables/useInView';
import useSlotsBox from '@/composables/useSlotsBox';
import useStyle from '@/composables/useStyle';
import useMethod from '@/composables/useMethod';
import { useMouseInElement } from '@vueuse/core';
import { useSortable } from '@vueuse/integrations/useSortable';
import useData from '@/composables/useData';
import useParam from '@/composables/useParam';
import useEvent from '@/composables/useEvent';
import RowVue from './Row.vue';

type UseMouseInElement = ReturnType<typeof useMouseInElement>;

const props = defineProps<{ gap: number }>();

const { bodyHeight, rowHeight, $styleBox } = useStyle();
const { inView } = useInView();

const { $slotsBox } = useSlotsBox();
const { EmitNodeDrop } = useEvent();

// #region 拖拽 row
const { $data } = useData();
const { $param } = useParam();
const { allowDrag, allowDrop } = useMethod();
const tableBodyRef = ref(null) as Ref<HTMLElement | null>;
let mouse = null as UseMouseInElement | null;
let mouseWatch: WatchStopHandle;

useSortable(tableBodyRef, [], {
  handle: '.drag-icon',
  draggable: '.xg-row',
  dragClass: 'xg-row-dragging',
  dragoverBubble: true,
  filter: (that: any, e: any, target: any) => {
    const flatIndex = Math.ceil(e.offsetTop / rowHeight.value);
    const dragging = $data.flatData[flatIndex];
    return !allowDrag(dragging.data);
  },
  onStart: function (e: any) {
    if (!e.item.classList.contains('xg-row')) return;

    const flatIndex = Math.ceil(e.item.offsetTop / rowHeight.value);
    $param.moveStartItem = $data.flatData[flatIndex];
    $param.moveType = 'none';

    mouse = reactive(
      useMouseInElement(tableBodyRef),
    ) as unknown as UseMouseInElement;

    mouseWatch = watchEffect(() => {
      const y = ref(mouse?.elementY);

      if (typeof y.value === 'number') {
        const calcMath = y.value / rowHeight.value;
        const flatIndex = Math.floor(calcMath);
        const data = $data.flatData[flatIndex];

        const decimals = calcMath % 1;
        if ($styleBox.draggable.level === 'current') {
          if (0 < decimals && decimals < 0.5) {
            $param.moveType = 'before';
          } else if (0 == decimals || decimals >= 0.5) {
            $param.moveType = 'after';
          }
        } else {
          if (0 < decimals && decimals < 0.2) {
            $param.moveType = 'before';
          } else if (0 == decimals || decimals > 0.8) {
            $param.moveType = 'after';
          } else {
            $param.moveType = 'inner';
          }
        }

        if (data) {
          if (
            allowDrop($param.moveStartItem!.data, data.data, $param.moveType)
          ) {
            if (
              $param.moveHoverItem?.uuid !== data.uuid &&
              !(
                $param.moveHoverItem &&
                $styleBox.draggable.level === 'current' &&
                !compareArrays(data.parentPath, $param.moveHoverItem.parentPath)
              )
            ) {
              $param.moveHoverItem = data;
            }
          } else {
            $param.moveHoverItem = null;
          }
        }
      }
    });
  },
  onEnd: function (e: any) {
    const dragging = $param.moveStartItem;
    const drop = $param.moveHoverItem;
    const type = $param.moveType;

    $param.moveStartItem = null;
    $param.moveHoverItem = null;
    $param.moveType = 'none';

    mouse?.stop();
    mouseWatch?.();

    if (!(!dragging || !drop || dragging.id === drop.id || type === 'none')) {
      const result = $data.draggable(dragging, drop, type);
      if (result) {
        EmitNodeDrop(dragging.data, drop.data, type);
      }
    }
  },
});
// #endregion
</script>

<style lang="scss">
.xg-table-body {
  width: 100%;
  position: relative;

  .xg-table-row.xg-row.xg-row-dragging {
    background-color: var(--primary-color);
    border: 1px dashed var(--gantt-color-border-dashed);
    border-radius: 4px;
    box-shadow: 0 0 10px var(--gantt-color-border-dashed);
    cursor: grabbing;
  }
}

.xg-row.xg-row__ghost {
  background-color: var(--primary-color);
  opacity: 0.5;
  transition: all 0.3s ease;
}

.xg-row {
  &.xg-row__drag-before {
    border-top: 2px solid var(--primary-color) !important;
  }
  &.xg-row__drag-inner {
    filter: brightness(1.2);
    background-color: var(--primary-color);
    transition: all 0.3s ease;
  }
  &.xg-row__drag-after {
    border-bottom: 2px solid var(--primary-color) !important;
  }
}
</style>
