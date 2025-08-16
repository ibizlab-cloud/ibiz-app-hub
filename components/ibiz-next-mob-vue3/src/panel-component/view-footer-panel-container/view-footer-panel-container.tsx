import {
  useNamespace,
  PanelContainerController,
} from '@ibiz-template/vue3-util';
import { IPanelContainer } from '@ibiz/model-core';
import { PropType, defineComponent, computed } from 'vue';
import './view-footer-panel-container.scss';

export const ViewFooterPanelContainer = defineComponent({
  name: 'IBizViewFooterPanelContainer',
  props: {
    modelData: {
      type: Object as PropType<IPanelContainer>,
      required: true,
    },
    controller: {
      type: PanelContainerController,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('view-footer');
    const { id } = props.modelData;
    const classArr = computed(() => {
      let result: Array<string | false> = [ns.b(), ns.m(id)];
      result = [
        ...result,
        ...props.controller.containerClass,
        ns.is('hidden', !props.controller.state.visible),
      ];
      return result;
    });
    return { ns, classArr };
  },
  render() {
    if (this.controller.state.visible === false) {
      return;
    }
    const defaultSlots = this.$slots.default?.() || [];
    return (
      <iBizRow class={this.classArr} layout={this.modelData.layout}>
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
    // );
  },
});
