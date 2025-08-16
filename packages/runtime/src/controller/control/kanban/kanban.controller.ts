/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
/* eslint-disable prefer-destructuring */
import {
  DataTypes,
  RuntimeError,
  isElementSame,
  RuntimeModelError,
} from '@ibiz-template/core';
import { IDEKanban, IUIActionGroupDetail } from '@ibiz/model-core';
import { clone, isNil } from 'ramda';
import {
  IController,
  IKanbanEvent,
  IKanbanState,
  IKanbanSwimlane,
  IDragChangeInfo,
  MDCtrlLoadParams,
  IApiMDGroupParams,
  IKanbanController,
  IKanbanGroupState,
  IToolbarController,
} from '../../../interface';
import { calcDeCodeNameById, getParentTextAppDEFieldId } from '../../../model';
import { ControlVO } from '../../../service';
import { DataViewControlController } from '../data-view';
import { KanbanService } from './kanban.service';
import { UIActionUtil } from '../../../ui-action';

export class KanbanController
  extends DataViewControlController<IDEKanban, IKanbanState, IKanbanEvent>
  implements IKanbanController
{
  /**
   * 数据视图（卡片）部件服务
   *
   * @type {KanbanService}
   * @memberof KanbanController
   */
  declare service: KanbanService;

  /**
   * @description 是否支持全屏
   * @readonly
   * @type {boolean}
   * @memberof KanbanController
   */
  get enableFullScreen(): boolean {
    if (this.controlParams.enablefullscreen)
      return (
        this.controlParams.enablefullscreen === 'true' ||
        this.controlParams.enablefullscreen === true
      );
    return ibiz.config.kanban.enableFullScreen;
  }

  /**
   * @description 是否支持分组隐藏
   * @readonly
   * @type {boolean}
   * @memberof KanbanController
   */
  get enableGroupHidden(): boolean {
    if (this.controlParams.enablegrouphidden)
      return (
        this.controlParams.enablegrouphidden === 'true' ||
        this.controlParams.enablegrouphidden === true
      );
    return ibiz.config.kanban.enableGroupHidden;
  }

  /**
   * @description 拖拽模式
   * @readonly
   * @type {(0 | 1 | 2 | 3)} （无 | 仅分组 | 仅泳道 | 全部）
   * @memberof KanbanController
   */
  get draggableMode(): 0 | 1 | 2 | 3 {
    if (this.controlParams.draggablemode) {
      const draggablemode = Number(this.controlParams.draggablemode);
      if (!isNaN(draggablemode)) return draggablemode as any;
    }
    return 3;
  }

  /**
   * @description 获取泳道描述
   * @readonly
   * @type {(string | undefined)}
   * @memberof KanbanController
   */
  get laneDescription(): string | undefined {
    if (this.controlParams.lanedescription)
      return this.controlParams.lanedescription;
    return this.dataEntity?.logicName;
  }

  protected async initControlService(): Promise<void> {
    this.service = new KanbanService(this.model);
    await this.service.init(this.context);
  }

  protected initState(): void {
    super.initState();
    this.state.size = this.model.pagingSize || 1000;
    this.state.updating = false;
    this.state.batching = false;
    this.state.selectGroupKey = '';
    this.state.swimlanes = [];
  }

  /**
   * 初始化
   *
   * @protected
   * @return {*}  {Promise<void>}
   * @memberof KanbanController
   */
  protected async onCreated(): Promise<void> {
    await super.onCreated();
    this.setToolbarHooks();
  }

  /**
   * @description 执行分组
   * @param {IApiMDGroupParams[]} _arg
   * @param {IParams} [_params]
   * @returns {*}  {Promise<void>}
   * @memberof KanbanController
   */
  async execGroup(
    _arg: IApiMDGroupParams[],
    _params?: IParams,
  ): Promise<void> {}

  /**
   * 本地排序items
   * @author lxm
   * @date 2023-09-04 09:30:55
   * @param {IData[]} items
   */
  sortItems(items: IData[]): void {
    const { minorSortAppDEFieldId, minorSortDir } = this.model;
    if (!minorSortAppDEFieldId || !minorSortDir) return;
    const sortField = this.dataEntity?.appDEFields?.find(
      _item => _item.codeName === minorSortAppDEFieldId,
    );
    if (!sortField || !DataTypes.isNumber(sortField.stdDataType!)) {
      ibiz.log.warn(
        ibiz.i18n.t('runtime.controller.control.kanban.invalidSortType'),
      );
      return;
    }
    const isAsc = minorSortDir === 'ASC';
    // 格式化排序属性的值
    items.forEach(item => {
      const sortValue = item[minorSortAppDEFieldId];
      if (isNil(sortValue)) item[minorSortAppDEFieldId] = 0;
    });
    // 排序
    items.sort((a, b) =>
      isAsc
        ? a[minorSortAppDEFieldId] - b[minorSortAppDEFieldId]
        : b[minorSortAppDEFieldId] - a[minorSortAppDEFieldId],
    );
  }

  async afterLoad(args: MDCtrlLoadParams, items: IData[]): Promise<IData[]> {
    // 每次加载回来先本地排序，把数据的排序属性规范一下
    this.sortItems(this.state.items);
    super.afterLoad(args, items);
    this.handleLaneData();
    return items;
  }

  /**
   * 当展开批操作工具栏时需进行行点击拦截
   *
   * @param {IData} data
   * @return {*}  {Promise<void>}
   * @memberof KanbanController
   */
  async onRowClick(_data: IData): Promise<void> {
    const data = this.state.items.find(item => item.srfkey === _data.srfkey);
    if (!data) {
      return;
    }
    const { groupAppDEFieldId } = this.model;
    if (this.state.batching && groupAppDEFieldId) {
      const groupVal = data[groupAppDEFieldId];
      if (groupVal !== this.state.selectGroupKey) {
        // 激活事件
        if (this.state.mdctrlActiveMode === 1) {
          await this.setActive(data);
        }
        return;
      }
    }
    super.onRowClick(data);
  }

  /**
   * @description 点击新建并设置设置选中分组
   * @param {MouseEvent} event
   * @param {(string | number)} group 分组
   * @param {IKanbanSwimlane} [lane] 泳道
   * @memberof KanbanController
   */
  onClickNew(
    event: MouseEvent,
    group: string | number,
    lane?: IKanbanSwimlane,
  ): void {
    this.setSelectGroup(group);
    const params = { ...this.params, srfgroup: group };
    if (lane) Object.assign(params, { srflane: lane.key });
    UIActionUtil.execAndResolved(
      'new',
      {
        context: this.context,
        params,
        data: [],
        view: this.view,
        ctrl: this,
        event,
      },
      this.view.model.appId,
    );
  }

  /**
   * @description 分组工具栏点击，需携带分组
   * @param {IUIActionGroupDetail} detail
   * @param {MouseEvent} event
   * @param {IKanbanGroupState} group
   * @returns {*}  {Promise<void>}
   * @memberof KanbanController
   */
  async onGroupToolbarClick(
    detail: IUIActionGroupDetail,
    event: MouseEvent,
    group: IKanbanGroupState,
  ): Promise<void> {
    this.setSelectGroup(group.key);
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
   * @description 分组行为项点击, 需携带分组（有泳道时携带泳道）
   * @param {IUIActionGroupDetail} detail
   * @param {IData} item
   * @param {MouseEvent} event
   * @param {IKanbanGroupState} group
   * @param {IKanbanSwimlane} [lane]
   * @returns {*}  {Promise<void>}
   * @memberof KanbanController
   */
  async onGroupActionClick(
    detail: IUIActionGroupDetail,
    item: IData,
    event: MouseEvent,
    group: IKanbanGroupState,
    lane?: IKanbanSwimlane,
  ): Promise<void> {
    this.setSelectGroup(group.key);
    const params = { ...this.params, srfgroup: group };
    if (lane) Object.assign(params, { srflane: lane.key });
    const actionId = detail.uiactionId;
    await UIActionUtil.execAndResolved(
      actionId!,
      {
        context: this.context,
        params,
        data: [item],
        view: this.view,
        ctrl: this,
        event,
      },
      detail.appId,
    );
  }

  handleDataGroup(): Promise<void> {
    if (!this.model.enableGroup || this.model.groupMode === 'NONE') {
      throw new RuntimeError(
        ibiz.i18n.t('runtime.controller.control.kanban.groupedOn'),
      );
    }
    return super.handleDataGroup();
  }

  /**
   * @description 处理泳道数据
   * @returns {*}  {Promise<void>}
   * @memberof KanbanController
   */
  async handleLaneData(): Promise<void> {
    const { swimlaneCodeListId, swimlaneAppDEFieldId } = this.model;
    if (!swimlaneAppDEFieldId) return;
    let swimlanes: IKanbanSwimlane[] = [];
    const unclassified: IKanbanSwimlane = {
      count: 0,
      key: undefined,
      isExpand: true,
      caption: ibiz.i18n.t('runtime.controller.common.md.unclassified'),
    };
    const { items } = this.state;
    if (swimlaneCodeListId) {
      const app = ibiz.hub.getApp(this.context.srfappid);
      const codeListItems = await app.codeList.get(
        swimlaneCodeListId,
        this.context,
        this.params,
      );
      swimlanes = codeListItems.map(item => {
        return {
          count: 0,
          isExpand: true,
          key: item.value?.toString(),
          caption: item.text,
        };
      });
      items.forEach(item => {
        const lane = swimlanes.find(
          l => l.key === item[swimlaneAppDEFieldId]?.toLowerCase(),
        );
        if (lane) {
          lane.count += 1;
        } else {
          // 代码表没有的加入到未分类中
          unclassified.count += 1;
        }
      });
    } else {
      const textDEFieldId =
        getParentTextAppDEFieldId(swimlaneAppDEFieldId, this.dataEntity) ||
        swimlaneAppDEFieldId;
      items.forEach(item => {
        if (item[swimlaneAppDEFieldId]) {
          const lane = swimlanes.find(
            l => l.key === item[swimlaneAppDEFieldId],
          );
          if (lane) {
            lane.count += 1;
          } else {
            swimlanes.push({
              count: 1,
              isExpand: true,
              key: item[swimlaneAppDEFieldId],
              caption: item[textDEFieldId],
            });
          }
        } else {
          // 没有值的加入到未分类中
          unclassified.count += 1;
        }
      });
    }
    // 将未分类移动到最后
    if (unclassified.count) swimlanes.push(unclassified);
    this.state.swimlanes = swimlanes;
  }

  /**
   * 处理代码表分组
   *
   * @return {*}  {Promise<void>}
   * @memberof KanbanController
   */
  async handleCodeListGroup(): Promise<void> {
    const { groupAppDEFieldId, groupCodeListId } = this.model;
    if (!groupCodeListId) {
      throw new RuntimeModelError(
        this.model,
        ibiz.i18n.t('runtime.controller.control.dataView.tableNoConfigured'),
      );
    }
    const { items } = this.state;
    const groupMap: Map<string | number, IData[]> = new Map();
    this.groupCodeListItems!.forEach(item => {
      groupMap.set(item.value, []);
    });
    items.forEach((item: IData) => {
      const groupVal = item[groupAppDEFieldId!];
      const groupArr = groupMap.get(groupVal);
      if (groupArr) {
        groupArr.push(item);
      }
      // 不在代码表里数据忽略
    });

    const groups: IKanbanGroupState[] = [];
    groupMap.forEach((arr, key) => {
      // 标题
      const codeListItem = this.groupCodeListItems!.find(
        item => item.value === key,
      )!;
      groups.push({
        caption: codeListItem.text,
        color: codeListItem.color,
        key: codeListItem.value,
        children: arr,
      });
    });
    this.state.groups = groups;
  }

  /**
   * @description 拖拽变更
   * @param {IDragChangeInfo} info
   * @returns {*}  {Promise<void>}
   * @memberof KanbanController
   */
  async onDragChange(info: IDragChangeInfo): Promise<void> {
    if (!this.enableEditGroup) {
      if (info.from !== info.to) {
        ibiz.message.warning(
          ibiz.i18n.t('runtime.controller.control.kanban.adjustmentsGroup'),
        );
        return;
      }
    }
    const { from, to, fromIndex, toIndex, fromLane, toLane } = info;
    const {
      groupAppDEFieldId = '',
      moveControlAction,
      swimlaneAppDEFieldId,
      minorSortAppDEFieldId,
    } = this.model;
    const fromGroup = this.state.groups.find(x => x.key === from)!;
    const toGroup = this.state.groups.find(x => x.key === to)!;

    if (!this.enableEditOrder) {
      if (from === to && fromLane === toLane) {
        ibiz.message.warning(
          ibiz.i18n.t('runtime.controller.control.kanban.noAllowReorder'),
        );
        return;
      }

      // 只修改分组不管排序
      const draggedItem = fromGroup.children[fromIndex];
      // 变更分组
      draggedItem[groupAppDEFieldId] = to;
      // 变更泳道
      if (swimlaneAppDEFieldId) draggedItem[swimlaneAppDEFieldId] = toLane;
      return this.updateChangedItems([draggedItem] as ControlVO[]);
    }

    if (!minorSortAppDEFieldId) {
      throw new RuntimeModelError(
        this.model,
        ibiz.i18n.t('runtime.controller.control.kanban.sortingProperties'),
      );
    }

    const originArr = [...toGroup.children];
    const moveAction = moveControlAction?.appDEMethodId;

    if (!moveAction) {
      throw new RuntimeModelError(
        this.model,
        ibiz.i18n.t('runtime.controller.common.md.noMoveDataCconfig'),
      );
    }

    this.state.updating = true;
    // 计算移动数据,目标分组指定位置存在数据，则添加到目标分组指定位置之前，若没有，则添加到当前分组数据排序值最大的后面
    const computeMoveData = (
      _fromIndex: number,
      _toIndex: number,
      _draggedItem: IData,
      targetArray: IData[],
      isCrossGroup: boolean,
    ): IData => {
      let moveData = {};
      const targetItem = targetArray[_toIndex];
      if (!targetItem) {
        let tempArray: IData[] = [];
        if (targetArray.length > 0) {
          tempArray = targetArray;
        }
        if (tempArray.length > 0) {
          const maxItem = tempArray.reduce((prev, curr) => {
            const sortCondition =
              prev[minorSortAppDEFieldId] > curr[minorSortAppDEFieldId];
            if (
              sortCondition &&
              prev[this.dataEntity.keyAppDEFieldId!] !== _draggedItem.srfkey
            ) {
              return prev;
            }
            if (
              !sortCondition &&
              curr[this.dataEntity.keyAppDEFieldId!] !== _draggedItem.srfkey
            ) {
              return curr;
            }
            return prev;
          });
          if (
            maxItem &&
            maxItem[this.dataEntity.keyAppDEFieldId!] !== _draggedItem.srfkey
          ) {
            moveData = {
              srftargetkey: maxItem.srfkey,
              srfmovetype: 'MOVEAFTER',
            };
          }
        }
      } else {
        moveData = {
          srftargetkey: targetItem.srfkey,
          srfmovetype:
            _toIndex < targetArray.length - 1
              ? 'MOVEBEFORE'
              : isCrossGroup
                ? 'MOVEBEFORE'
                : 'MOVEAFTER',
        };
      }
      return moveData;
    };

    // 拖拽数据
    const draggedItem = clone(fromGroup.children[fromIndex]);

    // 前台先改值
    const removeItems = fromGroup.children.splice(fromIndex, 1);
    toGroup.children.splice(toIndex, 0, ...removeItems);

    if (info.from !== info.to) {
      // 变更分组
      draggedItem[groupAppDEFieldId] = info.to;
      // 存在移动数据行为，先变更分组再变更排序
      const app = ibiz.hub.getApp(this.model.appId);
      const deName = calcDeCodeNameById(this.model.appDataEntityId!);
      const tempContext = this.context.clone();
      tempContext[deName] = draggedItem.srfkey;
      try {
        await app.deService.exec(
          this.model.appDataEntityId!,
          'update',
          tempContext,
          draggedItem,
        );
        const index = this.state.items.findIndex(
          x => x.srfkey === draggedItem[this.dataEntity.keyAppDEFieldId!],
        );
        if (index !== -1) {
          this.state.items.splice(index, 1, draggedItem);
        }
      } catch (error) {
        this.state.updating = false;
        throw new RuntimeModelError(
          this.model,
          ibiz.i18n.t('runtime.controller.common.md.changeGroupError'),
        );
      }
    }
    // 移动排序
    const params = computeMoveData(
      fromIndex,
      toIndex,
      draggedItem,
      originArr,
      info.from !== info.to,
    );
    try {
      const { ok, result } = await this.moveOrderItem(draggedItem, params);
      if (ok) {
        // 通知实体数据变更
        this.emitDEDataChange('update', draggedItem);
        // 返回空数组不做处理，非空数组同步界面数据,无数据界面重刷新
        if (Array.isArray(result) && result.length > 0) {
          result.forEach(item => {
            const index = this.state.items.findIndex(
              x => x.srfkey === item[this.dataEntity.keyAppDEFieldId!],
            );
            if (index !== -1) {
              this.state.items[index][minorSortAppDEFieldId] =
                item[minorSortAppDEFieldId];
            }
          });
        } else {
          await this.refresh();
        }
      }
    } catch (error) {
      this.state.updating = false;
      this.actionNotification(`MOVEERROR`, {
        error: error as Error,
      });
    } finally {
      await this.afterLoad({}, this.state.items);
      this.state.updating = false;
    }
  }

  /**
   * 移动并排序数据
   *
   * @author tony001
   * @date 2024-06-17 15:06:22
   * @param {IData} draggedItem
   * @param {IData} moveMeta
   * @return {*}  {Promise<ControlVO[]>}
   */
  async moveOrderItem(
    draggedItem: IData,
    moveMeta: IData,
  ): Promise<{ ok: boolean; result?: ControlVO[] }> {
    const deName = calcDeCodeNameById(this.model.appDataEntityId!);
    const tempContext = this.context.clone();
    tempContext[deName] = draggedItem.srfkey;
    if (!moveMeta.srftargetkey || !moveMeta.srfmovetype) {
      ibiz.log.error(
        ibiz.i18n.t('runtime.controller.common.md.computeMoveMetaError'),
      );
      return { ok: false };
    }
    const res = await this.service.moveOrderItem(
      tempContext,
      draggedItem as ControlVO,
      moveMeta,
    );
    return { ok: true, result: res.data };
  }

  /**
   * 批量更新修改的项，并更新后台返回的数据，然后重新计算分组和排序
   * @author lxm
   * @date 2023-09-11 04:13:15
   * @param {ControlVO[]} changedItems
   * @return {*}  {Promise<void>}
   */
  async updateChangedItems(changedItems: ControlVO[]): Promise<void> {
    try {
      this.state.updating = true;
      await Promise.all(
        changedItems.map(async item => {
          // 往上下文添加主键
          const deName = calcDeCodeNameById(this.model.appDataEntityId!);
          const tempContext = this.context.clone();
          tempContext[deName] = item.srfkey;

          // 调用接口修改数据
          const res = await this.service.updateGroup(tempContext, item);

          // 更新完之后更新state里的数据。
          if (res.ok) {
            // 通知实体数据变更
            this.emitDEDataChange('update', res.data);
            const index = this.state.items.findIndex(
              x => x.srfkey === item.srfkey,
            );
            this.state.items.splice(index, 1, res.data);
          }
        }),
      );
    } finally {
      this.state.updating = false;
      await this.afterLoad({}, this.state.items);
    }
  }

  /**
   * 获取是否全屏
   *
   * @return {*}  {boolean}
   * @memberof KanbanController
   */
  getFullscreen(): boolean {
    const value =
      (document as IData).isFullScreen ||
      (document as IData).mozIsFullScreen ||
      (document as IData).webkitIsFullScreen;
    return value;
  }

  /**
   * 触发全屏
   *
   * @param {IData} container
   * @memberof KanbanController
   */
  onFullScreen(container: IData): boolean {
    const isFull = this.getFullscreen();
    if (!isFull) {
      if (container) {
        if (container.webkitRequestFullscreen) {
          container.webkitRequestFullscreen();
        } else if (container.mozRequestFullScreen) {
          container.mozRequestFullScreen();
        } else if (container.msRequestFullscreen) {
          container.msRequestFullscreen();
        } else if (container.requestFullscreen) {
          container.requestFullscreen();
        }
      }
    } else if ((document as IData).documentElement.requestFullScreen) {
      (document as IData).exitFullScreen();
    } else if ((document as IData).documentElement.webkitRequestFullScreen) {
      (document as IData).webkitCancelFullScreen();
    } else if ((document as IData).documentElement.mozRequestFullScreen) {
      (document as IData).mozCancelFullScreen();
    }
    return !isFull;
  }

  /**
   * 设置选中分组标识
   *
   * @param {(string | number)} key
   * @memberof KanbanController
   */
  setSelectGroup(key: string | number): void {
    if (!this.state.batching) this.state.selectGroupKey = key;
  }

  /**
   * 设置分组控制器
   *
   * @param {string} groupKey
   * @param {('quickToolbarController' | 'batchToolbarController')} name
   * @param {IToolbarController} c
   * @memberof KanbanController
   */
  setGroupController(
    groupKey: string | number,
    name: 'quickToolbarController' | 'batchToolbarController',
    c: IToolbarController,
  ): void {
    const group = this.state.groups.find(x => x.key === groupKey);
    if (group) {
      group[name] = c;
    }
  }

  /**
   * 设置工具栏hook
   *
   * @memberof KanbanController
   */
  setToolbarHooks(): void {
    this.listenNewController((name: string, c: IController) => {
      if (
        name.startsWith(`${this.model.name}_quicktoolbar`) ||
        name.startsWith(`${this.model.name}_groupquicktoolbar`)
      ) {
        this.setQuickToolbarClickHook(name, c as IToolbarController);
      }
      if (name.startsWith(`${this.model.name}_batchtoolbar`)) {
        this.setBatchToolbarClickHook(name, c as IToolbarController);
      }
    });
  }

  /**
   * 设置快捷工具栏点击事件hook
   *
   * @param {string} name
   * @param {IToolbarController} c
   * @memberof KanbanController
   */
  setQuickToolbarClickHook(name: string, c: IToolbarController): void {
    const key = name.split('quicktoolbar_')[1];
    this.setGroupController(
      key,
      'quickToolbarController',
      c as IToolbarController,
    );
    (c as IToolbarController).evt.on('onClick', (event): void => {
      const groupKey = event.targetName.split('quicktoolbar_')[1];
      this.setSelectGroup(groupKey);
      Object.assign(event.params, { srfgroup: groupKey });
    });
  }

  /**
   * 设置批工具栏点击事件hook
   *
   * @param {string} name
   * @param {IToolbarController} c
   * @memberof KanbanController
   */
  setBatchToolbarClickHook(name: string, c: IToolbarController): void {
    const key = name.split('batchtoolbar_')[1];
    this.setGroupController(
      key,
      'batchToolbarController',
      c as IToolbarController,
    );
    (c as IToolbarController).evt.on('onClick', (event): void => {
      const groupKey = event.targetName.split('batchtoolbar_')[1];
      this.setSelectGroup(groupKey);
      Object.assign(event.params, { srfgroup: groupKey });
    });
  }

  /**
   * 打开批操作工具栏
   *
   * @param {string | number} groupKey
   * @memberof KanbanController
   */
  openBatch(groupKey: string | number): void {
    this.state.selectGroupKey = groupKey;
    this.state.batching = true;
    this.state.selectedData = [];
    // 清空分组选中数据
    this.state.groups.forEach(group => {
      group.selectedData = [];
    });
  }

  /**
   * 关闭批操作工具栏
   *
   * @memberof KanbanController
   */
  closeBatch(): void {
    this.state.selectGroupKey = '';
    this.state.batching = false;
    this.state.selectedData = [];
    // 清空分组选中数据
    this.state.groups.forEach(group => {
      group.selectedData = [];
    });
  }

  /**
   * @description 设置选中
   * @param {IData[]} selection
   * @param {boolean} [isEmit=true]
   * @memberof KanbanController
   */
  setSelection(selection: IData[], isEmit: boolean = true): void {
    const { selectedData } = this.state;
    // 检查新的选中数据和旧的是否一致，不一致才变更。
    if (!isElementSame(selectedData, selection)) {
      this.state.selectedData = selection;
      if (isEmit) {
        this._evt.emit('onSelectionChange', {
          data: selection,
        });
      }
    }
    // 根据数据计算工具栏权限和状态
    const data = selection?.[0];
    const batchtoolbar = this.view.getController(
      `${this.model.name!}_batchtoolbar_${this.state.selectGroupKey}`,
    ) as IToolbarController;
    const quicktoolbar = this.view.getController(
      `${this.model.name!}_quicktoolbar_${this.state.selectGroupKey}`,
    ) as IToolbarController;
    batchtoolbar?.calcButtonState(data, this.model.appDataEntityId, {
      view: this.view,
      ctrl: this,
    });
    quicktoolbar?.calcButtonState(data, this.model.appDataEntityId, {
      view: this.view,
      ctrl: this,
    });
  }
}
