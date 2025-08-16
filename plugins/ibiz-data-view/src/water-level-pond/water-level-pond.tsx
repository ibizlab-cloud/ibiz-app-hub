import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue';
import {
  getEditorEmits,
  getSliderProps,
  useNamespace,
} from '@ibiz-template/vue3-util';
import { listenJSEvent, NOOP } from '@ibiz-template/core';
import { WaterLevelPondController } from './water-level-pond.controller';
import './water-level-pond.scss';

export const WaterLevelPond = defineComponent({
  name: 'WaterLevelPond',
  // @ts-ignore
  props: getSliderProps<WaterLevelPondController>(),
  emits: getEditorEmits(),
  setup(props) {
    const ns = useNamespace('water-level-pond');

    const c = props.controller;

    let cleanup = NOOP;

    const canvas = ref(null);

    const curValue = computed(() => {
      let value: number = Number(props.value);
      if (c.maxItem) {
        value /= Number(props.data[c.maxItem]);
      }
      if (c.valueFormat) {
        return ibiz.util.text.format(value.toString(), c.valueFormat);
      }
      return value;
    });

    watch(
      () => props.value,
      () => {
        let value: number = Number(props.value);
        if (c.maxItem) {
          value /= Number(props.data[c.maxItem]);
        }
        c.setDate(value);
      },
      { immediate: true },
    );

    onMounted(() => {
      if (canvas.value) {
        c.drawCanvas(canvas.value);
      }
      cleanup = listenJSEvent(window, 'resize', () => {
        c.refresh();
      });
    });

    // 组件销毁前销毁监听
    onBeforeUnmount(() => {
      if (cleanup !== NOOP) {
        cleanup();
      }
      c.cancelAnimation();
    });

    return {
      ns,
      canvas,
      curValue,
    };
  },
  render() {
    return (
      <div class={[this.ns.b()]}>
        <div class={this.ns.e('value')}>{this.curValue}</div>
        <canvas ref='canvas'></canvas>
      </div>
    );
  },
});
