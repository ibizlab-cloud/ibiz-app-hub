import { defineComponent, PropType, Ref, ref, VNode } from 'vue';
import { useNamespace, usePopoverVisible } from '@ibiz-template/vue3-util';
import { IButtonContainerState } from '@ibiz-template/runtime';
import { IAppDEUIActionGroupDetail } from '@ibiz/model-core';
import { showTitle } from '@ibiz-template/core';
import './action-toolbar.scss';

export const IBizActionToolbar = defineComponent({
  name: 'IBizActionToolbar',
  props: {
    actionDetails: {
      type: Array<IAppDEUIActionGroupDetail>,
      required: true,
    },
    actionsState: {
      type: Object as PropType<IButtonContainerState>,
      required: true,
    },
    caption: String,
    mode: {
      type: String as PropType<'dropdown' | 'buttons'>,
      default: 'buttons',
    },
    // 分组的行为级别
    groupLevelKeys: {
      type: Object as PropType<number[]>,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: [50],
    },
    zIndex: {
      type: Number,
      required: true,
    },
    popperClass: String,
    // 行为回调，和action-click事件互斥，二者只有一个生效，actionCallBack优先级大于行为回调
    // 二者区别在于：行为回调为同步执行（主要解决pop打开视图位置异常），action-click为异步执行（不关心执行是否完成）
    actionCallBack: {
      type: Function,
    },
  },
  setup(props, { emit }) {
    const ns = useNamespace('action-toolbar');
    // 下拉列表ref
    const dropdownRef = ref();
    // 分组ref
    const groupButtonRef = ref<HTMLElement | null>();

    const { popoverVisible, setPopoverVisible } = usePopoverVisible(
      groupButtonRef,
      (ele: IData) => {
        return ele.ref;
      },
    );

    // 转换多语言
    props.actionDetails?.forEach(detail => {
      if (detail.capLanguageRes && detail.capLanguageRes.lanResTag) {
        detail.caption = ibiz.i18n.t(
          detail.capLanguageRes.lanResTag,
          detail.caption,
        );
      }
      if (detail.tooltipLanguageRes && detail.tooltipLanguageRes.lanResTag) {
        detail.tooltip = ibiz.i18n.t(
          detail.tooltipLanguageRes.lanResTag,
          detail.tooltip,
        );
      }
    });

    // 点击事件抛给表格执行
    const handleClick = async (
      detail: IAppDEUIActionGroupDetail,
      e: MouseEvent,
    ): Promise<void> => {
      e.stopPropagation();
      if (props.actionCallBack) {
        await props.actionCallBack(detail, e);
      }
      // 触发事件前先关闭下拉框
      if (props.mode === 'buttons') {
        setPopoverVisible(false);
      } else if (dropdownRef.value) {
        dropdownRef.value.handleClose();
      }
      if (!props.actionCallBack) {
        emit('action-click', detail, e);
      }
    };
    // 平铺行为
    const expandDetails: Ref<IAppDEUIActionGroupDetail[]> = ref([]);

    // 分组行为
    const groupDetails: Ref<IAppDEUIActionGroupDetail[]> = ref([]);

    if (props.actionDetails) {
      props.actionDetails.forEach(detail => {
        if (
          props.groupLevelKeys.findIndex(
            item => item === detail.actionLevel,
          ) !== -1
        ) {
          groupDetails.value.push(detail);
        } else {
          expandDetails.value.push(detail);
        }
      });
    }

    const calcActionItemClass = (item: IAppDEUIActionGroupDetail) => {
      const { actionLevel } = item;
      return [
        ns.e('item'),
        ns.is('disabled', false),
        ns.em('item', `level-${actionLevel}`),
      ];
    };

    const popoverIndex = props.zIndex;

    return {
      ns,
      dropdownRef,
      popoverIndex,
      expandDetails,
      groupDetails,
      groupButtonRef,
      popoverVisible,
      handleClick,
      calcActionItemClass,
    };
  },
  render() {
    const details = this.actionDetails || [];

    const renderDivider = (isExpand: boolean) => {
      return (
        <el-divider
          class={this.ns.e('separator')}
          border-style='double'
          direction={isExpand ? 'vertical' : 'horizontal'}
        />
      );
    };

    const renderActions = (
      items: IAppDEUIActionGroupDetail[],
      isExpand = true,
    ) => {
      return items.map(detail => {
        if (this.actionsState[detail.id!]?.visible) {
          return [
            detail.addSeparator && renderDivider(isExpand),
            <el-button
              text
              size='small'
              onClick={(e: MouseEvent): Promise<void> =>
                this.handleClick(detail, e)
              }
              title={showTitle(detail.tooltip)}
              disabled={this.actionsState[detail.id!].disabled}
              class={this.calcActionItemClass(detail)}
            >
              <div
                class={[
                  this.ns.em('item', 'icon'),
                  this.ns.is(
                    'has-caption',
                    detail.showCaption && !!detail.caption,
                  ),
                  this.ns.is('has-icon', detail.showIcon && !!detail.sysImage),
                ]}
              >
                {detail.showIcon && detail.sysImage && (
                  <iBizIcon icon={detail.sysImage}></iBizIcon>
                )}
              </div>
              <div
                class={[
                  this.ns.em('item', 'label'),
                  this.ns.is(
                    'has-caption',
                    detail.showCaption && !!detail.caption,
                  ),
                  this.ns.is('has-icon', detail.showIcon && !!detail.sysImage),
                ]}
              >
                {detail.showCaption ? detail.caption : ''}
              </div>
            </el-button>,
          ];
        }
        return null;
      });
    };

    const renderGroup = () => {
      if (this.groupDetails.length === 0) {
        return null;
      }
      // 子项所有项都隐藏，父项也应该隐藏
      const pvisible =
        this.groupDetails.findIndex(item => {
          return this.actionsState[item.id!].visible === true;
        }) !== -1;
      if (!pvisible) {
        return null;
      }
      // 当前项禁用或子项所有项都禁用，父项也应该禁用
      const pdisabled =
        this.groupDetails.findIndex(item => {
          return this.actionsState[item.id!].disabled === false;
        }) === -1;
      return [
        <el-button
          size='small'
          text
          disabled={pdisabled}
          ref='groupButtonRef'
          class={[
            this.ns.e('item'),
            this.ns.is('group', true),
            this.ns.is('expand', this.popoverVisible),
          ]}
          onClick={(): void => {
            this.popoverVisible = !this.popoverVisible;
          }}
        >
          {{
            icon: () => (
              <ion-icon
                class={this.ns.e('icon')}
                name='ellipsis-vertical'
                title={showTitle(ibiz.i18n.t('component.actionToolbar.more'))}
              />
            ),
          }}
        </el-button>,
        <el-popover
          placement='bottom-start'
          virtual-ref={this.groupButtonRef}
          visible={this.popoverVisible}
          popper-class={this.ns.e('popover')}
          virtual-triggering
          popper-style={`z-index:${this.popoverIndex}`}
        >
          {renderActions(this.groupDetails, false)}
        </el-popover>,
      ];
    };

    if (!this.actionsState?.visible) {
      return;
    }

    if (this.mode === 'buttons') {
      // 按钮模式
      return (
        <div
          class={[this.ns.b(), this.ns.m('buttons')]}
          onClick={(e): void => e.stopPropagation()}
        >
          {renderActions(this.expandDetails)}
          {renderGroup()}
        </div>
      );
    }
    // 下拉模式
    return (
      <el-dropdown
        ref='dropdownRef'
        onCommand={(command: IAppDEUIActionGroupDetail): Promise<void> =>
          this.handleClick(command, new MouseEvent('click'))
        }
        class={[this.ns.b(), this.ns.m('dropdown')]}
        popper-class={this.popperClass}
      >
        {{
          default: (): VNode => (
            <span class={this.ns.e('caption')}>
              {this.caption}
              <ion-icon
                class={this.ns.e('caption-icon')}
                name='ellipsis-vertical'
              />
            </span>
          ),
          dropdown: (): VNode => (
            <el-dropdown-menu>
              {details.length > 0 &&
                details.map(detail => {
                  if (this.actionsState[detail.id!].visible) {
                    return (
                      <el-dropdown-item
                        class={[
                          this.ns.e('item'),
                          this.ns.is('disabled', false),
                        ]}
                        title={showTitle(detail.tooltip)}
                        disabled={this.actionsState[detail.id!].disabled}
                        command={detail}
                      >
                        {detail.showIcon && detail.sysImage && (
                          <iBizIcon icon={detail.sysImage}></iBizIcon>
                        )}
                        {detail.showCaption ? detail.caption : ''}
                      </el-dropdown-item>
                    );
                  }
                  return null;
                })}
            </el-dropdown-menu>
          ),
        }}
      </el-dropdown>
    );
  },
});
