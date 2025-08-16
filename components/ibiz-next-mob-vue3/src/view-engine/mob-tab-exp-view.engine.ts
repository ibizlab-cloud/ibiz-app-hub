/* eslint-disable no-case-declarations */
import { IPortalMessage } from '@ibiz-template/core';
import {
  ViewController,
  ITabExpPanelController,
  ITabExpViewEvent,
  ITabExpViewState,
  ViewEngineBase,
  calcDeCodeNameById,
} from '@ibiz-template/runtime';
import { IAppDataEntity, IAppDETabExplorerView } from '@ibiz/model-core';

export class MobTabExpViewEngine extends ViewEngineBase {
  /**
   * 分页面板视图控制器
   *
   * @author zk
   * @date 2023-06-19 10:06:00
   * @protected
   * @type {ViewController<
   *     IAppDETabExplorerView,
   *     ITabExpViewState,
   *     ITabExpViewEvent
   *   >}
   * @memberof MobTabExpViewEngine
   */
  protected declare view: ViewController<
    IAppDETabExplorerView,
    ITabExpViewState,
    ITabExpViewEvent
  >;

  /**
   * 分页导航面板
   *
   * @author zk
   * @date 2023-06-19 10:06:15
   * @readonly
   * @memberof MobTabExpViewEngine
   */
  get tabExpPanel(): ITabExpPanelController {
    return this.view.getController('tabexppanel') as ITabExpPanelController;
  }

  /**
   * @description 当前多数据部件对应的应用实体对象
   * @protected
   * @type {IAppDataEntity}
   * @memberof MobTreeExpViewEngine
   */
  protected dataEntity!: IAppDataEntity;

  /**
   * 视图created生命周期执行逻辑
   *
   * @author zk
   * @date 2023-06-19 10:06:22
   * @return {*}  {Promise<void>}
   * @memberof MobTabExpViewEngine
   */
  async onCreated(): Promise<void> {
    await super.onCreated();
    const { childNames } = this.view;
    childNames.push('tabexppanel');
    if (!this.view.slotProps.tabexppanel) {
      this.view.slotProps.tabexppanel = {};
    }
    this.view.slotProps.tabexppanel.defaultTabName = this.view.state.srfnav;
    if (this.view.model.appDataEntityId) {
      // 初始化实体属性id和name的映射
      this.dataEntity = await ibiz.hub.getAppDataEntity(
        this.view.model.appDataEntityId!,
        this.view.model.appId,
      );
    }
  }

  /**
   * 视图mounted生命周期执行逻辑
   *
   * @return {*}  {Promise<void>}
   * @memberof MobTabExpViewEngine
   */
  async onMounted(): Promise<void> {
    await super.onMounted();
    await this.loadEntityData();
  }

  /**
   * 加载实体数据
   *
   * @return {*}  {Promise<void>}
   * @memberof MobTabExpViewEngine
   */
  async loadEntityData(): Promise<void> {
    // 分页导航没有主键不加载
    const deName = calcDeCodeNameById(this.view.model.appDataEntityId!);
    if (!this.view.context[deName]) {
      return;
    }
    return super.loadEntityData();
  }

  /**
   * @description 检测实体数据变更
   * @protected
   * @param {IPortalMessage} msg
   * @return {*}  {void}
   * @memberof MobTreeExpViewEngine
   */
  protected onDEDataChange(msg: IPortalMessage): void {
    // 非这个实体的数据变更，则不处理
    if (
      !msg.data ||
      (msg.data as IData).srfdecodename !== this.dataEntity?.codeName
    ) {
      return;
    }

    let isRefresh = false;
    const { srfkey } = msg.data as IData;

    // 只监听更新事件
    switch (msg.subtype) {
      case 'OBJECTUPDATED':
        const { srfactiveviewdata } = this.view.state;
        if (srfactiveviewdata && srfactiveviewdata.srfkey === srfkey) {
          isRefresh = true;
        }
        break;
      default:
        break;
    }

    if (isRefresh) {
      this.loadEntityData();
    }
  }
}
