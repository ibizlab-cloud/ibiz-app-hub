/* eslint-disable camelcase */
import { computed, defineComponent, PropType } from 'vue';
import { IInternalMessage, showTitle } from '@ibiz-template/core';
import { useNamespace } from '@ibiz-template/vue3-util';
import './internal-message-container.scss';
import { IInternalMessageProvider } from '@ibiz-template/runtime';

export type ToolbarItem = {
  /**
   * 提示文本信息
   * @author lxm
   * @date 2024-01-30 03:27:33
   * @type {string}
   */
  tooltip: string;
  /**
   * 图标名称
   * @author lxm
   * @date 2024-01-30 03:27:23
   * @type {string}
   */
  icon: string;
  /**
   * 唯一标识
   * @author lxm
   * @date 2024-01-30 03:27:16
   * @type {string}
   */
  key: string;
};

export const InternalMessageContainer = defineComponent({
  name: 'IBizInternalMessageContainer',
  props: {
    message: {
      type: Object as PropType<IInternalMessage>,
      required: true,
    },
    provider: {
      type: Object as PropType<IInternalMessageProvider>,
      required: true,
    },
    clickable: {
      type: Boolean,
      default: undefined,
    },
    toolbarItems: {
      type: Array<ToolbarItem>,
      default: () => [] as ToolbarItem[],
    },
  },
  emits: {
    toolbarClick: (_key: string) => true,
    close: () => true,
  },
  setup(props, { emit }) {
    const ns = useNamespace('internal-message-container');

    const isUnread = computed(() => {
      return props.message.status === 'RECEIVED';
    });

    const finalToolbarItems = computed(() => {
      const toolbarItems = [...props.toolbarItems];
      if (isUnread.value) {
        toolbarItems.push({
          key: 'read',
          icon: 'checkmark-done-outline',
          tooltip: ibiz.i18n.t(
            'panelComponent.userMessage.internalMessageContainer.markAsRead',
          ),
        });
      }
      return toolbarItems;
    });

    const onToolbarClick = (event: MouseEvent, key: string) => {
      event.stopPropagation();
      if (key === 'read') {
        ibiz.hub.notice.internalMessage.markRead(props.message);
      } else {
        emit('toolbarClick', key);
      }
    };

    const isClickable = computed(() => {
      if (props.clickable === undefined) {
        return ibiz.env.isMob
          ? !!props.message.mobile_url
          : !!props.message.url;
      }
      return props.clickable;
    });

    const onClick = async (event: MouseEvent) => {
      if (isClickable.value && props.provider.onClick) {
        const isClose = await props.provider.onClick(props.message, event);
        if (isClose) {
          emit('close');
        }
      }
    };

    return {
      ns,
      isUnread,
      isClickable,
      finalToolbarItems,
      onToolbarClick,
      onClick,
    };
  },
  render() {
    return (
      <div
        class={[
          this.ns.b(),
          this.isClickable ? this.ns.m('clickable') : '',
          this.isUnread ? this.ns.m('unread') : '',
        ]}
        onClick={this.onClick}
      >
        {this.$slots.default?.()}
        <div class={this.ns.b('toolbar')}>
          {this.finalToolbarItems.map(item => {
            return (
              <iBizIcon
                class={this.ns.be('toolbar', 'button')}
                icon={{
                  imagePath: 'svg/read.svg',
                }}
                baseDir='iconfont'
                title={showTitle(item.tooltip)}
                onClick={(e: MouseEvent) => this.onToolbarClick(e, item.key)}
              />
            );
          })}
        </div>
        <div class={this.ns.e('unread-tag')}></div>
        {this.isClickable && (
          <ion-icon
            class={this.ns.e('click-tag')}
            name='chevron-forward-outline'
          ></ion-icon>
        )}
      </div>
    );
  },
});
