import { FormButtonListController } from '@ibiz-template/runtime';
import { useNamespace } from '@ibiz-template/vue3-util';
import { IDEFormButtonList } from '@ibiz/model-core';
import { defineComponent, PropType } from 'vue';
import './form-button-list.scss';

export const FormButtonList = defineComponent({
  name: 'IBizFormButtonList',
  props: {
    modelData: {
      type: Object as PropType<IDEFormButtonList>,
      required: true,
    },
    controller: {
      type: FormButtonListController,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('form-button-list');

    const c = props.controller;

    // 是否处于设计预览状态
    const isDesignPreview = c.context?.srfrunmode === 'DESIGN';

    const handleClick = async (id: string, e?: MouseEvent): Promise<void> => {
      e?.stopPropagation();
      if (isDesignPreview) return;
      c.handleClick(id, e);
    };

    return { ns, handleClick };
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
export default FormButtonList;
