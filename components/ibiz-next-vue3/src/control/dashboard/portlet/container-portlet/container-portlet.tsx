import { useNamespace } from '@ibiz-template/vue3-util';
import { defineComponent, PropType, VNode } from 'vue';
import { IDBContainerPortletPart } from '@ibiz/model-core';
import { ContainerPortletController } from '@ibiz-template/runtime';
import './container-portlet.scss';

export const ContainerPortlet = defineComponent({
  name: 'IBizContainerPortlet',
  props: {
    modelData: {
      type: Object as PropType<IDBContainerPortletPart>,
      required: true,
    },
    controller: {
      type: ContainerPortletController,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace(
      `portlet-${props.modelData.portletType?.toLowerCase()}`,
    );
    return { ns };
  },
  render() {
    const defaultSlots: VNode[] = this.$slots.default?.() || [];
    const content = (
      <iBizRow layout={this.modelData.layout}>
        {defaultSlots.map(slot => {
          const props = slot.props as IData;
          if (!props || !props.controller) {
            return slot;
          }
          return (
            <iBizCol
              layoutPos={props.modelData.layoutPos}
              state={props.controller.state}
            >
              {slot}
            </iBizCol>
          );
        })}
      </iBizRow>
    );
    const classArr: string[] = [
      this.ns.b(),
      this.ns.m(this.modelData.codeName),
      ...this.controller.containerClass,
    ];
    return (
      <iBizPortletLayout controller={this.controller} class={classArr}>
        {content}
      </iBizPortletLayout>
    );
  },
});
