import { useNamespace } from '@ibiz-template/vue3-util';
import { defineComponent, PropType } from 'vue';
import { IAppMenu, IDBAppMenuPortletPart } from '@ibiz/model-core';
import { ControlType, MenuPortletController } from '@ibiz-template/runtime';

export const MenuPortlet = defineComponent({
  name: 'IBizMenuPortlet',
  props: {
    modelData: {
      type: Object as PropType<IDBAppMenuPortletPart>,
      required: true,
    },
    controller: {
      type: MenuPortletController,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace(
      `portlet-${props.modelData.portletType?.toLowerCase()}`,
    );
    const menu: IAppMenu | undefined = props.modelData.controls?.find(item => {
      return item.controlType === ControlType.APP_MENU;
    });
    return { ns, menu };
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
        {this.menu && (
          <iBizAppMenuPortletControl
            modelData={this.menu}
            context={context}
            params={params}
          ></iBizAppMenuPortletControl>
        )}
      </iBizPortletLayout>
    );
  },
});
