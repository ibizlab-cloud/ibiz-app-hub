<template>
  <div
    ref="ganttBodyRef"
    class="xg-gantt-body"
    :style="{ height: bodyHeight, width: `${ganttWidth}px` }"
  >
    <!-- 滑动条 -->
    <template v-for="d in inView" :key="d.uuid">
      <RowVue :data="d" class="xg-gantt-row" :render-style="false" long-press>
        <component :is="$slotsBox.slider" :data="d" />
      </RowVue>
    </template>

    <!-- 连线 -->
    <svg class="xg-gantt-body-line-wrap" :style="{ width: `${ganttWidth}px` }">
      <LinkPath v-for="link in $links.links" :key="link.uuid" :link="link" />

      <Linking />
    </svg>

    <!-- 行样式 -->
    <template v-for="d in inView" :key="d.uuid">
      <RowVue class="xg-gantt-table-row" :data="d">
        <template v-if="$slotsBox.ganttCell">
          <template v-for="(c, i) in dateList[1]" :key="i">
            <div
              class="xg-gantt-table-cell"
              :style="{
                width: `${getGanttUnitColumnWidth(
                  c.date.date,
                  i === 0
                    ? 'after'
                    : i === dateList[1].length - 1
                      ? 'before'
                      : undefined,
                )}px`,
                height: '100%',
              }"
            >
              <component
                :is="$slotsBox.ganttCell"
                v-bind="{ column: c, ...toRowData(d) }"
              />
            </div>
          </template>
        </template>
      </RowVue>
    </template>

    <!-- 周末 -->
    <template v-for="(date, i) in ganttHeader.datesByUnit">
      <div
        v-if="$styleBox.showWeekend && date.isWeekend()"
        :key="i"
        class="xg-gantt-body-date-line weekend"
        :style="{
          width: `${ganttColumnWidth}px`,
          left: `${ganttColumnWidth * i}px`,
          backgroundColor: $styleBox.bodyStyle?.weekendColor || '#ddd',
        }"
      ></div>
    </template>

    <!-- 今天 -->
    <div
      v-if="showToday"
      class="xg-gantt-body-date-line today"
      :style="{
        width: `${todayColumnWidth}px`,
        left: `${todayLeft}px`,
        backgroundColor: $styleBox.bodyStyle?.todayColor || '#87CEFA',
      }"
    ></div>

    <!-- 节假日 -->
    <template v-for="holidays in $styleBox.holidays">
      <div
        v-for="date in holidays.date"
        :key="date.toString()"
        class="xg-gantt-body-date-line holiday"
        :style="{
          width: `${ganttColumnWidth}px`,
          left: `${calcLeft(date)}px`,
          backgroundColor: holidays.color,
        }"
      ></div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import useData from '@/composables/useData';
import useGanttHeader from '@/composables/useGanttHeader';
import useGanttWidth from '@/composables/useGanttWidth';
import useInView from '@/composables/useInView';
import useSlotsBox from '@/composables/useSlotsBox';
import useStyle from '@/composables/useStyle';
import useToday from '@/composables/useToday';
import useLinks from '@/composables/useLinks';
import RowVue from './Row.vue';
import LinkPath from '@/components/links/LinkPath.vue';
import Linking from '@/components/links/Linking.vue';
import useElement from '@/composables/useElement';
import { XDate } from '@/models/param/date';

const { $slotsBox } = useSlotsBox();
const { bodyHeight, $styleBox } = useStyle();
const { dateList, toRowData } = useData();
const {
  ganttWidth,
  ganttColumnWidth,
  headerShowUnit,
  currentMillisecond,
  getGanttUnitColumnWidth,
} = useGanttWidth();
const { inView } = useInView();
const { todayLeft, showToday, generateToday } = useToday();
const { ganttHeader } = useGanttHeader();
const { $links } = useLinks();
const { ganttBodyRef } = useElement();

const calcLeft = (date: XDate) => {
  const start = ganttHeader.start?.clone();
  start?.startOf(headerShowUnit.value);

  date.startOf(headerShowUnit.value);
  return (
    (date.intervalTo(start) / currentMillisecond.value) * ganttColumnWidth.value
  );
};

const todayColumnWidth = computed(() => {
  // 适配时间单位为小时显示的当天样式，为小时不能只绘制一格，应撑满一天
  if (ganttHeader.unit === 'hour') {
    const sd = ganttHeader.start;
    const ed = ganttHeader.end;
    const today = generateToday.value;
    let numberColumns = 24;
    // 今天等于结束时间时，宽度应根据显示了几个小时来计算
    if (ed?.isSame(today, 'day')) {
      // 小时计算是从0开始的，计算出的小时个数得默认加一
      numberColumns = ed?.isSame(today, 'day')
        ? ed.getBy('hour') + 1
        : 24 - sd.getBy('hour') + 1;
    }
    return ganttColumnWidth.value * numberColumns;
  }
  return ganttColumnWidth.value;
});
</script>

<style lang="scss">
.xg-gantt-body {
  position: relative;
  z-index: 9;

  .xg-gantt-row {
    z-index: 9;
  }

  .xg-gantt-body-line-wrap {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 5;
    pointer-events: none;
  }

  .xg-gantt-body-date-line {
    z-index: 2;
    height: 100%;
    position: absolute;
    top: 0;
    opacity: 0.6;
    pointer-events: none;
  }

  .xg-gantt-table-row {
    .xg-gantt-table-cell {
      display: inline-block;
    }
  }
}
</style>
