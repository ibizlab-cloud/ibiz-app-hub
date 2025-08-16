/* eslint-disable no-unused-expressions */
import {
  ref,
  PropType,
  computed,
  nextTick,
  onMounted,
  onActivated,
  onDeactivated,
  defineComponent,
} from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import {
  IPanelButtonList,
  IDEFormButtonList,
  IAppDEUIActionGroupDetail,
} from '@ibiz/model-core';
import { IButtonContainerState } from '@ibiz-template/runtime';
import { debounce } from 'lodash-es';
import { convertBtnType } from '../../util';
import './button-list.scss';

/**
 * 面板按钮组和表单按钮组的基础组件
 */
export const IBizButtonList = defineComponent({
  name: 'IBizButtonList',
  props: {
    model: {
      type: Object as PropType<IPanelButtonList | IDEFormButtonList>,
      required: true,
    },
    buttonsState: {
      type: Object as PropType<IButtonContainerState>,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    click: (_id: string, _e: MouseEvent) => true,
  },
  setup(props, { emit }) {
    const ns = useNamespace('button-list');
    const dropdown = ref();
    const componentRef = ref();
    const { actionGroupExtractMode, buttonListType, uiactionGroup } =
      props.model;
    const sliceIndex = ref(-1);
    const isActivated = ref(true);

    const visible = ref(false);

    /**
     * 按钮行为项集合
     */
    const details = computed(() => {
      if (buttonListType === 'UIACTIONGROUP')
        return (
          (uiactionGroup?.uiactionGroupDetails as IAppDEUIActionGroupDetail[]) ||
          []
        );
      return (
        (props.model as IPanelButtonList).panelButtons ||
        (props.model as IDEFormButtonList).deformButtons ||
        []
      );
    });

    /**
     * 可见行为首项下标
     */
    const firstIndex = computed(() => {
      const index = details.value.findIndex(
        item => props.buttonsState[item.id!]?.visible !== false,
      );
      return index === undefined ? -1 : index;
    });

    /**
     * 按钮组样式
     */
    const buttonListStyle = computed(() => {
      const { itemStyle, detailStyle } = props.model as IModel;
      return itemStyle || detailStyle || 'DEFAULT';
    });

    /**
     * 触发下拉的方式
     */
    const trigger = computed(() => {
      return actionGroupExtractMode === 'ITEMX' &&
        buttonListStyle.value === 'STYLE2'
        ? 'hover'
        : 'click';
    });

    const calcItemWidth = (item: HTMLElement) => {
      const computedStyle = getComputedStyle(item);
      const marginLeft = Number.parseInt(computedStyle.marginLeft, 10);
      const marginRight = Number.parseInt(computedStyle.marginRight, 10);
      return item.offsetWidth + marginLeft + marginRight || 0;
    };

    const calcSliceIndex = () => {
      if (!componentRef.value) return -1;
      const items = Array.from(
        componentRef.value.children ?? [],
      ) as HTMLElement[];
      const moreItemWidth = 44;
      const computedStyle = getComputedStyle(componentRef.value!);
      const paddingLeft = Number.parseInt(computedStyle.paddingLeft, 10);
      const paddingRight = Number.parseInt(computedStyle.paddingRight, 10);
      const totalWidth =
        componentRef.value!.clientWidth - paddingLeft - paddingRight;
      let calcWidth = 0;
      let index = 0;
      items.forEach((item: HTMLElement, _index: number) => {
        calcWidth += calcItemWidth(item);
        const width =
          _index === items.length - 1 ? totalWidth : totalWidth - moreItemWidth;
        if (calcWidth <= width) {
          index = _index + 1;
        }
      });
      return index === items.length ? -1 : index;
    };

    let handleResize = () => {
      if (!isActivated.value) {
        return;
      }
      if (sliceIndex.value === calcSliceIndex()) return;
      sliceIndex.value = -1;
      nextTick(() => {
        sliceIndex.value = calcSliceIndex();
      });
    };

    onActivated(() => {
      isActivated.value = true;
    });

    onDeactivated(() => {
      isActivated.value = false;
    });

    // 容器大小变化监听器
    let resizeObserver: ResizeObserver;

    onMounted(() => {
      // 只有按项展开才监听宽度
      if (actionGroupExtractMode === 'ITEM' || buttonListType === 'BUTTONS') {
        // 33.34为60帧刷新频率
        handleResize = debounce(handleResize, 33.34);
        if (componentRef.value && ResizeObserver) {
          resizeObserver = new ResizeObserver(() => {
            handleResize();
          });
          resizeObserver.observe(componentRef.value);
        }
      }
    });

    /**
     * 处理点击
     *
     * @param {MouseEvent} e
     * @param {IAppDEUIActionGroupDetail} item
     */
    const handleClick = (
      e: MouseEvent,
      item: IAppDEUIActionGroupDetail,
    ): void => {
      e.stopPropagation();
      dropdown.value?.handleClose?.();
      emit('click', item.id!, e);
    };

    /**
     * 处理更多点击
     *
     * @param {MouseEvent} e
     * @param {IAppDEUIActionGroupDetail} item
     */
    const handleMoreClick = (
      e: MouseEvent,
      item: IAppDEUIActionGroupDetail,
    ): void => {
      e.stopPropagation();
      if (trigger.value === 'hover') {
        emit('click', item.id!, e);
      } else if (visible.value) {
        dropdown.value?.handleClose?.();
      } else {
        dropdown.value?.handleOpen?.();
      }
    };

    /**
     * 绘制行为项内容
     *
     * @param {IAppDEUIActionGroupDetail} item
     * @param {boolean} [disabled=false]
     * @return {*}  {(JSX.Element | null)}
     */
    const renderButton = (
      item: IAppDEUIActionGroupDetail,
      type?: string,
    ): JSX.Element | null => {
      if (props.buttonsState[item.id!]?.visible === false) return null;
      return (
        <el-button
          class={[
            ns.e('item'),
            ns.em('item', `${item.id?.toLowerCase()}`),
            `${item.sysCss?.cssName || ''}`,
          ]}
          type={type || convertBtnType(item.buttonStyle)}
          title={item.tooltip || item.caption}
          disabled={props.buttonsState[item.id!]?.disabled || props.disabled}
          onClick={(event: MouseEvent) => handleClick(event, item)}
        >
          <div class={ns.e('button-content')}>
            {item.showIcon && (
              <iBizIcon
                icon={item.sysImage}
                class={ns.em('button-content', 'icon')}
              />
            )}
            {item.showCaption && (
              <span class={ns.em('button-content', 'caption')}>
                {item.caption}
              </span>
            )}
          </div>
        </el-button>
      );
    };

    /**
     * 绘制下拉行为项
     *
     * @return {*}  {JSX.Element}
     */
    const renderDropdown = (
      items: IAppDEUIActionGroupDetail[],
      iconName: string = 'chevron-down-outline',
    ): JSX.Element => {
      const { id, caption, sysImage } = props.model;
      return (
        <el-dropdown
          ref={dropdown}
          trigger={trigger.value}
          disabled={props.disabled}
          class={[
            ns.e('dropdown'),
            ns.em('dropdown', `${buttonListStyle.value.toLowerCase()}`),
          ]}
          popper-class={[
            ns.e('dropdown-popper'),
            ns.em('dropdown-popper', `${buttonListStyle.value.toLowerCase()}`),
            ns.em('dropdown-popper', `${id?.toLowerCase()}`),
          ]}
          popper-options={{
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, 4],
                },
              },
            ],
          }}
          onVisibleChange={(show: boolean) => {
            visible.value = show;
          }}
        >
          {{
            default: () => {
              const item: IAppDEUIActionGroupDetail = items![firstIndex.value];
              return (
                <el-button-group>
                  {actionGroupExtractMode === 'ITEMX' &&
                    item &&
                    renderButton(item, convertBtnType(buttonListStyle.value))}
                  {(actionGroupExtractMode !== 'ITEMX' || item) && (
                    <el-button
                      disabled={props.disabled}
                      class={ns.e('more-button')}
                      title={
                        actionGroupExtractMode !== 'ITEMX'
                          ? caption || ibiz.i18n.t('app.more')
                          : ibiz.i18n.t('app.more')
                      }
                      type={convertBtnType(buttonListStyle.value)}
                      onClick={(event: MouseEvent) =>
                        handleMoreClick(event, item)
                      }
                    >
                      <div class={ns.e('button-content')}>
                        {actionGroupExtractMode === 'ITEMS' ? (
                          [
                            <iBizIcon
                              class={ns.em('button-content', 'icon')}
                              icon={sysImage}
                            />,
                            caption ? (
                              <span class={ns.em('button-content', 'caption')}>
                                {caption}
                              </span>
                            ) : null,
                          ]
                        ) : (
                          <ion-icon
                            name={iconName}
                            class={ns.em('button-content', 'more')}
                          ></ion-icon>
                        )}
                      </div>
                    </el-button>
                  )}
                </el-button-group>
              );
            },
            dropdown: () => (
              <el-dropdown-menu>
                {items.map((item: IAppDEUIActionGroupDetail, index: number) => {
                  if (
                    !(props.buttonsState[item.id!]?.visible === false) &&
                    (actionGroupExtractMode !== 'ITEMX' ||
                      index !== firstIndex.value)
                  ) {
                    return (
                      <el-dropdown-item>{renderButton(item)}</el-dropdown-item>
                    );
                  }
                  return null;
                })}
              </el-dropdown-menu>
            ),
          }}
        </el-dropdown>
      );
    };

    /**
     * 绘制默认行为项
     *
     * @return {*}  {JSX.Element}
     */
    const renderActions = (): JSX.Element => {
      const groupDetails = details.value || [];
      const items =
        sliceIndex.value === -1
          ? groupDetails
          : groupDetails.slice(0, sliceIndex.value);

      const moreItems =
        sliceIndex.value === -1 ? [] : groupDetails.slice(sliceIndex.value);
      return (
        <div class={ns.e('content')} ref={componentRef}>
          {items.map((item: IAppDEUIActionGroupDetail) => renderButton(item))}
          {moreItems.length
            ? renderDropdown(moreItems, 'ellipsis-horizontal')
            : null}
        </div>
      );
    };

    return { ns, buttonListStyle, details, renderDropdown, renderActions };
  },
  render() {
    return (
      <div
        class={[
          this.ns.b(),
          this.ns.m(this.model.id),
          this.ns.m(this.buttonListStyle.toLowerCase()),
          this.ns.m(this.model.actionGroupExtractMode?.toLowerCase()),
        ]}
        style={this.model.cssStyle}
      >
        {this.model.actionGroupExtractMode === 'ITEM' ||
        this.model.buttonListType === 'BUTTONS'
          ? this.renderActions()
          : this.renderDropdown(this.details)}
      </div>
    );
  },
});
