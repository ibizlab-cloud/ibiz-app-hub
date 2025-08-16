import { useNamespace } from '@ibiz-template/vue3-util';
import { defineComponent, h, PropType, resolveComponent } from 'vue';
import { IDBAppViewPortletPart } from '@ibiz/model-core';
import { ViewPortletController } from '@ibiz-template/runtime';

export const ViewPortlet = defineComponent({
  name: 'IBizViewPortlet',
  props: {
    modelData: {
      type: Object as PropType<IDBAppViewPortletPart>,
      required: true,
    },
    controller: {
      type: ViewPortletController,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace(
      `portlet-${props.modelData.portletType?.toLowerCase()}`,
    );
    const view = props.modelData.portletAppView;
    return { ns, view };
  },

  render() {
    const classArr: string[] = [
      this.ns.b(),
      this.ns.m(this.modelData.codeName),
      ...this.controller.containerClass,
    ];
    const { context, params } = this.controller;
    return (
      <iBizPortletLayout controller={this.controller} class={classArr}>
        {h(resolveComponent('IBizViewShell'), {
          context,
          params,
          modelData: this.view,
        })}
      </iBizPortletLayout>
    );
  },
});
