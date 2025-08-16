import {
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  nextTick,
  computed,
  PropType,
  watch,
} from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import {
  deepMerge,
  getThemeVar,
  bindDomResizeCallback,
  unbindDomResizeCallback,
} from '../../util';
import './custom-decoration-2.scss';

export const CustomDecoration2 = defineComponent({
  name: 'CustomDecoration2',
  props: {
    color: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    reverse: {
      type: Boolean,
      default: false,
    },
    dur: {
      type: Number,
      default: 2,
    },
  },
  setup(props) {
    const ns = useNamespace('custom-decoration-2');
    const defaultColor = [getThemeVar() || '#0095ee', '#95d8f8'];
    const customDecoration2 = ref();

    const x = ref<number>(0);
    const y = ref<number>(0);
    const w = ref<number>(0);
    const h = ref<number>(0);

    const width = ref<number>(0);
    const height = ref<number>(0);
    const mergedColor = computed(() => {
      return deepMerge(defaultColor, props.color || []) as string[];
    });

    const calcSVGData = () => {
      if (props.reverse) {
        w.value = 1;
        h.value = height.value;
        x.value = width.value / 2;
        y.value = 0;
      } else {
        w.value = width.value;
        h.value = 1;
        x.value = 0;
        y.value = height.value / 2;
      }
    };

    watch(
      () => props.reverse,
      () => {
        calcSVGData();
      },
      { immediate: true },
    );
    /**
     * 绘制边框svg
     */
    const renderBorder = () => {
      return (
        <svg width={`${width.value}px`} height={`${height.value}px`}>
          <rect
            x={x.value}
            y={y.value}
            width={w.value}
            height={h.value}
            fill={mergedColor.value[0]}
          >
            <animate
              attributeName={props.reverse ? 'height' : 'width'}
              from='0'
              to={props.reverse ? height.value : width.value}
              dur={`${props.dur}s`}
              calcMode='spline'
              keyTimes='0;1'
              keySplines='.42,0,.58,1'
              repeatCount='indefinite'
            />
          </rect>

          <rect
            x={x.value}
            y={y.value}
            width='1'
            height='1'
            fill={mergedColor.value[1]}
          >
            <animate
              attributeName={props.reverse ? 'y' : 'x'}
              from='0'
              to={props.reverse ? height.value : width.value}
              dur={`${props.dur}s`}
              calcMode='spline'
              keyTimes='0;1'
              keySplines='0.42,0,0.58,1'
              repeatCount='indefinite'
            />
          </rect>
        </svg>
      );
    };
    const initWH = () => {
      nextTick(() => {
        const dom = customDecoration2.value as Element;
        if (dom) {
          width.value = dom.clientWidth;
          height.value = dom.clientHeight;
        }
      });
    };
    onMounted(() => {
      initWH();
      bindDomResizeCallback(customDecoration2.value, initWH);
      window.addEventListener('resize', initWH);
    });
    onUnmounted(() => {
      unbindDomResizeCallback(customDecoration2.value);
      window.removeEventListener('resize', initWH);
    });
    return {
      ns,
      customDecoration2,
      renderBorder,
    };
  },
  render() {
    return (
      <div ref='customDecoration2' class={this.ns.b()}>
        {this.renderBorder()}
        {this.$slots.default?.()}
      </div>
    );
  },
});
