/* eslint-disable no-else-return */
import { useNamespace } from '@ibiz-template/vue3-util';
import { IPanelButtonList } from '@ibiz/model-core';
import { defineComponent, PropType } from 'vue';
import { PanelButtonListController } from './panel-button-list.controller';
import './panel-button-list.scss';

export const PanelButtonList = defineComponent({
  name: 'IBizPanelButtonList',
  props: {
    modelData: {
      type: Object as PropType<IPanelButtonList>,
      required: true,
    },
    controller: {
      type: PanelButtonListController,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('panel-button-list');

    const c = props.controller;

    const handleClick = async (id: string, e?: MouseEvent): Promise<void> => {
      e?.stopPropagation();
      c.handleClick(id, e);
    };

    return {
      ns,
      handleClick,
    };
  },
  render() {
    const { state } = this.controller;
    if (state.visible) {
      return (
        <iBizButtonList
          class={[this.ns.b(), ...this.controller.containerClass]}
          model={this.modelData}
          disabled={state.disabled}
          buttonsState={state.buttonsState}
          onClick={this.handleClick}
        ></iBizButtonList>
      );
    }
    return null;
  },
});
export default PanelButtonList;
