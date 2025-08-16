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
  fade,
  deepMerge,
  getThemeVar,
  bindDomResizeCallback,
  unbindDomResizeCallback,
} from '../../util';
import './custom-decoration-11.scss';

export const CustomDecoration11 = defineComponent({
  name: 'CustomDecoration11',
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
    const ns = useNamespace('custom-decoration-11');
    const defaultColor = [getThemeVar() || '#0095ee', '#95d8f8'];
    const customDecoration5 = ref();
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
        <svg
          class={[ns.em('border-svg', 'container')]}
          width={width.value}
          height={height.value}
        >
          <polygon
            fill={fade(mergedColor.value[1] || defaultColor[1], 10) || ''}
            stroke={mergedColor.value[1]}
            points={`20 10, 25 4, 55 4 60 10`}
          />

          <polygon
            fill={fade(mergedColor.value[1] || defaultColor[1], 10) || ''}
            stroke={mergedColor.value[1]}
            points={`20 ${height.value - 10}, 25 ${height.value - 4}, 55 ${
              height.value - 4
            } 60 ${height.value - 10}`}
          />

          <polygon
            fill={fade(mergedColor.value[1] || defaultColor[1], 10) || ''}
            stroke={mergedColor.value[1]}
            points={`${width.value - 20} 10, ${width.value - 25} 4, ${
              width.value - 55
            } 4 ${width.value - 60} 10`}
          />

          <polygon
            fill={fade(mergedColor.value[1] || defaultColor[1], 10) || ''}
            stroke={mergedColor.value[1]}
            points={`${width.value - 20} ${height.value - 10}, ${
              width.value - 25
            } ${height.value - 4}, ${width.value - 55} ${height.value - 4} ${
              width.value - 60
            } ${height.value - 10}`}
          />

          <polygon
            fill={fade(mergedColor.value[0] || defaultColor[0], 20) || ''}
            stroke={mergedColor.value[0]}
            points={`
          20 10, 5 ${height.value / 2} 20 ${height.value - 10}
          ${width.value - 20} ${height.value - 10} ${width.value - 5} ${
            height.value / 2
          } ${width.value - 20} 10
        `}
          />

          <polyline
            fill='transparent'
            stroke={fade(mergedColor.value[0] || defaultColor[0], 70) || ''}
            points={`25 18, 15 ${height.value / 2} 25 ${height.value - 18}`}
          />

          <polyline
            fill='transparent'
            stroke={fade(mergedColor.value[0] || defaultColor[0], 70) || ''}
            points={`${width.value - 25} 18, ${width.value - 15} ${
              height.value / 2
            } ${width.value - 25} ${height.value - 18}`}
          />
        </svg>
      );
    };
    const initWH = () => {
      nextTick(() => {
        const dom = customDecoration5.value as Element;
        if (dom) {
          width.value = dom.clientWidth;
          height.value = dom.clientHeight;
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
        <div class={this.ns.e('decoration-content')}>
          {this.$slots.default?.()}
        </div>
      </div>
    );
  },
});
