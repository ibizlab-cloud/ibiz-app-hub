import {
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  nextTick,
  computed,
  PropType,
} from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import {
  deepMerge,
  getThemeVar,
  bindDomResizeCallback,
  unbindDomResizeCallback,
  getPolylineLength,
} from '../../util';
import './custom-decoration-5.scss';

export const CustomDecoration5 = defineComponent({
  name: 'CustomDecoration5',
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
    const ns = useNamespace('custom-decoration-5');
    const defaultColor = [getThemeVar() || '#0095ee', '#95d8f8'];
    const customDecoration5 = ref();
    const width = ref<number>(0);
    const height = ref<number>(0);
    const line1Points = ref('');
    const line2Points = ref('');
    const line1Length = ref(0);
    const line2Length = ref(0);
    const mergedColor = computed(() => {
      return deepMerge(defaultColor, props.color || []) as string[];
    });
    const initParams = () => {
      const tempLine1Points = [
        [0, height.value * 0.2],
        [width.value * 0.18, height.value * 0.2],
        [width.value * 0.2, height.value * 0.4],
        [width.value * 0.25, height.value * 0.4],
        [width.value * 0.27, height.value * 0.6],
        [width.value * 0.72, height.value * 0.6],
        [width.value * 0.75, height.value * 0.4],
        [width.value * 0.8, height.value * 0.4],
        [width.value * 0.82, height.value * 0.2],
        [width.value, height.value * 0.2],
      ];

      const tempLine2Points = [
        [width.value * 0.3, height.value * 0.8],
        [width.value * 0.7, height.value * 0.8],
      ];

      const tempLine1Length = getPolylineLength(tempLine1Points);
      const tempLine2Length = getPolylineLength(tempLine2Points);

      line1Points.value = tempLine1Points
        .map(point => point.join(','))
        .join(' ');
      line2Points.value = tempLine2Points
        .map(point => point.join(','))
        .join(' ');

      line1Length.value = tempLine1Length;
      line2Length.value = tempLine2Length;
    };
    /**
     * 绘制边框svg
     */
    const renderBorder = () => {
      return (
        <svg width={width.value} height={height.value}>
          <polyline
            fill='transparent'
            stroke={mergedColor.value[0]}
            stroke-width='3'
            points={line1Points.value}
          >
            <animate
              attributeName='stroke-dasharray'
              attributeType='XML'
              from={`0, ${line1Length.value / 2}, 0, ${line1Length.value / 2}`}
              to={`0, 0, ${line1Length.value}, 0`}
              dur={`${props.dur}s`}
              begin='0s'
              calcMode='spline'
              keyTimes='0;1'
              keySplines='0.4,1,0.49,0.98'
              repeatCount='indefinite'
            />
          </polyline>
          <polyline
            fill='transparent'
            stroke={mergedColor.value[1]}
            stroke-width='2'
            points={line2Points.value}
          >
            <animate
              attributeName='stroke-dasharray'
              attributeType='XML'
              from={`0, ${line2Length.value / 2}, 0, ${line2Length.value / 2}`}
              to={`0, 0, ${line2Length.value}, 0`}
              dur={`${props.dur}s`}
              begin='0s'
              calcMode='spline'
              keyTimes='0;1'
              keySplines='.4,1,.49,.98'
              repeatCount='indefinite'
            />
          </polyline>
        </svg>
      );
    };
    const initWH = () => {
      nextTick(() => {
        const dom = customDecoration5.value as Element;
        if (dom) {
          width.value = dom.clientWidth;
          height.value = dom.clientHeight;
          initParams();
        }
      });
    };
    onMounted(() => {
      initWH();
      bindDomResizeCallback(customDecoration5.value, initWH);
      window.addEventListener('resize', initWH);
    });
    onUnmounted(() => {
      unbindDomResizeCallback(customDecoration5.value);
      window.removeEventListener('resize', initWH);
    });
    return {
      ns,
      customDecoration5,
      renderBorder,
    };
  },
  render() {
    return (
      <div ref='customDecoration5' class={this.ns.b()}>
        {this.renderBorder()}
        {this.$slots.default?.()}
      </div>
    );
  },
});
