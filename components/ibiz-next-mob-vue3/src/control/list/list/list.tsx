import { IDEList } from '@ibiz/model-core';
import { defineComponent, PropType, ref } from 'vue';
import { useControlController, useNamespace } from '@ibiz-template/vue3-util';
import { IControlProvider, ListController } from '@ibiz-template/runtime';
import { useListRender } from '../list-render-util';
import './list.scss';

export const ListControl = defineComponent({
  name: 'IBizListControl',
  props: {
    modelData: { type: Object as PropType<IDEList>, required: true },
    context: { type: Object as PropType<IContext>, required: true },
    params: { type: Object as PropType<IParams>, default: () => ({}) },
    provider: { type: Object as PropType<IControlProvider> },
    mdctrlActiveMode: { type: Number, default: 1 },
    singleSelect: { type: Boolean, default: true },
    rowsCount: { type: Number, default: 2 },
    columnsCount: { type: Number, default: 5 },
    loadDefault: { type: Boolean, default: true },
    mode: { type: String, default: 'LIST' },
  },
  setup(props) {
    const c = useControlController((...args) => new ListController(...args));

    const ns = useNamespace(`control-${c.model.controlType!.toLowerCase()}`);
    const ns2 = useNamespace(`control-mobmdctrl`);

    const { renderItem, renderNoData, renderLoadMore } = useListRender(
      props,
      c,
      ns2,
    );

    const showPicker = ref(false);
    const openReviewList = () => {
      showPicker.value = true;
    };

    // 绘制默认列表项
    const renderDefaultItem = (item: IData) => {
      // 是否选中数据
      const findIndex = c.state.selectedData.findIndex(data => {
        return data.srfkey === item.srfkey;
      });
      const itemClass = [ns.b('item'), ns.is('active', findIndex !== -1)];
      const itemStyle = { flexBasis: `${100 / props.columnsCount}%` };
      return (
        <div class={itemClass} key={item.srfkey} style={itemStyle}>
          <van-tag
            onClick={() => c.onRowClick(item)}
            class={ns.e('tag')}
            onDblclick={() => c.onDbRowClick(item)}
            closeable
            plain
            size='large'
            type='primary'
            onClose={() => c.setActive(item)}
          >
            <span class={ns.e('item-text')}>{item.srfmajortext || ''}</span>
          </van-tag>
        </div>
      );
    };
    const renderReViewDefaultItem = (item: IData) => {
      // 是否选中数据
      const findIndex = c.state.selectedData.findIndex(data => {
        return data.srfkey === item.srfkey;
      });
      const itemClass = [ns.b('item'), ns.is('active', findIndex !== -1)];
      return (
        <div class={itemClass} key={item.srfkey}>
          <van-cell class={itemClass} is-link title={item.srfmajortext || ''}>
            {{
              'right-icon': () => {
                return (
                  <van-icon
                    class={ns.e('item-icon')}
                    onClick={() => c.setActive(item)}
                    name='delete-o'
                  />
                );
              },
            }}
          </van-cell>
        </div>
      );
    };

    // 绘制展开
    const renderExpand = () => {
      const itemClass = [ns.b('item'), ns.b('item-expand')];
      return (
        <div class={itemClass} onClick={openReviewList}>
          {ibiz.i18n.t('control.list.expand')}
        </div>
      );
    };

    // 绘制卡片内容
    const renderListContent = () => {
      return c.state.items.map((item, index) => {
        if (index === props.rowsCount * props.columnsCount - 1) {
          return renderExpand();
        }
        if (index > props.rowsCount * props.columnsCount - 1) {
          return null;
        }
        return renderDefaultItem(item);
      });
    };
    // 预览列表
    const renderReViewListContent = () => {
      if (c.state.items.length === 0) {
        return renderNoData();
      }
      return c.state.items.map(item => {
        return renderReViewDefaultItem(item);
      });
    };

    const renderReviewList = () => {
      return (
        <van-popup
          round
          close-on-popstate={true}
          position='bottom'
          teleport='body'
          v-model:show={showPicker.value}
          class={ns.b('popup')}
        >
          <div class={ns.b('popup-container')}>
            <div class={ns.b('popup-header')}>
              <div>{ibiz.i18n.t('control.list.selectedData')}</div>
            </div>
            <div class={ns.b('popup-content')}>{renderReViewListContent()}</div>
          </div>
        </van-popup>
      );
    };

    const renderDefaultList = () => {
      // 绘制卡片内容
      return (
        <van-list finished={c.state.total <= c.state.items.length}>
          {c.state.items.map((item: IData) => {
            return renderItem(item);
          })}
        </van-list>
      );
    };

    const renderSelectList = () => {
      return [renderListContent(), renderReviewList(), renderLoadMore()];
    };

    return {
      c,
      ns,
      ns2,
      renderSelectList,
      renderDefaultList,
    };
  },
  render() {
    return (
      <iBizControlBase
        controller={this.c}
        class={(this.ns.b(this.c.model.name), this.ns2.b())}
      >
        {this.c.state.isCreated && this.mode === 'LIST'
          ? this.renderDefaultList()
          : this.renderSelectList()}
      </iBizControlBase>
    );
  },
});
