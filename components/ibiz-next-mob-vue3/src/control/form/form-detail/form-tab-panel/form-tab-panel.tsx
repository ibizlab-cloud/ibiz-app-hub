import { defineComponent, PropType, VNode } from 'vue';
import { useController, useNamespace } from '@ibiz-template/vue3-util';
import './form-tab-panel.scss';
import { IDEFormTabPanel } from '@ibiz/model-core';
import {
  FormTabPageController,
  FormTabPanelController,
} from '@ibiz-template/runtime';

export const FormTabPanel = defineComponent({
  name: 'IBizFormTabPanel',
  props: {
    modelData: {
      type: Object as PropType<IDEFormTabPanel>,
      required: true,
    },
    controller: {
      type: FormTabPanelController,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('form-tab-panel');
    useController(props.controller);

    const onTabClick = (args: {
      name: string;
      title: string;
      event: MouseEvent;
      disabled: boolean;
    }) => {
      const { name, event } = args;
      props.controller.onTabChange(name);

      // 触发对应FormTabPage的点击事件
      const pageC = props.controller.form.details[
        name
      ] as FormTabPageController;
      if (pageC) {
        pageC.onClick(event);
      }
    };

    return {
      ns,
      onTabClick,
    };
  },
  render() {
    const defaultSlots: VNode[] = this.$slots.default?.() || [];
    return (
      <van-tabs
        class={[
          this.ns.b(),
          this.ns.m(this.modelData.codeName),
          ...this.controller.containerClass,
        ]}
        model-value={this.controller.state.activeTab}
        onClickTab={this.onTabClick}
      >
        {defaultSlots.map(slot => {
          const props = slot.props as IData;
          if (!props || !props.controller) {
            return slot;
          }
          const c = props.controller;
          // 不显示且不用保活时直接不绘制
          if (!c.state.visible && !c.state.keepAlive) {
            return null;
          }
          return (
            <van-tab
              class={this.ns.b('tab-item')}
              title={c.model.caption}
              name={c.model.id}
              title-class={c.labelClass}
              lazy
            >
              {{
                default: () => slot,
                title: () => {
                  return (
                    <span class={this.ns.e('caption')}>
                      {c.model.sysImage && <iBizIcon icon={c.model.sysImage} />}
                      {c.model.showCaption && c.model.caption}
                    </span>
                  );
                },
              }}
            </van-tab>
          );
        })}
      </van-tabs>
    );
  },
});
export default FormTabPanel;
