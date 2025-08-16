import { useNamespace } from '@ibiz-template/vue3-util';
import { defineComponent, PropType, Ref, ref, VNode } from 'vue';
import {
  IDETBGroupItem,
  IDETBUIActionItem,
  IDEToolbar,
  IDEToolbarItem,
} from '@ibiz/model-core';
import { IExtraButton, ToolbarController } from '@ibiz-template/runtime';
import './popper-toolbar.scss';

export const IBizPopperToolbar = defineComponent({
  name: 'IBizPopperToolbar',
  props: {
    modelData: { type: Object as PropType<IDEToolbar>, required: true },
    context: { type: Object as PropType<IContext>, required: true },
    params: { type: Object as PropType<IParams>, default: () => ({}) },
    controller: { type: Object as PropType<ToolbarController>, required: true },
  },
  setup(props, { slots }) {
    const c = props.controller;
    const ns = useNamespace(`popper-toolbar`);

    const contentRef: Ref<IData | undefined> = ref();

    // 列表绘制方向
    let direction: 'vertical' | 'horizontal' = 'horizontal';

    // 弹出方向
    let placement: string = 'left';

    if (c.controlParams) {
      direction = c.controlParams.direction || 'horizontal';
      placement = c.controlParams.placement || 'left';
    }

    const btnType = (item: IDEToolbarItem) => {
      const result = (item as IDETBUIActionItem).buttonStyle || 'default';
      return result.toLowerCase();
    };

    // 点击事件
    const handleClick = async (
      item: IDEToolbarItem | IExtraButton,
      event: MouseEvent,
    ) => {
      await c.onItemClick(item, event);
    };

    const renderToolbarItem = (item: IDEToolbarItem) => {
      const itemId = item.id!;
      if (['SEPERATOR', 'RAWITEM'].includes(item.itemType!)) {
        ibiz.log.error(
          ibiz.i18n.t('control.toolbar.noSupportType', {
            itemType: item.itemType,
          }),
        );
        return null;
      }
      if (item.itemType === 'ITEMS' && c.state.buttonsState[itemId]?.visible) {
        return (
          <div key={itemId} class={[ns.e('item'), ns.e('item-items')]}>
            <van-popover
              placement={placement}
              actions-direction={direction}
              teleport={contentRef.value?.$el}
              actions={(item as IDETBGroupItem).detoolbarItems}
              onSelect={(data: IDETBGroupItem, e: MouseEvent) => {
                handleClick(data, e);
              }}
            >
              {{
                action: ({ action }: { action: IDEToolbarItem }): VNode => {
                  const image = action.sysImage;
                  let icon = null;
                  let text = null;
                  if (action.showIcon) {
                    icon = <iBizIcon class={ns.e('icon')} icon={image} />;
                  }
                  if (action.showCaption) {
                    text = action.caption;
                  }
                  return (
                    <van-button round type={btnType(action)}>
                      {icon}
                      {text}
                    </van-button>
                  );
                },
                reference: (): VNode => {
                  const image = (item as IDEToolbarItem).sysImage;
                  let icon = null;
                  let text = null;
                  if (item.showIcon) {
                    icon = <iBizIcon class={ns.e('icon')} icon={image} />;
                  }
                  if (item.showCaption) {
                    text = item.caption;
                  }
                  return (
                    <van-button round type={btnType(item)}>
                      {icon}
                      {text}
                    </van-button>
                  );
                },
              }}
            </van-popover>
          </div>
        );
      }
      if (
        item.itemType === 'DEUIACTION' &&
        c.state.buttonsState[itemId]?.visible
      ) {
        return (
          <div
            key={itemId}
            class={[
              ns.e('item'),
              ns.e('item-deuiaction'),
              ns.is('disabled', c.state.buttonsState[itemId].disabled),
            ]}
          >
            <van-button
              title={item.tooltip}
              type={btnType(item)}
              round
              loading={c.state.buttonsState[itemId].loading}
              disabled={c.state.buttonsState[itemId].disabled}
              onClick={(e: MouseEvent) => handleClick(item, e)}
            >
              {slots.btnContent!(item)}
            </van-button>
          </div>
        );
      }

      return null;
    };

    return {
      c,
      ns,
      direction,
      contentRef,
      renderToolbarItem,
    };
  },
  render() {
    return (
      <iBizControlBase
        ref='contentRef'
        controller={this.c}
        class={[this.ns.b(), this.ns.m(this.direction)]}
      >
        {this.modelData.detoolbarItems?.map(item => {
          const toolbarItemNode = this.renderToolbarItem(item);
          return toolbarItemNode;
        })}
      </iBizControlBase>
    );
  },
});
