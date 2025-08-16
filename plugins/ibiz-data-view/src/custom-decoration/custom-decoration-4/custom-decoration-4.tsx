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
} from '../../util';
import './custom-decoration-4.scss';

export const CustomDecoration4 = defineComponent({
  name: 'CustomDecoration4',
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
      default: 1.2,
    },
  },
  setup(props) {
    const ns = useNamespace('custom-decoration-4');
    const defaultColor = [getThemeVar() || '#0095ee', '#95d8f8'];
    const customDecoration4 = ref();
    const width = ref<number>(0);
    const height = ref<number>(0);
    const mergedColor = computed(() => {
      return deepMerge(defaultColor, props.color || []) as string[];
    });
    /**
     * 绘制边框svg
     */
    const renderBorder = () => {
      return (
        <div
          class={`container ${props.reverse ? 'reverse' : 'normal'}`}
          style={
            props.reverse
              ? `width:${width.value}px;height:5px;animation-duration:${props.dur}s`
              : `width:5px;height:${height.value}px;animation-duration:${props.dur}s`
          }
        >
          <svg
            width={props.reverse ? width.value : 5}
            height={props.reverse ? 5 : height.value}
          >
            <polyline
              stroke={mergedColor.value[0]}
              points={
                props.reverse
                  ? `0, 2.5 ${width.value}, 2.5`
                  : `2.5, 0 2.5, ${height.value}`
              }
            />
            <polyline
              class='bold-line'
              stroke={mergedColor.value[1]}
              stroke-width='3'
              stroke-dasharray='20, 80'
              stroke-dashoffset='-30'
              points={
                props.reverse
                  ? `0, 2.5 ${width.value}, 2.5`
                  : `2.5, 0 2.5, ${height.value}`
              }
            />
          </svg>
        </div>
      );
    };
    const initWH = () => {
      nextTick(() => {
        const dom = customDecoration4.value as Element;
        if (dom) {
          width.value = dom.clientWidth;
          height.value = dom.clientHeight;
        }
      });
    };
    onMounted(() => {
      initWH();
      bindDomResizeCallback(customDecoration4.value, initWH);
      window.addEventListener('resize', initWH);
    });
    onUnmounted(() => {
      unbindDomResizeCallback(customDecoration4.value);
      window.removeEventListener('resize', initWH);
    });
    return {
      ns,
      customDecoration4,
      renderBorder,
    };
  },
  render() {
    return (
      <div ref='customDecoration4' class={this.ns.b()}>
        {this.renderBorder()}
        {this.$slots.default?.()}
      </div>
    );
  },
});
