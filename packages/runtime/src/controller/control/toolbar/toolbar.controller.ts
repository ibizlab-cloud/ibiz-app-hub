import { recursiveIterate, RuntimeError } from '@ibiz-template/core';
import {
  IDEToolbar,
  IDEToolbarItem,
  IDETBUIActionItem,
  IControlLogic,
  IDETBGroupItem,
  IUIActionGroupDetail,
} from '@ibiz/model-core';
import { ViewCallTag, ViewMode } from '../../../constant';
import {
  EventBase,
  IToolbarState,
  IToolbarEvent,
  IToolbarController,
  IExtraButton,
  IButtonState,
  IToolbarItemProvider,
} from '../../../interface';
import { getUIActionById } from '../../../model';
import { AppCounter, ControlVO } from '../../../service';
import { UIActionUtil } from '../../../ui-action';
import { ControlController } from '../../common';
import {
  ControllerEvent,
  ButtonContainerState,
  UIActionButtonState,
  formatSeparator,
} from '../../utils';
import { getToolbarItemProvider } from '../../../register';

/**
 * 工具栏控制器
 * @author lxm
 * @date 2023-03-28 06:44:26
 * @export
 * @class ToolbarController
 * @extends {ControlController<ToolbarModel>}
 */
export class ToolbarController<
    T extends IDEToolbar = IDEToolbar,
    S extends IToolbarState = IToolbarState,
    E extends IToolbarEvent = IToolbarEvent,
  >
  extends ControlController<T, S, E>
  implements IToolbarController<T, S, E>
{
  protected get _evt(): ControllerEvent<IToolbarEvent> {
    return this.evt;
  }

  /**
   * 所有工具栏项
   *
   * @author zhanghengfeng
   * @date 2024-05-15 18:05:07
   * @type {IDEToolbarItem[]}
   */
  allToolbarItems: IDEToolbarItem[] = [];

  /**
   * 工具栏项适配器集合
   *
   * @author zhanghengfeng
   * @date 2024-05-15 18:05:25
   * @type {{ [key: string]: IToolbarItemProvider }}
   */
  itemProviders: { [key: string]: IToolbarItemProvider } = {};

  /**
   * 计数器对象
   * @author ljx
   * @date 2024-12-11 17:12:35
   * @type {AppCounter}
   */
  counter?: AppCounter;

  protected initState(): void {
    super.initState();
    this.state.buttonsState = new ButtonContainerState();
    this.state.viewMode = ViewMode.EMBED;
    this.state.extraButtons = {};
    this.state.hideSeparator = [];
    this.state.counterData = {};
  }

  /**
   * 执行按钮的界面行为（如果按钮存在界面行为的话）
   *
   * @author zk
   * @date 2023-07-20 10:07:22
   * @protected
   * @param {IDEToolbarItem} item 工具栏项
   * @param {MouseEvent} event 鼠标事件
   * @param {IData} [param] 界面行为参数（界面行为点击自定义按钮可能需要传参数到行为去，标准行为忽略此参数）
   * @return {*}  {Promise<void>}
   * @memberof ToolbarController
   */
  protected async doUIAction(
    item: IDEToolbarItem,
    event: MouseEvent,
    param: IData = {},
  ): Promise<void> {
    // 执行界面行为
    if (item.itemType === 'DEUIACTION') {
      const actionId = (item as IDETBUIActionItem).uiactionId;
      const uiAction = await getUIActionById(actionId!, item.appId);
      if (!uiAction) {
        throw new RuntimeError(
          ibiz.i18n.t('runtime.controller.control.toolbar.noFound', {
            actionId,
          }),
        );
      }

      // 是否过程中启用loading
      const enableLoading =
        ['SYS', 'BACKEND', 'WFBACKEND'].includes(uiAction.uiactionMode!) &&
        uiAction.showBusyIndicator !== false;

      if (enableLoading) {
        this.state.buttonsState.setLoading(item.id!);
      }

      try {
        const args = await this.getToolbarEventArgs();
        args.params = Object.assign(param, args.params);
        await UIActionUtil.execAndResolved(
          actionId!,
          {
            ...args,
            event,
          },
          item.appId,
        );
      } finally {
        if (enableLoading) {
          this.state.buttonsState.setLoading('');
        }
      }
    }
  }

  /**
   * 获取工具栏事件参数
   *
   * @return {*}  {Omit<EventBase, 'eventName'>}
   * @memberof ToolbarController
   */
  async getToolbarEventArgs(): Promise<Omit<EventBase, 'eventName'>> {
    const { xdataControlName } = this.model;
    const result = this.getEventArgs();
    let data: IData[] = [];
    if (xdataControlName) {
      data =
        (
          this.view.getController(
            xdataControlName.toLowerCase(),
          ) as ControlController
        )?.getData() || [];
    } else {
      data = (await this.ctx.view.call(ViewCallTag.GET_DATA)) || [];
    }
    return {
      ...result,
      data,
      ctrl: this,
    };
  }

  /**
   * 初始化工具栏项适配器
   *
   * @author zhanghengfeng
   * @date 2024-05-15 18:05:08
   * @protected
   * @return {*}  {Promise<void>}
   */
  protected async initToolbarItemProviders(): Promise<void> {
    await Promise.all(
      this.allToolbarItems.map(async item => {
        const provider = await getToolbarItemProvider(item);
        if (provider) {
          this.itemProviders[item.id!] = provider;
        }
      }),
    );
  }

  /**
   * 计数器对象数据改变
   * @author ljx
   * @date 2024-12-11 15:57:00
   * @return {*}
   */
  onCounterChange(data: IData): void {
    this.state.counterData = data;
  }

  /**
   * 初始化计数器对象
   * @author ljx
   * @date 2024-12-11 15:57:00
   * @return {*}
   */
  initCounter(): void {
    const { counters } = this.ctx.view;
    const { appCounterRefs } = this.ctx.view.model.viewLayoutPanel!;
    if (appCounterRefs && appCounterRefs.length > 0) {
      const counterRefId = appCounterRefs[0].id;
      if (counterRefId && counters[counterRefId]) {
        this.counter = counters[counterRefId];
      }
    }
  }

  protected async onCreated(): Promise<void> {
    await super.onCreated();

    this.state.viewMode = this.ctx.view.modal.mode;

    // 初始化工具栏状态控制对象
    recursiveIterate(
      this.model,
      (item: IDEToolbarItem) => {
        this.allToolbarItems.push(item);
        if (item.itemType) {
          const uiItem = item as IDETBUIActionItem;
          const buttonState = new UIActionButtonState(
            uiItem.id!,
            uiItem.appId,
            uiItem.uiactionId!,
          );

          this.state.buttonsState.addState(uiItem.id!, buttonState);
        }
        // 如果有项显示逻辑默认隐藏
        if (item.controlLogics) {
          for (let i = 0; i < item.controlLogics.length; i++) {
            const controlLogic = item.controlLogics[i];
            const itemState = this.state.buttonsState[item.id!] as IButtonState;
            if (
              controlLogic.itemName === item.id &&
              controlLogic.triggerType === 'ITEMVISIBLE' &&
              itemState
            ) {
              itemState.visible = false;
              break;
            }
          }
        }
        const groupItem = item as IDETBGroupItem;
        // 适配行为组展开模式及分组项配置了界面行为组
        if (
          groupItem.groupExtractMode &&
          groupItem.uiactionGroup &&
          groupItem.uiactionGroup.uiactionGroupDetails
        ) {
          groupItem.uiactionGroup.uiactionGroupDetails.forEach(
            (detail: IUIActionGroupDetail) => {
              const actionid = detail.uiactionId;
              if (actionid) {
                const buttonState = new UIActionButtonState(
                  detail.id!,
                  detail.appId,
                  actionid,
                  detail,
                );
                this.state.buttonsState.addState(detail.id!, buttonState);
              }
            },
          );
        }
      },
      { childrenFields: ['detoolbarItems'] },
    );

    await this.initToolbarItemProviders();

    if (!this.state.manualCalcButtonState) {
      await this.calcButtonState(undefined, this.model.appDataEntityId, {
        view: this.view,
        ctrl: this,
      });
    } else {
      await this.state.buttonsState.init();
    }
  }

  /**
   * 生命周期-加载完成，实际执行逻辑，子类重写用这个
   * 放置等自身后需要等待的子组件都加载完成后才会执行的逻辑。
   * @author ljx
   * @date 2024-12-11 15:57:00
   */
  protected async onMounted(): Promise<void> {
    await super.onMounted();
    this.initCounter();
    this.counter?.onChange(this.onCounterChange.bind(this));
  }

  /**
   * 生命周期-销毁完成，实际执行逻辑，子类重写用这个
   * @author ljx
   * @date 2024-12-11 15:57:00
   */
  protected async onDestroyed(): Promise<void> {
    await super.onDestroyed();
    this.counter?.offChange(this.onCounterChange.bind(this));
    this.counter?.destroy();
  }

  /**
   * 工具栏按钮点击事件
   *
   * @author zk
   * @date 2023-07-20 03:07:29
   * @param {(IDEToolbarItem | IExtraButton)} item
   * @param {MouseEvent} event
   * @param {IData} [params] 界面行为参数（界面行为点击自定义按钮可能需要传参数到行为去，标准行为忽略此参数）
   * @return {*}  {Promise<void>}
   * @memberof ToolbarController
   */
  async onItemClick(
    item: IDEToolbarItem | IExtraButton,
    event: MouseEvent,
    params?: IData,
  ): Promise<void> {
    const isExtra = (item as IExtraButton).buttonType === 'extra';
    await this._evt.emit('onClick', {
      event,
      eventArg: item.id!,
      buttonType: isExtra ? 'extra' : 'deuiaction',
    });

    // 工具栏才走界面行为
    if (!isExtra) {
      await this.doUIAction(item, event, params);
    }
  }

  async calcButtonState(
    data?: IData,
    appDeId?: string,
    _params: IParams = {},
  ): Promise<void> {
    let _data = data;
    if (data && data instanceof ControlVO) {
      _data = data.getOrigin();
    }
    await this.state.buttonsState.update(this.context, _data, appDeId);
    // 配置是否隐藏 isHiddenItem
    this.allToolbarItems.forEach(item => {
      const itemState = this.state.buttonsState[item.id!] as IButtonState;
      if ((item as IData).hiddenItem) {
        itemState.visible = false;
      }
    });
    // 计算菜单项逻辑的预置逻辑
    if (this.scheduler) {
      const logicParams: IData = {};
      if (_params) {
        Object.assign(logicParams, { ..._params });
      }
      if (_data) {
        logicParams.data = [_data];
      }
      // 遍历所有的项
      recursiveIterate(
        this.model,
        (item: IDEToolbarItem) => {
          const itemState = this.state.buttonsState[item.id!] as IButtonState;
          if (!itemState) {
            return;
          }
          // 计算项显示逻辑
          if (itemState.visible) {
            const dynaVisible = this.scheduler!.triggerItemVisible(
              item.id!,
              logicParams,
            );
            if (dynaVisible !== undefined) {
              itemState.visible = dynaVisible;
            }
          }

          // 计算项启用逻辑
          if (!itemState.disabled) {
            const dynaEnable = this.scheduler!.triggerItemEnable(
              item.id!,
              logicParams,
            );
            if (dynaEnable !== undefined) {
              itemState.disabled = !dynaEnable;
            }
          }
        },
        { childrenFields: ['detoolbarItems'] },
      );
    }
    this.state.hideSeparator = formatSeparator(
      'TOOLBAR',
      this.model.detoolbarItems,
      this.state.buttonsState,
    );
  }

  setExtraButtons(
    position: 'before' | 'after' | number,
    buttons: IExtraButton[],
  ): void {
    if (!this.state.extraButtons[position]) {
      this.state.extraButtons[position] = [];
    }
    this.state.extraButtons[position].push(...buttons);
  }

  clearExtraButtons(position?: 'before' | 'after' | number): void {
    // 清空所有
    if (position === undefined) {
      this.state.extraButtons = {};
    } else {
      this.state.extraButtons[position] = [];
    }
  }

  protected initControlScheduler(logics: IControlLogic[] = []): void {
    const actualLogics = [...logics];
    // 遍历所有的项，如果有逻辑的话加入
    recursiveIterate(
      this.model,
      (item: IDEToolbarItem) => {
        if (item.controlLogics) {
          actualLogics.push(...item.controlLogics);
        }
      },
      { childrenFields: ['detoolbarItems'] },
    );
    super.initControlScheduler(actualLogics);
  }

  /**
   * 转换各类多语言
   *
   * @date 2023-05-18 02:57:00
   * @protected
   */
  protected convertMultipleLanguages(): void {
    const convertItemCaption = (items: IDEToolbarItem[]): void => {
      items.forEach(item => {
        if (item.capLanguageRes && item.capLanguageRes.lanResTag) {
          item.caption = ibiz.i18n.t(
            item.capLanguageRes.lanResTag,
            item.caption,
          );
        }
        if (
          item.itemType === 'ITEMS' &&
          (item as IDETBGroupItem).detoolbarItems
        ) {
          convertItemCaption((item as IDETBGroupItem).detoolbarItems!);
        }
      });
    };
    if (this.model.detoolbarItems && this.model.detoolbarItems.length > 0) {
      convertItemCaption(this.model.detoolbarItems);
    }
  }
}
