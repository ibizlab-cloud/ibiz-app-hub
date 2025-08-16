/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
import { useNamespace } from '@ibiz-template/vue3-util';
import { notNilEmpty } from 'qx-util';
import { h, resolveComponent, defineComponent, PropType, ref, Ref } from 'vue';
import {
  IControl,
  IDashboard,
  IDBContainerPortletPart,
  IDBPortletPart,
} from '@ibiz/model-core';
import { IControlProvider } from '@ibiz-template/runtime';
import './screen-dashboard.scss';
import { clone } from 'ramda';

export const ScreenDashboard = defineComponent({
  name: 'ScreenDashboard',
  props: {
    modelData: {
      type: Object as PropType<IDashboard>,
      required: true,
    },
    context: { type: Object as PropType<IContext>, required: true },
    params: { type: Object as PropType<IParams>, default: () => ({}) },
    provider: { type: Object as PropType<IControlProvider> },
  },
  setup(props) {
    const ns = useNamespace(`screen-dashboard`);

    const tempModelData: Ref<IDashboard> = ref(props.modelData);

    const setPortletPlugin = (controls: IDBPortletPart[]) => {
      controls.map(control => {
        if (control.controlType === 'PORTLET') {
          control.sysPFPluginId = control.sysPFPluginId || 'screen';
          if (
            control.portletType === 'CONTAINER' &&
            (control as IDBContainerPortletPart).controls
          ) {
            setPortletPlugin((control as IDBContainerPortletPart).controls!);
          }
        }
      });
    };

    const { ctrlParams = {} } = props.modelData.controlParam || {};
    if (ctrlParams.SCREENMODE !== 'false') {
      tempModelData.value = clone(props.modelData);
      if (tempModelData.value.controls) {
        setPortletPlugin(tempModelData.value.controls);
      }
    }

    return {
      ns,
      tempModelData,
    };
  },

  render() {
    const component = resolveComponent('IBizDashboardControl');
    const content = h(component, {
      modelData: this.tempModelData,
      context: this.context,
      params: this.params,
      provider: this.provider,
    });
    return <div class={[this.ns.b()]}>{content}</div>;
  },
});
