/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
import { defineComponent, ref, computed, PropType } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { deepMerge, getThemeVar, autoResize } from '../../util';
import './custom-decoration-3.scss';

export const CustomDecoration3 = defineComponent({
  name: 'CustomDecoration3',
  props: {
    color: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    dur: {
      type: Number,
      default: 1.2,
    },
  },
  setup(props) {
    const ns = useNamespace('custom-decoration-3');

    const pointSideLength = ref(7);
    const svgWH = ref<[number, number]>([300, 35]);
    const svgScale = ref<[number, number]>([1, 1]);
    const rowNum = ref<number>(2);
    const rowPoints = ref<number>(25);

    const halfPointSideLength = ref(pointSideLength.value / 2);

    const points = ref<number[][]>([]);

    const defaultColor = [getThemeVar() || '#0095ee', '#95d8f8'];
    const customDecoration3 = ref();
    const mergedColor = computed(() => {
      return deepMerge(defaultColor, props.color || []) as string[];
    });

    const calcPointsPosition = () => {
      const [w, h] = svgWH.value;

      const horizontalGap = w / (rowPoints.value + 1);
      const verticalGap = h / (rowNum.value + 1);

      const points1 = Array.from({ length: rowNum.value })
        .fill(0)
        .map((_foo, i) =>
          Array.from({ length: rowPoints.value })
            .fill(0)
            .map((_foo, j) => [horizontalGap * (j + 1), verticalGap * (i + 1)]),
        );

      points.value = points1.reduce((all, item) => [...all, ...item], []);
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
          {points.value.map(point => {
            return (
              <rect
                key={point.join()}
                fill={mergedColor.value[0]}
                x={point[0] - halfPointSideLength.value}
                y={point[1] - halfPointSideLength.value}
                width={pointSideLength.value}
                height={pointSideLength.value}
              >
                {Math.random() > 0.6 ? (
                  <animate
                    attributeName='fill'
                    values={`${mergedColor.value.join(';')}`}
                    dur={`${Math.random() + 1}s`}
                    begin={Math.random() * 2}
                    repeatCount='indefinite'
                  />
                ) : null}
              </rect>
            );
          })}
        </svg>
      );
    };

    const afterAutoResizeMixinInit = () => {
      calcSVGData();
    };

    const calcSVGData = () => {
      calcPointsPosition();

      calcScale();
    };

    const onResize = () => {
      calcSVGData();
    };

    const { width, height } = autoResize(
      customDecoration3,
      onResize,
      afterAutoResizeMixinInit,
    );
    const calcScale = () => {
      const [w, h] = svgWH.value;

      svgScale.value = [width.value / w, height.value / h];
    };

    return {
      ns,
      customDecoration3,
      renderBorder,
    };
  },
  render() {
    return (
      <div ref='customDecoration3' class={this.ns.b()}>
        {this.renderBorder()}
        {this.$slots.default?.()}
      </div>
    );
  },
});
