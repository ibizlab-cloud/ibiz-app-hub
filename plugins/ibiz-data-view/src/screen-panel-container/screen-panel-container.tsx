import { IPanelContainer } from '@ibiz/model-core';
import { useNamespace } from '@ibiz-template/vue3-util';
import { defineComponent, h, PropType, resolveComponent, VNode } from 'vue';
import { ScreenPanelContainerController } from './screen-panel-container.controller';
import './screen-panel-container.scss';

export const ScreenPanelContainer = defineComponent({
  name: 'ScreenPanelContainer',
  props: {
    modelData: {
      type: Object as PropType<IPanelContainer>,
      required: true,
    },
    controller: {
      type: ScreenPanelContainerController,
      required: true,
    },
  },
  setup() {
    const ns = useNamespace('screen-panel-container');

    return { ns };
  },
  render() {
    const component = resolveComponent('IBizPanelContainer');
    const defaultSlots: VNode[] = this.$slots.default?.() || [];
    const content = h(
      component,
      {
        modelData: this.modelData,
        controller: this.controller,
      },
      defaultSlots,
    );
    if (this.controller.borderStyle) {
      const borderDiv = resolveComponent(this.controller.borderStyle);
      return h(
        borderDiv,
        {
          class: [this.ns.b()],
        },
        content,
      );
    }
    return <div class={this.ns.b()}>{content}</div>;
  },
});
