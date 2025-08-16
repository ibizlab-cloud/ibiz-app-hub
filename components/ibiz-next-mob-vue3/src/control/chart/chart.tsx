import { useControlController, useNamespace } from '@ibiz-template/vue3-util';
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  PropType,
  ref,
} from 'vue';
import { IDEChart } from '@ibiz/model-core';
import { init } from 'echarts';
import { ChartController, IControlProvider } from '@ibiz-template/runtime';
import './chart.scss';

const ChartControl = defineComponent({
  name: 'IBizChartControl',
  props: {
    modelData: { type: Object as PropType<IDEChart>, required: true },
    context: { type: Object as PropType<IContext>, required: true },
    params: { type: Object as PropType<IParams>, default: () => ({}) },
    provider: { type: Object as PropType<IControlProvider> },
    mdctrlActiveMode: { type: Number, default: undefined },
    loadDefault: { type: Boolean, default: true },
  },
  setup() {
    const c = useControlController((...args) => new ChartController(...args));
    const ns = useNamespace(`control-${c.model.controlType!.toLowerCase()}`);
    const chartRef = ref();

    // 容器大小变化监听器
    let resizeObserver: ResizeObserver;

    onMounted(() => {
      const chart = init(chartRef.value);
      c.initChart(chart);

      if (chartRef.value && ResizeObserver) {
        resizeObserver = new ResizeObserver(() => {
          c.resizeChart();
        });
        resizeObserver.observe(chartRef.value);
      }
    });

    onBeforeUnmount(() => {
      resizeObserver?.disconnect();
    });

    return {
      c,
      ns,
      chartRef,
    };
  },
  render() {
    return (
      <iBizControlBase controller={this.c}>
        <div ref='chartRef' class={this.ns.e('chart')}></div>
      </iBizControlBase>
    );
  },
});

export default ChartControl;
