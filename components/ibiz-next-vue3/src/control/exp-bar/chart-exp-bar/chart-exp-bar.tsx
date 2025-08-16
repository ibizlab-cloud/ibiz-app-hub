import { useControlController, useNamespace } from '@ibiz-template/vue3-util';
import { defineComponent, PropType, VNode } from 'vue';
import { IChartExpBar } from '@ibiz/model-core';
import './chart-exp-bar.scss';
import {
  ChartExpBarController,
  IControlProvider,
} from '@ibiz-template/runtime';
import { useExpBarRender, useWatchRouteChange } from '../render-util';

export const ChartExpBarControl = defineComponent({
  name: 'IBizChartExpBarControl',
  props: {
    /**
     * @description 图表导航栏模型数据
     */
    modelData: { type: Object as PropType<IChartExpBar>, required: true },
    /**
     * @description 应用上下文对象
     */
    context: { type: Object as PropType<IContext>, required: true },
    /**
     * @description 视图参数对象
     * @default {}
     */
    params: { type: Object as PropType<IParams>, default: () => ({}) },
    /**
     * @description 部件适配器
     */
    provider: { type: Object as PropType<IControlProvider> },
    /**
     * @description 导航数据
     */
    srfnav: { type: String, required: false },
    /**
     * @description 是否默认加载数据
     * @default true
     */
    loadDefault: { type: Boolean, default: true },
  },
  setup() {
    const c = useControlController(
      (...args) => new ChartExpBarController(...args),
    );
    const ns = useNamespace(`control-${c.model.controlType!.toLowerCase()}`);

    const { renderTitle, renderSearchBar } = useExpBarRender(c, ns);
    useWatchRouteChange(c);

    return {
      c,
      ns,
      renderTitle,
      renderSearchBar,
    };
  },
  render() {
    const { isCreated } = this.c.state;
    const { XDataModel } = this.c;

    const slots: IData = {
      captionbar: this.renderTitle,
      searchbar: this.renderSearchBar,
    };
    if (isCreated) {
      if (XDataModel) {
        const key = this.c.controlPanel ? XDataModel.name! : 'default';
        slots[key] = (): VNode => {
          return (
            <iBizControlShell
              context={this.c.context}
              params={this.c.params}
              modelData={XDataModel}
              singleSelect={true}
              mdctrlActiveMode={1}
              loadDefault={false}
            ></iBizControlShell>
          );
        };
      }
    }

    return <iBizControlBase controller={this.c}>{slots}</iBizControlBase>;
  },
});
