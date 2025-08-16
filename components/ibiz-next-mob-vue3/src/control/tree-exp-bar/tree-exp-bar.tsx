import { PropType, VNode, computed, defineComponent } from 'vue';
import { ITreeExpBar } from '@ibiz/model-core';
import { IControlProvider, TreeExpBarController } from '@ibiz-template/runtime';
import { useControlController, useNamespace } from '@ibiz-template/vue3-util';
import { useExpBarRender, useWatchRouteChange } from './render-util';
import './tree-exp-bar.scss';

export const TreeExpBarControl = defineComponent({
  name: 'IBizTreeExpBarControl',
  props: {
    modelData: { type: Object as PropType<ITreeExpBar>, required: true },
    context: { type: Object as PropType<IContext>, required: true },
    params: { type: Object as PropType<IParams>, default: () => ({}) },
    provider: { type: Object as PropType<IControlProvider> },
    srfnav: { type: String, required: false },
    noNeedNavView: { type: Boolean, required: false },
    loadDefault: { type: Boolean, default: true },
  },
  setup() {
    const c = useControlController(
      (...args) => new TreeExpBarController(...args),
    );
    const ns = useNamespace(`control-${c.model.controlType!.toLowerCase()}`);

    const { renderTitle, renderSearchBar } = useExpBarRender(c, ns);
    useWatchRouteChange(c);

    const navigational = computed(() => {
      return (
        c.view.model.viewType &&
        !['DEMOBMPICKUPVIEW', 'DEMOBPICKUPVIEW'].includes(c.view.model.viewType)
      );
    });

    return {
      c,
      ns,
      navigational,
      renderTitle,
      renderSearchBar,
    };
  },
  render() {
    const { state, XDataModel } = this.c;
    const { isCreated } = state;

    const slots: IData = {
      captionbar: this.renderTitle,
      searchbar: this.renderSearchBar,
    };
    if (isCreated) {
      if (XDataModel) {
        const key = this.c.controlPanel ? XDataModel.name! : 'default';
        // 树自己绘制，要传递额外的参数
        slots[key] = (): VNode => {
          return (
            <iBizControlShell
              context={this.c.context}
              params={this.c.params}
              modelData={XDataModel}
              singleSelect={true}
              navigational={this.navigational}
              mdctrlActiveMode={1}
              loadDefault={false}
              default-expanded-keys={this.c.defaultExpandedKeys}
            ></iBizControlShell>
          );
        };
      }
    }
    return <iBizControlBase controller={this.c}>{slots}</iBizControlBase>;
  },
});
