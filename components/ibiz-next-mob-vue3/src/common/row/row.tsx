import { useNamespace } from '@ibiz-template/vue3-util';
import { IFlexLayout, ILayout } from '@ibiz/model-core';
import { defineComponent, PropType } from 'vue';

export const IBizRow = defineComponent({
  name: 'IBizRow',
  props: {
    layout: Object as PropType<ILayout>,
  },
  setup() {
    const ns = useNamespace('row');
    return { ns };
  },
  render() {
    const defaultSlot = this.$slots.default?.();
    if (this.layout?.layout === 'FLEX') {
      const { dir, align, valign } = this.layout as IFlexLayout;
      const _dir = dir || 'column';
      return (
        <div
          class={[this.ns.b(), this.ns.m('flex')]}
          style={`display:flex;flex-direction: ${_dir};justify-content: ${align};align-items: ${valign};`}
        >
          {defaultSlot}
        </div>
      );
    }
    return (
      <van-row class={[this.ns.b(), this.ns.m('grid')]}>{defaultSlot}</van-row>
    );
  },
});
