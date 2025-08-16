import {
  IApiTabSearchViewCall,
  ISearchBarController,
  ISearchFormController,
  ITabExpPanelController,
  ITabSearchViewEvent,
  ITabSearchViewState,
  SysUIActionTag,
  ViewController,
} from '@ibiz-template/runtime';
import { IAppDETabSearchView, IDETabViewPanel } from '@ibiz/model-core';
import { TabExpViewEngine } from './tab-exp-view.engine';

/**
 * 编辑视图3（分页关系）
 *
 * @export
 * @class TabSearchViewEngine
 * @extends {EditViewEngine}
 */
export class TabSearchViewEngine extends TabExpViewEngine {
  /**
   * 视图控制器
   *
   * @protected
   * @type {ViewController<
   *     IAppDETabSearchView,
   *     ITabSearchViewState,
   *     ITabSearchViewEvent
   *   >}
   * @memberof TabSearchViewEngine
   */
  protected declare view: ViewController<
    IAppDETabSearchView,
    ITabSearchViewState,
    ITabSearchViewEvent
  >;

  /**
   * 搜索表单控制器
   * @author lxm
   * @date 2023-05-22 01:56:25
   * @readonly
   */
  protected get searchForm(): ISearchFormController {
    return this.view.getController('searchform') as ISearchFormController;
  }

  /**
   * 搜索栏控制器
   * @author lxm
   * @date 2023-05-22 01:56:25
   * @readonly
   */
  protected get searchBar(): ISearchBarController {
    return this.view.getController('searchbar') as ISearchBarController;
  }

  /**
   * 分页导航面板控制器
   * @author lxm
   * @date 2023-05-22 01:56:25
   * @readonly
   */
  public get tabExpPanel(): ITabExpPanelController {
    return this.view.getController('tabexppanel') as ITabExpPanelController;
  }

  protected preprocessTabExpModelLayout(): void {
    // 不进行模型处理
  }

  async onCreated(): Promise<void> {
    await super.onCreated();
    const { childNames } = this.view;
    childNames.push('searchform', 'searchbar');
  }

  async onMounted(): Promise<void> {
    await super.onMounted();
    // 计算是否默认展开搜索表单
    const controller = this.viewLayoutPanel!.panelItems.view_searchform;
    if (controller) {
      const formExists = !!this.searchForm;
      controller.state.keepAlive = formExists;
      controller.state.visible = formExists;
    }

    const searchbarC = this.viewLayoutPanel!.panelItems.view_searchbar;
    if (searchbarC) {
      const visible =
        this.searchBar &&
        !!(
          this.searchBar.model.enableQuickSearch ||
          this.searchBar.model.enableGroup ||
          this.searchBar.model.enableFilter === true
        );
      searchbarC.state.visible = visible;
    }

    // 搜索表单搜索触发加载
    if (this.searchForm) {
      this.searchForm.evt.on('onSearch', () => {
        this.calcViewParams();
      });
    }

    // 搜索栏搜索触发加载
    if (this.searchBar) {
      this.searchBar.evt.on('onSearch', () => {
        this.calcViewParams();
      });
    }
    // 分页导航面板切换
    if (this.tabExpPanel) {
      this.tabExpPanel.evt.on(
        'onTabChange',
        ({ tab }: { tab: IDETabViewPanel }) => {
          this.calcViewParams();
          this.onQuickSearchPlaceHolder(tab);
        },
      );

      // 适配onTabChange第一次抛值时onMouted没有执行完毕
      const { activeTabViewPanelModel } = this.tabExpPanel as IParams;
      if (activeTabViewPanelModel) {
        this.onQuickSearchPlaceHolder(activeTabViewPanelModel);
      }
    }
  }

  /**
   * 给快捷搜索赋默认提示值
   * @author ljx
   * @date 2024-11-12 10:56:25
   * @return {*}  {Promise<void>}
   * @memberof TabSearchViewEngine
   */
  async onQuickSearchPlaceHolder(tab: IDETabViewPanel): Promise<void> {
    let { caption } = tab;
    const viewConfig = await ibiz.hub.config.view.get(
      tab.embeddedAppDEViewId || '',
    );
    const appDataEntity = await ibiz.hub.getAppDataEntity(
      viewConfig.appDataEntityId!,
      viewConfig.appId,
    );

    if (appDataEntity) {
      const searchFields = appDataEntity.appDEFields!.filter(field => {
        return field.enableQuickSearch;
      });
      if (searchFields.length) {
        const placeHolders: string[] = [];
        searchFields.forEach(searchField => {
          if (
            searchField.lnlanguageRes &&
            searchField.lnlanguageRes.lanResTag
          ) {
            placeHolders.push(
              ibiz.i18n.t(
                searchField.lnlanguageRes.lanResTag,
                searchField.logicName,
              ),
            );
          } else if (searchField.logicName) {
            placeHolders.push(searchField.logicName);
          }
        });
        if (placeHolders.length > 0) {
          caption = placeHolders.join('、');
        }
      }
    }

    // 直接赋值 caption
    (this.searchBar as IParams).placeHolder = caption || '';
    this.searchBar.state.quickSearchPlaceHolder = caption || '';
  }

  async call(
    key: keyof IApiTabSearchViewCall,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    args: any,
  ): Promise<IData | null | undefined> {
    if (key === SysUIActionTag.SEARCH) {
      await this.searchForm.search();
      return null;
    }
    if (key === SysUIActionTag.RESET) {
      await this.searchForm.reset();
      return null;
    }
    if (key === SysUIActionTag.REFRESH) {
      await this.calcViewParams();
      return null;
    }
    return super.call(key, args);
  }

  /**
   * 获取搜索相关的查询参数
   * @author lxm
   * @date 2023-05-22 03:26:04
   * @return {*}  {IParams}
   */
  protected getSearchParams(): IParams {
    const params: IParams = {};
    // 有搜索表单的整合相关参数
    if (this.searchForm) {
      Object.assign(params, this.searchForm.getFilterParams());
    }
    // 有搜索栏的整合相关参数
    if (this.searchBar) {
      Object.assign(params, this.searchBar.getFilterParams());
    }
    return params;
  }

  /**
   * 计算视图头部元素的显示与否
   * 所有部件容器名称均为：view_部件名称
   * - 注意 分页导航和分页搜索的默认布局不一致
   *
   *   分页导航：分页导航栏在视图头中
   *
   *   分页搜索：分页导航栏不在视图头中
   * @protected
   */
  protected calcViewHeaderVisible(): boolean {
    let showHeader: boolean = false;
    const { model } = this.view;

    // 标题栏
    if (model.showCaptionBar) {
      showHeader = true;
    }
    if (ibiz.env.isMob) {
      if (this.isExistAndInLayout('lefttoolbar')) {
        showHeader = true;
      }

      if (this.isExistAndInLayout('righttoolbar')) {
        showHeader = true;
      }
    } else if (this.isExistAndInLayout('toolbar')) {
      showHeader = true;
    }
    return showHeader;
  }

  /**
   * 重新计算视图参数
   * @author lxm
   * @date 2024-03-18 05:00:02
   */
  calcViewParams(): void {
    this.tabExpPanel.state.expViewParams = this.getSearchParams();
    this.tabExpPanel.refresh();
  }
}
