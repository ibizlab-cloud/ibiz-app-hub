/* eslint-disable no-use-before-define */
/* eslint-disable no-multi-assign */
import { defineComponent, ref, computed, PropType } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { deepMerge, getThemeVar, autoResize } from '../../util';
import './custom-decoration-6.scss';

export const CustomDecoration6 = defineComponent({
  name: 'CustomDecoration6',
  props: {
    color: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  setup(props) {
    const ns = useNamespace('custom-decoration-6');

    const rectWidth = ref<number>(7);

    const svgWH = ref<[number, number]>([300, 35]);
    const svgScale = ref<[number, number]>([1, 1]);
    const rowNum = ref<number>(1);
    const rowPoints = ref<number>(40);
    const halfRectWidth = ref<number>(rectWidth.value / 2);

    const points = ref<number[][]>([]);
    const heights = ref<number[]>([]);
    const minHeights = ref<number[]>([]);
    const randoms = ref<number[]>([]);

    const customDecoration6 = ref();
    const defaultColor = [getThemeVar() || '#0095ee', '#95d8f8'];
    const mergedColor = computed(() => {
      return deepMerge(defaultColor, props.color || []) as string[];
    });

    const randomExtend = (minNum: number, maxNum: number) => {
      if (arguments.length === 1)
        return Number.parseInt((Math.random() * minNum + 1).toString(), 10);
      return Number.parseInt(
        (Math.random() * (maxNum - minNum + 1) + minNum).toString(),
        10,
      );
    };

    const calcPointsPosition = () => {
      const [w, h] = svgWH.value;

      const horizontalGap = w / (rowPoints.value + 1);
      const verticalGap = h / (rowNum.value + 1);

      const points1 = Array.from({ length: rowNum.value })
        .fill(0)
        .map((foo, i) =>
          Array.from({ length: rowPoints.value })
            .fill(0)
            .map((foo, j) => [horizontalGap * (j + 1), verticalGap * (i + 1)]),
        );

      points.value = points1.reduce((all, item) => [...all, ...item], []);
      const heights1 = Array.from({
        length: rowNum.value * rowPoints.value,
      })
        .fill(0)
        .map(() =>
          Math.random() > 0.8
            ? randomExtend(0.7 * h, h)
            : randomExtend(0.2 * h, 0.5 * h),
        );

      heights.value = heights1;

      minHeights.value = Array.from({ length: rowNum.value * rowPoints.value })
        .fill(0)
        .map((foo, i) => heights1[i] * Math.random());

      randoms.value = Array.from({ length: rowNum.value * rowPoints.value })
        .fill(0)
        .map(() => Math.random() + 1.5);
    };

    const calcSVGData = () => {
      calcPointsPosition();

      calcScale();
    };

    const onResize = () => {
      calcSVGData();
    };

    const afterAutoResizeMixinInit = () => {
      calcSVGData();
    };

    const { width, height } = autoResize(
      customDecoration6,
      onResize,
      afterAutoResizeMixinInit,
    );

    const calcScale = () => {
      const [w, h] = svgWH.value;

      svgScale.value = [width.value / w, height.value / h];
    };

    /**
     * 绘制边框svg
     */
    const renderBorder = () => {
      return (
        <svg
          width={`${svgWH.value[0]}px`}
          height={`${svgWH.value[1]}px`}
          style={`transform:scale(${svgScale.value[0]},${svgScale.value[1]});`}
        >
          {points.value.map((point, i) => {
            return (
              <rect
                key={i}
                fill={mergedColor.value[Math.random() > 0.5 ? 0 : 1]}
                x={point[0] - halfRectWidth.value}
                y={point[1] - heights.value[i] / 2}
                width={rectWidth.value}
                height={heights.value[i]}
              >
                <animate
                  attributeName='y'
                  values={`${point[1] - minHeights.value[i] / 2};${point[1] - heights.value[i] / 2};${point[1] - minHeights.value[i] / 2}`}
                  dur={`${randoms.value[i]}s`}
                  keyTimes='0;0.5;1'
                  calcMode='spline'
                  keySplines='0.42,0,0.58,1;0.42,0,0.58,1'
                  begin='0s'
                  repeatCount='indefinite'
                />
                <animate
                  attributeName='height'
                  values={`${minHeights.value[i]};${heights.value[i]};${minHeights.value[i]}`}
                  dur={`${randoms.value[i]}s`}
                  keyTimes='0;0.5;1'
                  calcMode='spline'
                  keySplines='0.42,0,0.58,1;0.42,0,0.58,1'
                  begin='0s'
                  repeatCount='indefinite'
                />
              </rect>
            );
          })}
        </svg>
      );
    };

    return {
      ns,
      customDecoration6,
      renderBorder,
    };
  },
  render() {
    return (
      <div ref='customDecoration6' class={this.ns.b()}>
        {this.renderBorder()}
        {this.$slots.default?.()}
      </div>
    );
  },
});
