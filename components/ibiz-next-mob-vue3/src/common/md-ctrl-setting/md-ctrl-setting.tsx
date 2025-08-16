import { defineComponent, PropType, ref, onUnmounted } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './md-ctrl-setting.scss';

type Order = 'asc' | 'desc';

interface IListItem {
  // 文本值
  label: string;
  // 唯一标识
  value: string;
}

export const IBizMdCtrlSetting = defineComponent({
  name: 'IBizMdCtrlSetting',
  props: {
    listItems: {
      type: Array as PropType<IListItem[]>,
      default: () => [],
    },
    sort: {
      type: Object as PropType<{ key: string; order: 'asc' | 'desc' }>,
    },
  },
  emits: ['sortChange'],
  setup(props, { emit }) {
    const ns = useNamespace('md-ctrl-setting');
    const sortData = [
      { text: ibiz.i18n.t('component.mdCtrlSetting.asc'), order: 'asc' },
      { text: ibiz.i18n.t('component.mdCtrlSetting.desc'), order: 'desc' },
    ];

    // 排序弹框显隐状态
    const visible = ref(false);
    // 当前激活页
    const currentPage = ref('asc');
    // 当前激活项
    const selectedKey = ref<string>('');

    // 初始化数据
    const initData = () => {
      if (props.sort) {
        const { key, order } = props.sort;
        selectedKey.value = key;
        currentPage.value = order;
        return;
      }

      selectedKey.value = '';
      currentPage.value = 'asc';
    };

    // 打开排序配置
    const onOpenSortSetting = (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      visible.value = true;
      initData();
    };

    // 切换
    const onTabChange = (order: Order): void => {
      currentPage.value = order;
    };

    // 处理项点击
    const onItemClick = (item: IListItem): void => {
      const isCheck = selectedKey.value === item.value;
      let key = item.value || '';
      if (isCheck) {
        key = '';
      }

      selectedKey.value = key;
    };

    // 确定事件
    const onConfirm = () => {
      visible.value = false;
      emit('sortChange', {
        key: selectedKey.value || '',
        order: currentPage.value,
      });
    };

    // 关闭弹框
    const onClose = () => {
      visible.value = false;
    };

    onUnmounted(() => {
      selectedKey.value = '';
      currentPage.value = '';
    });

    // 绘制列表项
    const renderListItem = (item: IListItem) => {
      const isCheck = selectedKey.value === item.value;
      return (
        <div
          class={[ns.e('list-item'), ns.is('check', isCheck)]}
          onClick={() => onItemClick(item)}
        >
          <span class={ns.em('list-item', 'text')}>{item.label}</span>
          {isCheck && (
            <span class={ns.em('list-item', 'icon')}>
              <svg
                viewBox='0 0 16 16'
                xmlns='http://www.w3.org/2000/svg'
                height='1em'
                width='1em'
              >
                <g stroke-width='1' fill-rule='evenodd'>
                  <path d='M6.012 11.201L1.313 6.832l-.817.879 5.54 5.15 9.304-9.163-.842-.855z'></path>
                </g>
              </svg>
            </span>
          )}
        </div>
      );
    };

    // 绘制列表
    const renderList = (listItems: IListItem[]) => {
      return (
        <van-list>
          {{
            default: () => {
              return listItems.map((item: IListItem) => {
                return (
                  <van-cell>
                    {{
                      default: () => {
                        return renderListItem(item);
                      },
                    }}
                  </van-cell>
                );
              });
            },
          }}
        </van-list>
      );
    };

    // 绘制内容
    const renderContent = () => {
      return (
        <div class={ns.e('content')}>
          <div class={ns.em('content', 'header')}>
            <div class={ns.em('content', 'title')}>
              {ibiz.i18n.t('component.mdCtrlSetting.sort')}
            </div>
            <van-icon
              name='cross'
              class={ns.em('content', 'icon')}
              onClick={onClose}
              title={ibiz.i18n.t('app.close')}
            />
          </div>
          <van-tabs
            class={ns.em('content', 'tabs')}
            active={currentPage.value}
            onChange={onTabChange}
          >
            {{
              default: () => {
                return sortData.map((item: IData) => {
                  return (
                    <van-tab
                      class={ns.em('content', 'tab-item')}
                      name={item.order}
                    >
                      {{
                        default: () => renderList(props.listItems),
                        title: () => {
                          return <div>{item.text}</div>;
                        },
                      }}
                    </van-tab>
                  );
                });
              },
            }}
          </van-tabs>
          <div class={ns.em('content', 'bottom')}>
            <van-button type='primary' block onClick={onConfirm}>
              {ibiz.i18n.t('component.mdCtrlSetting.confirm')}
            </van-button>
          </div>
        </div>
      );
    };

    // 绘制弹框
    const renderPopup = () => {
      return (
        <van-popup
          close-on-popstate={true}
          v-model:show={visible.value}
          round
          class={ns.e('popup')}
          teleport='body'
          position='bottom'
        >
          {{ default: () => renderContent() }}
        </van-popup>
      );
    };

    // 绘制设置
    const renderSetting = () => {
      return (
        <div
          class={ns.e('setting')}
          title={ibiz.i18n.t('component.mdCtrlSetting.sort')}
          onClick={onOpenSortSetting}
        >
          <svg
            class={ns.em('setting', 'icon')}
            viewBox='0 0 1024 1024'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            p-id='10950'
            height='1em'
            width='1em'
          >
            <path
              d='M83.6 263.2H590c20.8 0 37.6-16.9 37.6-37.6S610.7 188 590 188H83.6C62.8 188 46 204.9 46 225.6s16.9 37.6 37.6 37.6zM538.3 513.5c0-20.8-16.9-37.6-37.6-37.6h-417c-20.8 0-37.6 16.9-37.6 37.6s16.9 37.6 37.6 37.6h417c20.8 0.1 37.6-16.8 37.6-37.6zM381.5 729.1H83.6C62.8 729.1 46 746 46 766.7s16.9 37.6 37.6 37.6h297.9c20.8 0 37.6-16.9 37.6-37.6s-16.8-37.6-37.6-37.6zM967 582.7c-14.7-14.7-38.5-14.7-53.2 0L782.3 714.1V205.7c0-20.8-16.9-37.6-37.6-37.6S707 184.9 707 205.7v503.8L580.3 582.7c-14.7-14.7-38.5-14.7-53.2 0s-14.7 38.5 0 53.2l220 220 220-220c14.6-14.6 14.6-38.5-0.1-53.2z'
              p-id='10951'
            ></path>
          </svg>
        </div>
      );
    };

    return {
      ns,
      renderSetting,
      renderPopup,
      renderContent,
    };
  },
  render() {
    return (
      <div class={[this.ns.b()]}>
        {this.renderSetting()}
        {this.renderPopup()}
      </div>
    );
  },
});
