/* eslint-disable no-use-before-define */
import { defineComponent, ref, computed, PropType } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { deepMerge, getThemeVar, autoResize } from '../../util';
import './custom-decoration-1.scss';

export const CustomDecoration1 = defineComponent({
  name: 'CustomDecoration1',
  props: {
    color: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  setup(props) {
    const ns = useNamespace('custom-decoration-1');
    const customDecoration1 = ref();
    const svgWH = ref<[number, number]>([20, 50]);
    const rowNum = ref<number>(4);
    const rowPoints = ref<number>(20);

    const pointSideLength = ref<number>(2.5);
    const halfPointSideLength = ref<number>(pointSideLength.value / 2);
    const defaultColor = [getThemeVar() || '#0095ee', '#95d8f8'];

    const mergedColor = computed(() => {
      return deepMerge(defaultColor, props.color || []) as string[];
    });

    const rects = ref<number[][]>([]);
    const points = ref<number[][]>([]);
    const svgScale = ref([1, 1]);

    const calcPointsPosition = () => {
      const [w, h] = svgWH.value;
      const horizontalGap = w / (rowPoints.value + 1);
      const verticalGap = h / (rowNum.value + 1);
      const newPoints = Array.from({ length: rowNum.value })
        .fill(0)
        .map((_foo, i) =>
          Array.from({ length: rowPoints.value })
            .fill(0)
            .map((foo, j) => [horizontalGap * (j + 1), verticalGap * (i + 1)]),
        );

      points.value = newPoints.reduce((all, item) => [...all, ...item], []);
    };

    const calcRectsPosition = () => {
      const rect1 = points.value[rowPoints.value * 2 - 1];
      const rect2 = points.value[rowPoints.value * 2 - 3];
      rects.value = [rect1, rect2];
    };

    const onResize = () => {
      calcSVGData();
    };

    const afterAutoResizeMixinInit = () => {
      calcSVGData();
    };

    const { width, height } = autoResize(
      customDecoration1,
      onResize,
      afterAutoResizeMixinInit,
    );

    const calcScale = () => {
      const [w, h] = svgWH.value;
      svgScale.value = [width.value / w, height.value / h];
    };

    const calcSVGData = () => {
      calcPointsPosition();
      calcRectsPosition();
      calcScale();
    };

    /**
     * 绘制边框svg
     */
    const renderBorder = () => {
      return (
        <svg
          width={`${svgWH.value[0]}px`}
          height={`${svgWH.value[1]}px`}
          style={`transform:scale(${svgScale.value[0]}, ${svgScale.value[1]});`}
        >
          {points.value.map(point => {
            if (Math.random() > 0.6) {
              return (
                <rect
                  key={point.join(',')}
                  fill={mergedColor.value[0]}
                  x={point[0] - halfPointSideLength.value}
                  y={point[1] - halfPointSideLength.value}
                  width={pointSideLength.value}
                  height={pointSideLength.value}
                >
                  {Math.random() > 0.6 ? (
                    <animate
                      attributeName='fill'
                      values={`${mergedColor.value[0]};transparent`}
                      dur={'1s'}
                      begin={Math.random() * 2}
                      repeatCount='indefinite'
                    />
                  ) : null}
                </rect>
              );
            }
            return null;
          })}
          {rects.value[0] ? (
            <rect
              fill={mergedColor.value[1]}
              x={rects.value[0][0] - pointSideLength.value}
              y={rects.value[0][1] - pointSideLength.value}
              width={pointSideLength.value * 2}
              height={pointSideLength.value * 2}
            >
              <animate
                attributeName='width'
                values={`0;${pointSideLength.value * 2}`}
                dur='2s'
                repeatCount='indefinite'
              />
              <animate
                attributeName='height'
                values={`0;${pointSideLength.value * 2}`}
                dur='2s'
                repeatCount='indefinite'
              />
              <animate
                attributeName='x'
                values={`${rects.value[0][0]};${rects.value[0][0] - pointSideLength.value}`}
                dur='2s'
                repeatCount='indefinite'
              />
              <animate
                attributeName='y'
                values={`${rects.value[0][1]};${rects.value[0][1] - pointSideLength.value}`}
                dur='2s'
                repeatCount='indefinite'
              />
            </rect>
          ) : null}
          {rects.value[1] ? (
            <rect
              fill={mergedColor.value[1]}
              x={rects.value[1][0] - 40}
              y={rects.value[1][1] - pointSideLength.value}
              width={40}
              height={pointSideLength.value * 2}
            >
              <animate
                attributeName='width'
                values='0;40;0'
                dur='2s'
                repeatCount='indefinite'
              />
              <animate
                attributeName='x'
                values={`${rects.value[1][0]};${rects.value[1][0] - 40};${rects.value[1][0]}`}
                dur='2s'
                repeatCount='indefinite'
              />
            </rect>
          ) : null}
        </svg>
      );
    };

    return {
      ns,
      customDecoration1,
      renderBorder,
    };
  },
  render() {
    return (
      <div ref='customDecoration1' class={this.ns.b()}>
        {this.renderBorder()}
        {this.$slots.default?.()}
      </div>
    );
  },
});
