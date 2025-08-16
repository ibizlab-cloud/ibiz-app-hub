import { useControlController, useNamespace } from '@ibiz-template/vue3-util';
import { defineComponent, PropType } from 'vue';
import { ITabExpPanel } from '@ibiz/model-core';
import {
  IControlProvider,
  TabExpPanelController,
} from '@ibiz-template/runtime';

export const TabExpPanelControl = defineComponent({
  name: 'IBizTabExpPanelControl',
  props: {
    modelData: { type: Object as PropType<ITabExpPanel>, required: true },
    context: { type: Object as PropType<IContext>, required: true },
    params: { type: Object as PropType<IParams>, default: () => ({}) },
    provider: { type: Object as PropType<IControlProvider> },
    defaultTabName: { type: String, required: false },
  },
  setup() {
    const c = useControlController(
      (...args) => new TabExpPanelController(...args),
    );
    const ns = useNamespace(`control-${c.model.controlType!.toLowerCase()}`);
    const onTabChange = (value: string) => {
      c.state.activeName = value;
      c.handleTabChange();
    };

    return {
      c,
      ns,
      onTabChange,
    };
  },
  render() {
    const { isCreated, tabPages } = this.c.state;
    return (
      isCreated && (
        <van-tabs
          class={[this.ns.b('header')]}
          active={this.c.state.activeName}
          onChange={this.onTabChange}
        >
          {tabPages.map(page => {
            return <van-tab title={page.caption} name={page.tabTag}></van-tab>;
          })}
        </van-tabs>
      )
    );
  },
});
