import { useControlController, useNamespace } from '@ibiz-template/vue3-util';
import { defineComponent, h, PropType, resolveComponent } from 'vue';
import { IAppDEGridView, IDEPickupViewPanel } from '@ibiz/model-core';
import {
  EventBase,
  IControlProvider,
  IPickupGridViewEvent,
  IPickupGridViewState,
  IViewController,
  PickupViewPanelController,
} from '@ibiz-template/runtime';
import './pickup-view-panel.scss';

export const PickupViewPanelControl = defineComponent({
  name: 'IBizPickupViewPanelControl',
  props: {
    modelData: { type: Object as PropType<IDEPickupViewPanel>, required: true },
    context: { type: Object as PropType<IContext>, required: true },
    params: { type: Object as PropType<IParams>, default: () => ({}) },
    singleSelect: { type: Boolean, default: true },
    provider: { type: Object as PropType<IControlProvider> },
    selectedData: { type: Object as PropType<IData[]>, required: false },
  },
  setup() {
    const c = useControlController(
      (...args) => new PickupViewPanelController(...args),
    );
    const ns = useNamespace(`control-${c.model.controlType!.toLowerCase()}`);

    const onCreated = (event: EventBase) => {
      c.setEmbedView(
        event.view as IViewController<
          IAppDEGridView,
          IPickupGridViewState,
          IPickupGridViewEvent
        >,
      );
    };

    return {
      c,
      ns,
      onCreated,
    };
  },
  render() {
    return (
      <iBizControlBase controller={this.c}>
        {this.c.state.isCreated &&
          (this.$slots.default
            ? this.$slots.default({
                context: this.c.state.context,
                params: this.c.state.params,
                state: {
                  singleSelect: this.c.state.singleSelect,
                  selectedData: this.selectedData,
                },
                onCreated: this.onCreated,
              })
            : h(resolveComponent('IBizViewShell'), {
                context: this.c.state.context,
                params: this.c.state.params,
                viewId: this.c.model.embeddedAppDEViewId,
                state: {
                  singleSelect: this.c.state.singleSelect,
                  selectedData: this.selectedData,
                },
                onCreated: this.onCreated,
              }))}
      </iBizControlBase>
    );
  },
});
