import { PropType, defineComponent } from 'vue';
import { IDEToolbar, IUIActionGroupDetail } from '@ibiz/model-core';
import './bi-report-design.scss';
import BIReportSelect from '../bi-report-select/bi-report-select';
import BIReportProperty from '../bi-report-property/bi-report-property';
import BIReportContent from '../bi-report-content/bi-report-content';
import { useBIReportDesignController, useNamespace } from '../../use';
import { BIReportDesignController } from '../../controller';
import {
  ChartType,
  IBIReportChartController,
  IChartConfig,
} from '../../interface';
import BIContentCaption from './content-caption/content-caption';
import BIDesignHeader from './design-header/design-header';
/** BI报表设计组件 */
export default defineComponent({
  name: 'IBizBIReportDesign',
  components: {
    'bi-report-select': BIReportSelect,
    'bi-report-property': BIReportProperty,
    'bi-report-content': BIReportContent,
    'bi-content-caption': BIContentCaption,
    'bi-design-header': BIDesignHeader,
  },
  props: {
    context: {
      type: Object as PropType<IContext>,
      require: true,
    },
    viewParams: {
      type: Object as PropType<IParams>,
      require: true,
    },
    dismiss: {
      type: Object as PropType<Function>,
    },
    config: {
      type: Object as PropType<IChartConfig>,
      default: () => {
        return { reportTag: 'bi_report', selectChartType: 'NUMBER' };
      },
    },
    measureToolbar: {
      type: Object as PropType<IDEToolbar>,
    },
    dimensionToolbar: {
      type: Object as PropType<IDEToolbar>,
    },
  },
  emit: ['action-click'],
  setup(props, { emit }) {
    const ns = useNamespace(`bi-report-design`);
    const c = useBIReportDesignController(
      (...args) => new BIReportDesignController(...args),
    );

    const handleReportChartChange = (
      reportChart: IBIReportChartController | undefined,
    ) => {
      c.setReportChart(reportChart);
    };

    const handleReportChartTypeChange = (tag: ChartType) => {
      c.switchReportType(tag);
    };

    c.evt.on(
      'onActionClick',
      ({
        detail,
        item,
        event,
      }: {
        detail: IUIActionGroupDetail;
        item: IData;
        event: MouseEvent;
      }) => {
        emit('action-click', {
          detail,
          item,
          event,
        });
      },
    );

    return {
      ns,
      c,
      handleReportChartChange,
      handleReportChartTypeChange,
    };
  },
  render() {
    return (
      <div class={this.ns.b('container')} v-loading={!this.c.state.isCreated}>
        {this.c.state.isCreated && [
          <div class={this.ns.be('container', 'header')}>
            <bi-design-header controller={this.c}></bi-design-header>
          </div>,
          <div class={this.ns.be('container', 'design-area')}>
            <div class={this.ns.b('sidebar')}>
              <bi-report-select controller={this.c} />
              <bi-report-property
                controller={this.c}
                onReportChartTypeChange={this.handleReportChartTypeChange}
              />
            </div>
            <div class={this.ns.b('content')}>
              <bi-content-caption
                controller={this.c}
                config={this.config}
              ></bi-content-caption>
              {this.c.state.reportModel && (
                <bi-report-content
                  mode={'DESIGN'}
                  context={this.c.context}
                  viewParams={this.c.viewParams}
                  controller={this.c}
                  config={this.c.state.reportModel}
                  onReportChartChange={this.handleReportChartChange}
                />
              )}
            </div>
          </div>,
        ]}
      </div>
    );
  },
});
