import {
  findRecursiveChild,
  RuntimeError,
  RuntimeModelError,
} from '@ibiz-template/core';
import { IAppMenu, IAppMenuItem } from '@ibiz/model-core';
import { AppFuncCommand } from '../../../command';
import {
  IAppMenuState,
  IAppMenuEvent,
  IAppMenuController,
  IAppService,
  IAppMenuItemProvider,
} from '../../../interface';
import { AppCounter } from '../../../service';
import { ControlController } from '../../common';
import { getAppMenuItemProvider } from '../../../register';
import { CTX } from '../../ctx';
import { CustomAppMenuController } from './custom-app-menu.controller';

/**
 * 应用菜单控制器
 *
 * @author chitanda
 * @date 2022-07-24 15:07:07
 * @export
 * @class AppMenuController
 * @extends {ControlController}
 */
export class AppMenuController
  extends ControlController<IAppMenu, IAppMenuState, IAppMenuEvent>
  implements IAppMenuController
{
  app!: IAppService;

  protected initState(): void {
    super.initState();
    this.state.menuItemsState = {};
    this.state.mobMenuItems = [];
  }

  /**
   * 所有菜单项，平铺开
   * @author lxm
   * @date 2023-12-29 02:43:35
   * @type {IAppMenuItem[]}
   */
  allAppMenuItems!: IAppMenuItem[];

  /**
   * 菜单项适配器集合
   * @author lxm
   * @date 2023-07-19 04:14:50
   * @type {{ [key: string]: IProvider }}
   */
  itemProviders: { [key: string]: IAppMenuItemProvider } = {};

  /**
   * 自定义菜单控制器
   *
   * @type {(CustomAppMenuController | null)}
   * @memberof AppMenuController
   */
  customController: CustomAppMenuController | null = null;

  /**
   * 自定义配置
   *
   * @type {IData[]}
   * @memberof AppMenuController
   */
  public saveConfigs: IData[] = [];

  /**
   * 视图层级
   *
   * @readonly
   * @type {(number | undefined)}
   * @memberof AppMenuController
   */
  get routeDepth(): number | undefined {
    return this.view.modal.routeDepth;
  }

  constructor(model: IAppMenu, context: IContext, params: IParams, ctx: CTX) {
    super(model, context, params, ctx);
    this.flattenAllItems();
    if (model.enableCustomized) {
      this.customController = new CustomAppMenuController(model, this);
    }
  }

  protected async onCreated(): Promise<void> {
    await super.onCreated();
    this.app = await ibiz.hub.getApp(this.context.srfappid);
    await this.initAppMenuItemProviders();

    // 初始化菜单项状态
    this.model.appMenuItems?.forEach(item => {
      this.initMenuItemState(item);
    });

    // 加载菜单自定义配置
    if (this.customController) {
      await this.loadCustomMenusModel();
    }
    if (ibiz.env.isMob) {
      this.initMobMenuItems();
    }
  }

  /**
   * 加载自定义菜单模型
   *
   * @private
   * @return {*}  {Promise<void>}
   * @memberof AppMenuController
   */
  private async loadCustomMenusModel(): Promise<void> {
    const customConfigs = await this.customController!.loadCustomModelData();
    if (!customConfigs || customConfigs.length === 0) {
      this.saveConfigs = [];
    } else {
      this.saveConfigs = customConfigs;
    }
  }

  /**
   * 初始化移动端菜单项
   *
   * @memberof AppMenuController
   */
  initMobMenuItems(): void {
    // 所有可见菜单项
    const menuItems =
      this.model.appMenuItems?.filter(
        item =>
          item.hidden !== true &&
          item.itemType === 'MENUITEM' &&
          this.state.menuItemsState[item.id!].visible,
      ) || [];
    let mobMenuItems: IAppMenuItem[] = [];
    if (this.model.enableCustomized) {
      if (this.saveConfigs.length > 0) {
        this.saveConfigs.forEach(item => {
          const menu = menuItems.find(_item => item.id === _item.id);
          if (menu) mobMenuItems.push(menu);
        });
      } else {
        mobMenuItems = menuItems.slice(0, 4);
      }
    } else {
      mobMenuItems = menuItems;
    }
    this.state.mobMenuItems = mobMenuItems;
  }

  /**
   * 初始化菜单项的适配器
   * @author lxm
   * @date 2023-12-29 02:50:20
   * @protected
   * @return {*}  {Promise<void>}
   */
  protected async initAppMenuItemProviders(): Promise<void> {
    await Promise.all(
      this.allAppMenuItems.map(async item => {
        const provider = await getAppMenuItemProvider(item);
        if (provider) {
          this.itemProviders[item.id!] = provider;
        }
      }),
    );
  }

  /**
   * 菜单项点击回调，触发对应的应用功能
   *
   * @author chitanda
   * @date 2022-12-22 14:12:53
   * @param {string} id
   * @return {*}  {Promise<void>}
   */
  async onClickMenuItem(
    id: string,
    event?: MouseEvent,
    useDepth: boolean = true,
    opts: IData = {},
  ): Promise<void> {
    const menuItem = findRecursiveChild(this.model, id, {
      compareField: 'id',
      childrenFields: ['appMenuItems'],
    }) as IAppMenuItem;
    if (!menuItem) {
      throw new RuntimeError(
        ibiz.i18n.t('runtime.controller.control.menu.noFindMenu', { id }),
      );
    }

    this.evt.emit('onClick', {
      eventArg: id,
      event,
    });

    // 如果有适配器，走适配器的点击处理
    const provider = this.itemProviders[id];
    if (provider && provider.onClick) {
      return provider.onClick(menuItem, event as MouseEvent, this);
    }

    if (!menuItem.appFuncId) {
      throw new RuntimeModelError(
        menuItem,
        ibiz.i18n.t('runtime.controller.control.menu.noConfigured'),
      );
    }

    const tempContext = this.context.clone();
    tempContext.srfappid = menuItem.appId || ibiz.env.appId;
    if (this.routeDepth && useDepth) {
      Object.assign(tempContext, {
        toRouteDepth: this.routeDepth + 1,
      });
    }

    const param = { ...this.params };

    if (ibiz.config.appMenu.echoMode === 'MENUITEM')
      Object.assign(param, { srfmenuitem: id });

    await ibiz.commands.execute(
      AppFuncCommand.TAG,
      menuItem.appFuncId,
      tempContext,
      param,
      { ...opts, view: this.view },
    );
  }

  /**
   * 初始化菜单项状态
   *
   * @author lxm
   * @date 2022-10-12 20:10:37
   * @param {AppMenuItemModel} menu
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initMenuItemState(menu: IAppMenuItem): {
    visible: boolean;
    permitted: boolean;
  } {
    const result = { permitted: true, visible: true };
    if (menu.hidden) {
      result.visible = false;
    } else {
      let permitted = true;
      if (menu.accessKey) {
        permitted = this.app.authority.calcByResCode(menu.accessKey);
      }
      let visible = permitted;
      // 有子的计算子状态，如果本身显示但是子都不显示则不显示
      if (menu.appMenuItems?.length) {
        const childrenState = menu.appMenuItems.map(child => {
          return this.initMenuItemState(child).visible;
        });
        visible = visible && childrenState.includes(true);
      }
      result.permitted = permitted;
      result.visible = visible;
    }
    this.state.menuItemsState[menu.id!] = result;
    return result;
  }

  /**
   * 所有项平铺
   * @author lxm
   * @date 2023-12-29 02:42:39
   * @protected
   */
  protected flattenAllItems(): void {
    const result: IAppMenuItem[] = [];
    const flattenMenus = (menuItems: IAppMenuItem[]): void => {
      menuItems.forEach(item => {
        result.push(item);
        if (item.appMenuItems && item.appMenuItems.length > 0) {
          flattenMenus(item.appMenuItems);
        }
      });
    };
    flattenMenus(this.model.appMenuItems!);
    this.allAppMenuItems = result;
  }

  /**
   * 所有项平铺
   * @return {*}
   * @author: zhujiamin
   * @Date: 2022-09-09 16:48:21
   */
  getAllItems(): IAppMenuItem[] {
    return this.allAppMenuItems;
  }

  /**
   * 根据id去视图控制器里取得计数器对象
   * @return {*}
   * @author: zhujiamin
   * @Date: 2023-07-10 15:14:21
   */
  getCounter(id: string): AppCounter | null {
    const { counters } = this.ctx.view;
    if (counters[id]) {
      return counters[id];
    }
    return null;
  }

  /**
   * 转换各类多语言
   *
   * @date 2023-05-18 02:57:00
   * @protected
   */
  protected convertMultipleLanguages(): void {
    const convertItemCaption = (menuItems: IAppMenuItem[]): void => {
      menuItems.forEach((item: IAppMenuItem) => {
        if (item.capLanguageRes && item.capLanguageRes.lanResTag) {
          item.caption = ibiz.i18n.t(
            item.capLanguageRes.lanResTag,
            item.caption,
          );
        }
        if (item.appMenuItems?.length) {
          convertItemCaption(item.appMenuItems);
        }
      });
    };
    if (this.model.appMenuItems && this.model.appMenuItems.length > 0) {
      convertItemCaption(this.model.appMenuItems);
    }
  }

  /**
   * 获取默认打开视图
   *
   * @return {*}  {(string | undefined)}
   * @memberof AppMenuController
   */
  getDefaultOpenView(): string | undefined {
    const menu = this.getAllItems().find(
      item => item.openDefault && !item.hidden,
    );
    if (!menu || !menu.appFuncId) return;
    const appFunc = ibiz.hub.getApp(menu.appId).getAppFunc(menu.appFuncId);
    return appFunc?.appFuncType === 'APPVIEW' ? appFunc.appViewId : undefined;
  }
}
