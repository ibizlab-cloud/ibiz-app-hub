import { IPanelRawItem, IUIActionGroupDetail } from '@ibiz/model-core';
import { PropType, defineComponent } from 'vue';
import { UIActionUtil } from '@ibiz-template/runtime';
import { useNamespace } from '../../use';
import { BIReportPanelController } from './bi-report-panel.controller';
import './bi-report-panel.scss';

export default defineComponent({
  name: 'BIReportPanel',
  props: {
    modelData: {
      type: Object as PropType<IPanelRawItem>,
      required: true,
    },
    controller: {
      type: BIReportPanelController,
      required: true,
    },
  },
  setup(prop) {
    const ns = useNamespace('bi-report-panel');
    const c = prop.controller;

    const onActionClick = async ({
      detail,
      item,
      event,
    }: {
      detail: IUIActionGroupDetail;
      item: IData;
      event: MouseEvent;
    }) => {
      const params = { ...c.panel.params };
      const actionId = detail.uiactionId;
      await UIActionUtil.execAndResolved(
        actionId!,
        {
          context: c.context,
          params,
          data: [item],
          view: c.panel.view,
          event,
        },
        detail.appId,
      );
    };

    return {
      ns,
      c,
      onActionClick,
    };
  },
  render() {
    return (
      <div class={this.ns.b()}>
        <iBizBIReportDesign
          context={this.c.context}
          params={this.c.panel.params}
          config={this.c.config}
          measureToolbar={this.c.measureToolbar}
          dimensionToolbar={this.c.dimensionToolbar}
          dismiss={() => {
            window.history.back();
          }}
          onActionClick={this.onActionClick}
        ></iBizBIReportDesign>
      </div>
    );
  },
});
