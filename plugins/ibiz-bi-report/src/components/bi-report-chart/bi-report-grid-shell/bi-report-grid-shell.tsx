/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropType, VNode, defineComponent } from 'vue';
import { useNamespace } from '../../../use';
import { IBIReportGridController } from '../../../interface';
import './bi-report-grid-shell.scss';

export default defineComponent({
  name: 'IBizBIReportGridShell',
  props: {
    c: {
      type: Object as PropType<IBIReportGridController>,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('bi-report-grid');

    const controller = props.c;

    // 处理控制器抛出
    const handleControllerAppear = (chartController: IData) => {
      controller.setChartController(chartController);
    };

    const renderNoData = (): VNode | null => {
      return (
        <iBizNoData
          text={ibiz.i18n.t('control.common.currentNoData')}
        ></iBizNoData>
      );
    };

    return { ns, controller, handleControllerAppear, renderNoData };
  },
  render() {
    if (
      !this.controller.state.isCreated ||
      !this.controller.state.refreshFlag
    ) {
      return null;
    }
    const { vars, classList = [] } = this.controller.state.style;
    const { degridColumns = [] } = this.controller.state.model;
    if (degridColumns.length === 0) {
      return this.renderNoData();
    }

    return (
      <iBizGridControl
        modelData={this.controller.state.model}
        context={(this.controller as any).context}
        isSimple={true}
        style={vars}
        class={[...classList, this.ns.b()]}
        data={this.controller.state.tableData}
        onControllerAppear={this.handleControllerAppear}
        {...this.controller.state.attrs}
      ></iBizGridControl>
    );
  },
});
