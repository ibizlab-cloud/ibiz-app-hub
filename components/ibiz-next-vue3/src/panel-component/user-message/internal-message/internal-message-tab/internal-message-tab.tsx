import {
  PropType,
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watch,
} from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import {
  getInternalMessageProvider,
  IInternalMessageController,
  IInternalMessageProvider,
} from '@ibiz-template/runtime';
import './internal-message-tab.scss';
import { IInternalMessage, IPortalMessage } from '@ibiz-template/core';
import { clone } from 'ramda';

export const InternalMessageTab = defineComponent({
  name: 'IBizInternalMessageTab',
  props: {
    controller: {
      type: Object as PropType<IInternalMessageController>,
      required: true,
    },
    showPopover: {
      type: Boolean,
      required: true,
    },
  },
  emits: {
    hiddenPopover: () => true,
  },
  setup(props, { emit }) {
    const ns = useNamespace('internal-message-tab');

    // 气泡控制
    const hiddenPopover = () => {
      // 默认信息点击关闭
      emit('hiddenPopover');
    };

    const c = props.controller;

    const unreadOnlyTag = `${ibiz.appData?.context.srfsystemid}-unreadOnly`;

    const hasNotice = ref(false);
    ibiz.mc.command.internalMessage.on(async (msg: IPortalMessage) => {
      ibiz.log.debug('mqtt internalMessage: ', msg);
      if (msg.subtype === 'INTERNALMESSAGE') {
        hasNotice.value = true;
      }
    });

    // 当通知过后，打开popover时重新加载
    watch(
      () => props.showPopover,
      newVal => {
        if (newVal && hasNotice.value) {
          c.load();
          c.refreshUnreadCount();
          hasNotice.value = false;
        }
      },
    );

    const allItems = ref<IInternalMessage[]>([]);
    const state = reactive({
      total: 0,
      pageSize: 0,
      unreadOnly: c.unreadOnly,
    });

    /**
     * 从控制器里更新数据
     * @author lxm
     * @date 2024-01-26 10:51:17
     */
    const updateData = () => {
      allItems.value = clone(c.messages);
      state.total = c.total;
      state.pageSize = c.size;
    };

    // 第一次计算数据
    updateData();
    const updateUnreadOnlyChange = (val: boolean) => {
      state.unreadOnly = val;
    };

    c.evt.on('dataChange', updateData);
    c.evt.on('unreadOnlyChange', updateUnreadOnlyChange);

    onUnmounted(() => {
      c.evt.off('dataChange', updateData);
      c.evt.off('unreadOnlyChange', updateUnreadOnlyChange);
    });

    const showMore = () => {
      c.loadMore();
    };

    const switchChange = () => {
      c.toggleUnReadOnly();
      localStorage.setItem(unreadOnlyTag, c.unreadOnly.toString());
    };

    const initUnreadOnly = (): void => {
      const unreadOnlyStr = localStorage.getItem(unreadOnlyTag);
      if (unreadOnlyStr) {
        if (unreadOnlyStr === 'true') {
          state.unreadOnly = true;
          c.unreadOnly = true;
        } else {
          state.unreadOnly = false;
          c.unreadOnly = false;
        }
      }
    };

    onMounted(() => {
      initUnreadOnly();
      c.load();
    });

    return {
      ns,
      allItems,
      state,
      hiddenPopover,
      showMore,
      switchChange,
    };
  },
  render() {
    const restLength = this.state.total - this.allItems.length;

    return (
      <div class={[this.ns.b()]}>
        <div class={this.ns.b('content')}>
          {this.allItems.length > 0 &&
            this.allItems.map(msg => {
              let provider: IInternalMessageProvider | undefined;
              try {
                provider = getInternalMessageProvider(msg);
              } catch (error) {
                ibiz.log.error(error);
              }
              if (provider) {
                return provider.render({
                  class: [this.ns.e('item')],
                  message: msg,
                  onClose: this.hiddenPopover,
                });
              }
              return (
                <div class={this.ns.e('item')}>
                  {ibiz.i18n.t(
                    'panelComponent.userMessage.internalMessageTab.noSupportType',
                    { type: msg.content_type },
                  )}
                </div>
              );
            })}
          {this.allItems.length === 0 && (
            <div class={this.ns.e('nodata')}>
              {ibiz.i18n.t(
                'panelComponent.userMessage.internalMessageTab.notificationYet',
              )}
            </div>
          )}
          {restLength > 0 && (
            <div class={this.ns.e('load-more')} onClick={this.showMore}>
              {ibiz.i18n.t(
                'panelComponent.userMessage.internalMessageTab.loadMore',
                { length: restLength },
              )}
            </div>
          )}
        </div>
        <div class={this.ns.b('footer')}>
          <el-switch
            value={this.state.unreadOnly}
            onChange={this.switchChange}
            class={this.ns.be('footer', 'switch')}
          />{' '}
          {ibiz.i18n.t(
            'panelComponent.userMessage.internalMessageTab.onlyShowUnread',
          )}
        </div>
      </div>
    );
  },
});
