/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropType, defineComponent } from 'vue';
import { useNamespace } from '../../../use';
import { IBIReportChartController } from '../../../interface';

export default defineComponent({
  name: 'IBizBIReportChartShell',
  props: {
    c: {
      type: Object as PropType<IBIReportChartController>,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('bi-report-chart-shell');

    const controller = props.c;

    // 处理控制器抛出
    const handleControllerAppear = (chartController: IData) => {
      controller.setChartController(chartController);
    };

    return { ns, controller, handleControllerAppear };
  },
  render() {
    if (
      !this.controller.state.isCreated ||
      !this.controller.state.refreshFlag
    ) {
      return null;
    }
    return (
      <iBizChartControl
        modelData={this.controller.state.model}
        context={(this.controller as any).context}
        isSimple={true}
        data={this.controller.state.items}
        onControllerAppear={this.handleControllerAppear}
      ></iBizChartControl>
    );
  },
});
