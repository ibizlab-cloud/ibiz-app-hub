/* eslint-disable vue/no-mutating-props */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropType, Ref, defineComponent, ref } from 'vue';
import './select-group.scss';
import { IDEToolbar, IUIActionGroupDetail } from '@ibiz/model-core';
import { BIReportDesignController } from '../../../controller';
import { useNamespace } from '../../../use';

export default defineComponent({
  name: 'BISelectGroup',
  props: {
    caption: {
      type: String,
      required: true,
    },
    items: {
      type: Array<IData>,
      default: () => [],
    },
    isSearch: {
      // 是否是搜索状态
      type: Boolean,
      default: false,
    },
    searchValue: {
      // 搜索值
      type: String,
      default: '',
    },
    collapse: {
      // 是否收缩
      type: Boolean,
      default: false,
    },
    controller: {
      type: Object as PropType<BIReportDesignController>,
      required: true,
    },
    type: {
      // 是否是指标
      type: String as PropType<
        'measure' | 'dimension' | 'period' | 'filter' | 'group'
      >,
      required: true,
    },
  },
  emits: ['add', 'collapse'],
  setup(props, { emit }) {
    const ns = useNamespace('select-group');

    // 气泡显示隐藏
    const popVisible: Ref<IData> = ref({});
    const isMoving = ref(false); // 是否正在移动
    const timer: Ref<IData> = ref({});

    // 拖拽开始
    const onDragstart = (item: IData) => {
      const tempItem: IData = {
        ...item,
        dragTypes:
          props.type === 'measure'
            ? ['measure']
            : ['dimension', 'filter', 'period', 'group'],
      };
      isMoving.value = true;
      popVisible.value[item.codename] = false;
      props.controller.evt.emit('onDragTarget', tempItem);
    };

    // 拖拽结束
    const onDragend = () => {
      isMoving.value = false;
      props.controller.evt.emit('onDragTarget', null);
    };

    // 绘制不同类型指标的图标
    const renderMeasureIcon = (item: IData) => {
      if (item.bimeasuretype === 'COMMON') {
        return (
          <svg
            class={ns.em('content', 'item-icon-com')}
            viewBox='0 0 16 16'
            xmlns='http://www.w3.org/2000/svg'
            height='1em'
            width='1em'
            focusable='false'
            fill='currentColor'
          >
            <g id='alzeditor/hashtag' stroke-width='1' fill-rule='evenodd'>
              <path
                d='M4.236 9.9l.422-3.8H2.6a.6.6 0 1 1 0-1.2h2.19l.372-3.347a.6.6 0 1 1 1.192.133L5.998 4.9h4.793l.37-3.347a.6.6 0 0 1 1.193.133L11.998 4.9h2.459a.6.6 0 0 1 0 1.2h-2.592l-.421 3.8h2.013a.6.6 0 0 1 0 1.2H11.31l-.374 3.368a.6.6 0 0 1-1.192-.132l.358-3.236H5.311l-.374 3.368a.6.6 0 0 1-1.192-.132l.358-3.236H1.6a.6.6 0 0 1 0-1.2h2.636zm1.208 0h4.792l.422-3.8H5.865l-.421 3.8z'
                id='alz形状结合'
              ></path>
            </g>
          </svg>
        );
      }
      return (
        <svg
          class={ns.em('content', 'item-icon-fx')}
          viewBox='0 0 16 16'
          xmlns='http://www.w3.org/2000/svg'
          height='1em'
          width='1em'
          focusable='false'
          fill='currentColor'
        >
          <g id='alheditor/formula' stroke-width='1' fill-rule='evenodd'>
            <path
              d='M12.663 11.027c-.117.142-.25.318-.4.527.09.88.404 1.722.913 2.446a.807.807 0 0 0 .951.051c.212-.071.317.313 0 .494a2.582 2.582 0 0 1-2.376.185 2.786 2.786 0 0 1-.918-1.726c-.101.152-.177.27-.223.346-.05.08-.121.194-.215.34a5.11 5.11 0 0 1-.776.993 1.134 1.134 0 0 1-.787.3.82.82 0 0 1-.832-.852 1.058 1.058 0 0 1 1.085-1.113c.176 0 .352.021.522.066.167.045.324.094.471.147a2.69 2.69 0 0 0 .264-.271c.129-.15.25-.305.362-.467-.15-.602-.31-1.287-.527-2.038a.869.869 0 0 0-1.281-.585c-.259.118-.388-.329.094-.529.447-.184 2.482-1.047 2.941.8.075.303.144.597.212.885l.246-.38c.085-.13.157-.246.218-.346.213-.368.476-.704.781-1 .214-.194.492-.301.781-.3a.8.8 0 0 1 .594.239.84.84 0 0 1 .238.619c.015.3-.1.59-.314.8a1.075 1.075 0 0 1-.767.3 2.1 2.1 0 0 1-.535-.069 5.572 5.572 0 0 1-.456-.138 1.662 1.662 0 0 0-.266.276zM7.223 5.4H8.5a.6.6 0 1 1 0 1.2H6.928c-.236 1.116-.614 3-.573 2.8-.105.506-.198.919-.297 1.318-.17.677-.36 1.312-.604 1.999-.587 1.652-1.397 2.363-2.395 2.363-.146 0-.283-.009-.412-.027-.627-.087-1.061-.549-1.305-1.273a.6.6 0 0 1 1.137-.383c.112.334.224.452.334.468.072.01.154.015.246.015.432 0 .833-.352 1.264-1.565.23-.65.41-1.248.57-1.889.096-.38.185-.778.287-1.27-.04.193.285-1.423.522-2.556H4.5a.6.6 0 1 1 0-1.2h1.472c.456-1.698 1.376-3.494 2.285-4.009.84-.476 1.634-.401 2.159.29a.6.6 0 0 1-.955.726c-.124-.163-.254-.175-.612.028-.51.289-1.218 1.642-1.627 2.965z'
              id='alh形状结合'
            ></path>
          </g>
        </svg>
      );
    };

    // 绘制不同类型纬度的图标
    const renderDimensionIcon = (item: IData) => {
      if (item.bidimensiontype === 'COMMON') {
        return (
          <svg
            class={ns.em('content', 'item-icon-fx')}
            viewBox='0 0 16 16'
            xmlns='http://www.w3.org/2000/svg'
            height='1em'
            width='1em'
            focusable='false'
            fill='currentColor'
          >
            <g
              id='bbd1.Base基础/1.icon图标/2.normal/View-report-fill'
              stroke-width='1'
              fill-rule='evenodd'
            >
              <path
                d='M9 1.2v4.974h1V3.2h2v2.974h1.5a1.5 1.5 0 0 1 1.5 1.5v5.784a1.5 1.5 0 0 1-1.5 1.5h-11a1.5 1.5 0 0 1-1.5-1.5V7.674a1.5 1.5 0 0 1 1.5-1.5H4V3.2h2v2.974h1V1.2h2zM6 6.636H4v4.038h2V6.636zm1 4.038h2V6.636H7v4.038zm5-4.053h-2v4.053h2V6.621z'
                id='bbd形状结合'
              ></path>
            </g>
          </svg>
        );
      }
      return (
        <svg
          class={ns.em('content', 'item-icon-fx')}
          viewBox='0 0 16 16'
          xmlns='http://www.w3.org/2000/svg'
          height='1em'
          width='1em'
          focusable='false'
          fill='currentColor'
        >
          <g id='alheditor/formula' stroke-width='1' fill-rule='evenodd'>
            <path
              d='M12.663 11.027c-.117.142-.25.318-.4.527.09.88.404 1.722.913 2.446a.807.807 0 0 0 .951.051c.212-.071.317.313 0 .494a2.582 2.582 0 0 1-2.376.185 2.786 2.786 0 0 1-.918-1.726c-.101.152-.177.27-.223.346-.05.08-.121.194-.215.34a5.11 5.11 0 0 1-.776.993 1.134 1.134 0 0 1-.787.3.82.82 0 0 1-.832-.852 1.058 1.058 0 0 1 1.085-1.113c.176 0 .352.021.522.066.167.045.324.094.471.147a2.69 2.69 0 0 0 .264-.271c.129-.15.25-.305.362-.467-.15-.602-.31-1.287-.527-2.038a.869.869 0 0 0-1.281-.585c-.259.118-.388-.329.094-.529.447-.184 2.482-1.047 2.941.8.075.303.144.597.212.885l.246-.38c.085-.13.157-.246.218-.346.213-.368.476-.704.781-1 .214-.194.492-.301.781-.3a.8.8 0 0 1 .594.239.84.84 0 0 1 .238.619c.015.3-.1.59-.314.8a1.075 1.075 0 0 1-.767.3 2.1 2.1 0 0 1-.535-.069 5.572 5.572 0 0 1-.456-.138 1.662 1.662 0 0 0-.266.276zM7.223 5.4H8.5a.6.6 0 1 1 0 1.2H6.928c-.236 1.116-.614 3-.573 2.8-.105.506-.198.919-.297 1.318-.17.677-.36 1.312-.604 1.999-.587 1.652-1.397 2.363-2.395 2.363-.146 0-.283-.009-.412-.027-.627-.087-1.061-.549-1.305-1.273a.6.6 0 0 1 1.137-.383c.112.334.224.452.334.468.072.01.154.015.246.015.432 0 .833-.352 1.264-1.565.23-.65.41-1.248.57-1.889.096-.38.185-.778.287-1.27-.04.193.285-1.423.522-2.556H4.5a.6.6 0 1 1 0-1.2h1.472c.456-1.698 1.376-3.494 2.285-4.009.84-.476 1.634-.401 2.159.29a.6.6 0 0 1-.955.726c-.124-.163-.254-.175-.612.028-.51.289-1.218 1.642-1.627 2.965z'
              id='alh形状结合'
            ></path>
          </g>
        </svg>
      );
    };

    // 绘制项气泡内容
    const renderItemPop = (item: IData) => {
      return (
        <div class={ns.b('item-pop')}>
          <div class={ns.be('item-pop', 'title')}>
            {props.type === 'measure'
              ? renderMeasureIcon(item)
              : renderDimensionIcon(item)}
            <span class={ns.em('content', 'text')}>
              {item.pssysbicubemeasurename || item.pssysbicubedimensionname}
            </span>
          </div>
          {item.memo && (
            <div class={ns.be('item-pop', 'mome')}>{item.memo}</div>
          )}
        </div>
      );
    };

    // 鼠标移入指标项
    const onMouseEnter = (item: IData, event: MouseEvent) => {
      timer.value[item.codename] = setTimeout(() => {
        popVisible.value = {};
        if (isMoving.value === false) {
          popVisible.value[item.codename] = true;
        }
      }, 1000);
    };

    // 鼠标移出指标项
    const onMouseLeave = (item: IData, event: MouseEvent) => {
      clearTimeout(timer.value[item.codename]);
      popVisible.value = {};
    };

    const onActionClick = (
      detail: IUIActionGroupDetail,
      item: IData,
      event: MouseEvent,
    ) => {
      props.controller.evt.emit('onActionClick', { detail, item, event });
    };

    // 绘制行为栏
    const renderActionBar = (item: IData) => {
      if (!item.dynamodelflag) {
        return;
      }
      let toolbar: IDEToolbar | undefined;
      if (props.type === 'measure' && item.bimeasuretype === 'CALCULATED') {
        toolbar = props.controller.measureToolbar;
      }
      if (props.type === 'dimension' && item.bidimensiontype === 'CALCULATED') {
        toolbar = props.controller.dimensionToolbar;
      }
      if (toolbar) {
        return (
          <iBizActionToolbar
            class={ns.e('action')}
            action-details={toolbar.detoolbarItems}
            actions-state={props.controller.getOptItemAction(
              item,
              toolbar.detoolbarItems || [],
            )}
            groupLevelKeys={[50, 100]}
            onActionClick={(detail: IUIActionGroupDetail, event: MouseEvent) =>
              onActionClick(detail, item, event)
            }
          ></iBizActionToolbar>
        );
      }
    };

    // 绘制项内
    const renderItemText = (item: IData) => {
      const actionBar = renderActionBar(item);
      const itemContent = (
        <div
          class={ns.em('content', 'item')}
          draggable={true}
          onDragstart={() => onDragstart(item)}
          onDragend={onDragend}
          onMouseenter={(event: MouseEvent) => onMouseEnter(item, event)}
          onMouseleave={(event: MouseEvent) => onMouseLeave(item, event)}
        >
          <div class={ns.em('content', 'item-icon')}>
            {props.type === 'measure'
              ? renderMeasureIcon(item)
              : renderDimensionIcon(item)}

            <svg
              class={ns.em('content', 'item-icon-move')}
              viewBox='0 0 16 16'
              xmlns='http://www.w3.org/2000/svg'
              height='1em'
              width='1em'
              focusable='false'
            >
              <g id='aitaction/drag--' stroke-width='1' fill-rule='evenodd'>
                <g id='ait拖动' transform='translate(5 1)' fill-rule='nonzero'>
                  <path
                    d='M1 2a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM1 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-4 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-4 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z'
                    id='ait形状结合'
                  ></path>
                </g>
              </g>
            </svg>
          </div>

          <span class={ns.em('content', 'text')}>
            {item.pssysbicubemeasurename || item.pssysbicubedimensionname}
          </span>
        </div>
      );
      const tempItem = (
        <el-popover
          visible={
            (popVisible.value[item.codename] || false) && !isMoving.value
          }
          trigger='hover'
          placement='right'
          width={230}
        >
          {{
            default: () => {
              return renderItemPop(item);
            },
            reference: () => {
              return itemContent;
            },
          }}
        </el-popover>
      );
      if (props.isSearch) {
        const name =
          item.pssysbicubemeasurename || item.pssysbicubedimensionname;
        if (name.indexOf(props.searchValue) >= 0) {
          if (props.type === 'measure') {
            return [tempItem, actionBar];
          }
          return [itemContent, actionBar];
        }
        return null;
      }
      if (props.type === 'measure') {
        return [tempItem, actionBar];
      }
      return [itemContent, actionBar];
    };

    // 绘制项
    const renderItem = (item: IData) => {
      return renderItemText(item);
    };

    // 切换伸缩,抛出事件
    const switchCollapse = () => {
      emit('collapse', !props.collapse);
    };

    // 点击添加按钮，抛出事件
    const onAdd = () => {
      emit('add');
    };

    // 计算显示项的数量
    const computeNumber = () => {
      if (props.isSearch) {
        return props.items.filter((item: IData) => {
          const name =
            item.pssysbicubemeasurename || item.pssysbicubedimensionname;
          return name.indexOf(props.searchValue) > -1;
        }).length;
      }
      return props.items.length;
    };
    return { ns, renderItem, switchCollapse, onAdd, computeNumber };
  },
  render() {
    return (
      <div class={this.ns.b()}>
        <div
          class={[this.ns.e('header'), this.ns.is('collapse', this.collapse)]}
        >
          <div class={this.ns.em('header', 'caption')}>
            <span>{this.caption}</span>
            <span>·</span>
            <span>{this.computeNumber()}</span>
          </div>
          <div class={this.ns.em('header', 'icons')}>
            <div class={this.ns.em('header', 'icons-add')} onClick={this.onAdd}>
              <svg
                viewBox='0 0 16 16'
                xmlns='http://www.w3.org/2000/svg'
                height='1em'
                width='1em'
                focusable='false'
              >
                <g
                  id='ars1.Base基础/1.icon图标/1.-action/plus'
                  stroke-width='1'
                  fill-rule='evenodd'
                >
                  <path
                    d='M8.578 7.383V1.602a.601.601 0 1 0-1.2 0v5.781H1.6a.601.601 0 0 0 0 1.203h5.777v5.812a.601.601 0 1 0 1.2 0V8.586H14.4a.601.601 0 0 0 0-1.203H8.578z'
                    id='arsFill-1'
                  ></path>
                </g>
              </svg>
            </div>
            <div
              class={this.ns.em('header', 'icons-collapse')}
              onClick={this.switchCollapse}
            >
              {this.collapse ? (
                <i class='fa fa-angle-right' aria-hidden='true'></i>
              ) : (
                <i class='fa fa-angle-up' aria-hidden='true'></i>
              )}
            </div>
          </div>
        </div>
        {!this.collapse && (
          <div class={this.ns.e('content')}>
            {this.items.map((item: IData) => {
              return this.renderItem(item);
            })}
          </div>
        )}
      </div>
    );
  },
});
