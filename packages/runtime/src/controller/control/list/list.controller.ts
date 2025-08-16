import { IDEList, IUIActionGroupDetail } from '@ibiz/model-core';
import { createUUID, isBoolean } from 'qx-util';
import { clone, isNil } from 'ramda';
import { isElementSame } from '@ibiz-template/core';
import dayjs from 'dayjs';
import {
  IListState,
  IListEvent,
  CodeListItem,
  IListController,
  MDCtrlLoadParams,
  IApiMDGroupParams,
  IMDControlGroupState,
} from '../../../interface';
import { MDControlController } from '../../common';
import { ListService } from './list.service';
import {
  formatDate,
  ButtonContainerState,
  UIActionButtonState,
} from '../../utils';
import { UIActionUtil } from '../../../ui-action';
import { getParentTextAppDEFieldId } from '../../../model';

export class ListController
  extends MDControlController<IDEList, IListState, IListEvent>
  implements IListController
{
  declare service: ListService;

  protected initState(): void {
    super.initState();
    this.state.noSort = this.model.noSort === true;
    this.state.singleSelect = this.model.singleSelect === true;
    this.state.expandedKeys = [];
    const { enablePagingBar } = this.model;
    this.state.enablePagingBar = enablePagingBar;
    this.state.uaState = {};
  }

  protected async onCreated(): Promise<void> {
    await super.onCreated();
    this.state.size = this.model.pagingSize || 20;
    this.service = new ListService(this.model);
    await this.service.init(this.context);
  }

  /**
   * @description 初始化分组界面行为组
   * @return {*}  {Promise<void>}
   * @memberof ListController
   */
  async initGroupActionStates(): Promise<void> {
    const { groupUIActionGroup } = this.model;
    if (!groupUIActionGroup?.uiactionGroupDetails?.length) {
      return;
    }
    this.state.groups.forEach(async group => {
      const containerState = new ButtonContainerState();
      groupUIActionGroup.uiactionGroupDetails!.forEach(detail => {
        const actionid = detail.uiactionId;
        if (actionid) {
          const buttonState = new UIActionButtonState(
            detail.id!,
            this.context.srfappid!,
            actionid,
            detail,
          );
          containerState.addState(detail.id!, buttonState);
        }
      });
      await containerState.update(
        this.context,
        undefined,
        this.model.appDataEntityId,
      );
      group.groupActionGroupState = containerState;
    });
  }

  /**
   * @description 分组界面行为点击
   * @param {IUIActionGroupDetail} detail
   * @param {MouseEvent} event
   * @param {IMDControlGroupState} group
   * @return {*}  {Promise<void>}
   * @memberof ListController
   */
  async onGroupToolbarClick(
    detail: IUIActionGroupDetail,
    event: MouseEvent,
    group: IMDControlGroupState,
  ): Promise<void> {
    const actionId = detail.uiactionId;
    const params = { ...this.params, srfgroup: group.key };
    await UIActionUtil.execAndResolved(
      actionId!,
      {
        context: this.context,
        params,
        data: group.selectedData || [],
        view: this.view,
        ctrl: this,
        event,
      },
      detail.appId,
    );
  }

  /**
   * 获取部件默认排序模型
   * @return {*}
   * @author: zhujiamin
   * @Date: 2023-12-28 18:43:27
   */
  getSortModel(): {
    minorSortAppDEFieldId: string | undefined;
    minorSortDir: string | undefined;
  } {
    return {
      minorSortAppDEFieldId: this.model.minorSortAppDEFieldId,
      minorSortDir: this.model.minorSortDir,
    };
  }

  /**
   * 计算表格展示模式
   * @author fzh
   * @date 2024-05-29 19:18:42
   * @return {*}  {void}
   */
  calcShowMode(items: IData): void {
    const { enablePagingBar } = this.model;
    this.state.hideNoDataImage = false;
    this.state.enablePagingBar = enablePagingBar;
    // SHOWMODE = 'DEFAULT'|'ONLYDATA'|'MIXIN'
    // DEFAULT  默认逻辑
    const showmode = this.controlParams.showmode || 'DEFAULT';

    // ONLYDATA 无论有无数据 仅仅显示数据区域，表格头和分页栏都不要
    if (showmode === 'ONLYDATA') {
      this.state.enablePagingBar = false;
      if (items.length === 0) {
        this.state.hideNoDataImage = true;
      }
    }

    // MIXIN 无数据时，仅仅显示数据区域，表格头和分页栏都不要；有数据时，展示还是和默认一样
    if (showmode === 'MIXIN') {
      if (items.length === 0) {
        this.state.enablePagingBar = false;
        this.state.hideNoDataImage = true;
      }
    }
  }

  /**
   * 滚动到顶部
   *
   * @memberof ListController
   */
  scrollToTop(): void {
    this.evt.emit('onScrollToTop', undefined);
  }

  /**
   * 特殊处理，加载模式为滚动加载或者点击加载，刷新时加载数据条数为分页乘以默认条数
   *
   * @return {*}  {Promise<void>}
   * @memberof ListController
   */
  async refresh(): Promise<void> {
    const param: IData = {
      isInitialLoad: false,
    };
    if (this.model.pagingMode === 2 || this.model.pagingMode === 3) {
      const size = this.state.size * this.state.curPage;
      Object.assign(param, { viewParam: { page: 0, size } });
    }
    this.doNextActive(() => this.load(param), {
      key: 'refresh',
    });
  }

  async afterLoad(args: MDCtrlLoadParams, items: IData[]): Promise<IData[]> {
    super.afterLoad(args, items);
    await this.handleDataGroup();
    await this.initGroupActionStates();
    await this.calcOptItemState(items);
    this.calcShowMode(items);
    return items;
  }

  /**
   * @description 获取操作项行为集合模型
   * @returns {*}  {IUIActionGroupDetail[]}
   * @memberof DataViewControlController
   */
  getOptItemModel(): IUIActionGroupDetail[] {
    const actions: IUIActionGroupDetail[] = [];
    const { delistItems } = this.model;
    delistItems?.forEach(item => {
      if (
        item.itemType === 'ACTIONITEM' &&
        item.deuiactionGroup &&
        item.deuiactionGroup.uiactionGroupDetails
      ) {
        actions.push(...item.deuiactionGroup.uiactionGroupDetails);
      }
    });
    return actions;
  }

  /**
   * @description 计算操作项状态
   * @param {IData[]} items
   * @returns {*}  {Promise<void>}
   * @memberof DataViewControlController
   */
  async calcOptItemState(items: IData[]): Promise<void> {
    const actions = this.getOptItemModel();
    if (actions.length)
      await Promise.all(
        items.map(async item => {
          const containerState = new ButtonContainerState();
          actions.forEach((action: IData) => {
            const actionid = action.uiactionId;
            if (actionid) {
              const buttonState = new UIActionButtonState(
                action.id!,
                this.context.srfappid!,
                actionid,
              );
              containerState.addState(action.id!, buttonState);
            }
          });
          await containerState.update(
            this.context,
            item.getOrigin(),
            this.model.appDataEntityId,
          );
          this.state.uaState[item.srfkey] = containerState;
        }),
      );
  }

  /**
   * @description 行为点击
   * @param {IUIActionGroupDetail} detail
   * @param {IData} item
   * @param {MouseEvent} event
   * @returns {*}  {Promise<void>}
   * @memberof ListController
   */
  async onActionClick(
    detail: IUIActionGroupDetail,
    item: IData,
    event: MouseEvent,
  ): Promise<void> {
    const actionId = detail.uiactionId;
    await UIActionUtil.execAndResolved(
      actionId!,
      {
        context: this.context,
        params: this.params,
        data: [item],
        view: this.view,
        ctrl: this,
        event,
      },
      detail.appId,
    );
  }

  /**
   * 设置列表数据
   *
   * @author zk
   * @date 2023-05-26 02:05:46
   * @param {IData[]} items
   * @memberof ListController
   */
  setData(items: IData[]): void {
    this.state.items = items;
  }

  /**
   * 获取列表数据
   *
   * @author zk
   * @date 2023-05-26 02:05:35
   * @return {*}  {IData[]}
   * @memberof ListController
   */
  getAllData(): IData[] {
    return this.state.items;
  }

  /**
   * @description 执行多数据分组
   * @param {IApiMDGroupParams[]} [arg] 分组参数集合（多层分组暂未支持）
   * @param {IParams} [_params]
   * @returns {*}  {Promise<void>}
   * @memberof ListController
   */
  async execGroup(arg: IApiMDGroupParams[], _params?: IParams): Promise<void> {
    const group = arg[0];
    (this as IData).model = clone(this.model);
    this.model.groupMode = 'AUTO';
    if (!group || !group.groupFieldId) {
      this.state.groups = [];
      this.model.groupMode = 'NONE';
      this.state.enableGroup = false;
      this.model.groupCodeListId = undefined;
      this.model.groupAppDEFieldId = undefined;
      this.groupDateFormat = [];
    } else if (
      group.groupFieldId !== this.model.groupAppDEFieldId ||
      (group.dateFormat &&
        !isElementSame(group.dateFormat, this.groupDateFormat))
    ) {
      // 分组属性变更或日期格式不同时才重新初始化分组
      this.state.enableGroup = true;
      this.model.groupAppDEFieldId = group.groupFieldId;
      this.model.groupCodeListId = group.groupCodeListId;
      this.groupDateFormat = group.dateFormat || [];
      await this.handleDataGroup();
    }
  }

  /**
   * 处理数据分组
   *
   * @memberof DataViewControlController
   */
  protected async handleDataGroup(): Promise<void> {
    const { groupMode } = this.model;
    const { enableGroup } = this.state;
    if (enableGroup && groupMode) {
      if (groupMode === 'AUTO') {
        await this.handleAutoGroup();
      } else if (groupMode === 'CODELIST') {
        await this.handleCodeListGroup();
      }
    }
    if (this.controlParams.defaultexpandall === 'true') {
      this.state.expandedKeys = this.state.groups.map(x => x.key.toString());
    }
  }

  /**
   * 处理自动分组
   *
   * @memberof DataViewControlController
   */
  protected async handleAutoGroup(): Promise<void> {
    const { groupAppDEFieldId, groupCodeListId } = this.model;
    // 自动分组且存在代码表时，使用代码表做一次转换
    let codeList: readonly CodeListItem[] = [];
    if (groupCodeListId) {
      const app = ibiz.hub.getApp(this.context.srfappid);
      codeList = await app.codeList.get(
        groupCodeListId,
        this.context,
        this.params,
      );
    }
    if (groupAppDEFieldId) {
      const { items } = this.state;
      const textDEFieldId =
        getParentTextAppDEFieldId(groupAppDEFieldId, this.dataEntity) ||
        groupAppDEFieldId;
      const dateFormat = this.groupDateFormat[0];
      const groupMap: Map<string, IData[]> = new Map();
      const unclassified: IMDControlGroupState = {
        key: createUUID(),
        caption: ibiz.i18n.t('runtime.controller.common.md.unclassified'),
        children: [],
      };
      items.forEach((item: IData) => {
        let groupVal = item[textDEFieldId];
        // 特殊处理日期格式化
        if (dateFormat) groupVal = formatDate(groupVal, dateFormat);

        // 当分组样式为 STYLE2 且 groupVal 是有效的日期时，默认以天为单位格式化分组值
        if (this.model.groupStyle === 'STYLE2' && dayjs(groupVal).isValid()) {
          groupVal = formatDate(groupVal, 'day');

          // 如果分组标题时间与当前时间相同，则以 今天 显示分组标题
          if (dayjs(groupVal).isSame(dayjs(), 'day'))
            groupVal = ibiz.i18n.t(`runtime.controller.common.md.today`);
        }
        // 分组无值默认归为未分类
        if (isNil(groupVal)) {
          unclassified.children.push(item);
          return;
        }
        const children = groupMap.get(groupVal) || [];
        children.push(item);
        groupMap.set(groupVal, children);
      });
      const groups: IMDControlGroupState[] = [];
      groupMap.forEach((value: IData[], key: string) => {
        const codeListItem = codeList.find(x => x.value === key);
        groups.push({
          caption: codeListItem?.text || key,
          key,
          children: [...value],
        });
      });
      // 将未分类放到最后
      if (unclassified.children.length) groups.push(unclassified);
      this.state.groups = groups;
    }
  }

  /**
   * 处理代码表分组
   *
   * @memberof DataViewControlController
   */
  protected async handleCodeListGroup(): Promise<void> {
    const { groupAppDEFieldId, groupCodeListId } = this.model;
    if (groupAppDEFieldId && groupCodeListId) {
      const { items } = this.state;
      const groups: IMDControlGroupState[] = [];
      const app = ibiz.hub.getApp(this.context.srfappid);
      const codeList = await app.codeList.get(
        groupCodeListId,
        this.context,
        this.params,
      );
      const keys: string[] = [];
      codeList.forEach((codeListItem: CodeListItem) => {
        const value = items.filter(
          (item: IData) => item[groupAppDEFieldId] === codeListItem.value,
        );
        groups.push({
          caption: codeListItem.text,
          key: codeListItem.value,
          children: [...value],
        });
        keys.push(codeListItem.value as string);
      });
      const otherGroup = items.filter(
        (item: IData) => keys.indexOf(item[groupAppDEFieldId]) === -1,
      );
      if (otherGroup.length > 0) {
        groups.push({
          caption: ibiz.i18n.t('runtime.controller.common.md.unclassified'),
          key: ibiz.i18n.t('runtime.controller.common.md.unclassified'),
          children: [...otherGroup],
        });
      }
      this.state.groups = groups;
    }
  }

  /**
   * @description 切换分组折叠
   * @param {IData} [params={}]
   * @memberof ListController
   */
  changeCollapse(params: IData = {}): void {
    const { tag, expand } = params;
    if (tag) {
      const expandedKeysSet = new Set(this.state.expandedKeys);
      const expanded = isBoolean(expand) ? expand : !expandedKeysSet.has(tag);
      if (expanded) {
        expandedKeysSet.add(tag);
      } else {
        expandedKeysSet.delete(tag);
      }
      this.state.expandedKeys = Array.from(expandedKeysSet);
    } else if (expand) {
      this.state.expandedKeys = this.state.groups.map(x => x.key.toString());
    } else {
      this.state.expandedKeys = [];
    }
  }
}
