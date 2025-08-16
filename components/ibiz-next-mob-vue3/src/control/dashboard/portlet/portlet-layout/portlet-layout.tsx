import { useNamespace } from '@ibiz-template/vue3-util';
import { computed, defineComponent } from 'vue';
import { IUIActionGroupDetail } from '@ibiz/model-core';
import './portlet-layout.scss';
import { PortletPartController } from '@ibiz-template/runtime';

/**
 * 门户控件布局
 */
export const PortletLayout = defineComponent({
  name: 'IBizPortletLayout',
  props: {
    controller: {
      type: PortletPartController,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('portlet-layout');
    const c = props.controller;
    // 处理标题
    const isShowHeader = computed(() => {
      return (
        (c.model.showTitleBar && (c.model.title || c.model.sysImage)) ||
        c.model.uiactionGroup
      );
    });

    // 点击工具栏处理
    const onActionClick = async (
      detail: IUIActionGroupDetail,
      event: MouseEvent,
    ) => {
      await props.controller.onActionClick(detail, event);
    };

    return { ns, isShowHeader, onActionClick };
  },
  render() {
    const { model, state } = this.$props.controller;
    return (
      <div class={[this.ns.b(), this.ns.is('no-header', !this.isShowHeader)]}>
        {this.isShowHeader && (
          <div key='header' class={this.ns.b('header')}>
            <div class={this.ns.be('header', 'left')}>
              {model.showTitleBar && (
                <div class={this.ns.e('caption')}>
                  <iBizIcon
                    class={this.ns.e('caption-icon')}
                    icon={model.sysImage}
                  ></iBizIcon>
                  <div class={this.ns.e('caption-text')} title={model.title}>
                    {model.title}
                  </div>
                </div>
              )}
            </div>
            <div class={this.ns.be('header', 'right')}>
              {model.uiactionGroup && (
                <iBizActionToolbar
                  class={this.ns.e('toolbar')}
                  action-details={model.uiactionGroup.uiactionGroupDetails}
                  actions-state={state.actionGroupState}
                  onActionClick={this.onActionClick}
                ></iBizActionToolbar>
              )}
            </div>
          </div>
        )}
        <div key='content' class={this.ns.b('content')}>
          {this.$slots.default?.()}
        </div>
      </div>
    );
  },
});
