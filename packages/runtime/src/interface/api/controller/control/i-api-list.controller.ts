import { IDEList } from '@ibiz/model-core';
import { IApiData } from '@ibiz-template/core';
import { IApiListState } from '../../state';
import { IApiMDControlController } from './i-api-md-control.controller';

/**
 * 列表
 * @description 以列表形式展示内容，列表项整合图文、操作按钮等元素，呈现清晰的信息层级与视觉分隔。
 * @primary
 * @export
 * @interface IApiListController
 * @extends {IApiMDControlController<T, S>}
 * @ctrlparams {"name":"showmode","title":"显示模式","defaultvalue":"'DEFAULT'","parameterType":"'DEFAULT' | 'ONLYDATA' | 'MIXIN'","description":"'DEFAULT' 显示分页栏和无数据提示的文字及图片；'ONLYDATA' 仅显示数据区域，分页栏不显示，在无值时不显示无数据提示图片；'MIXIN' 无值时仅显示数据区域，不显示分页栏和无数据提示图片"}
 * @ctrlparams {name:defaultexpandall,title:默认展开所有,parameterType:boolean,defaultvalue:false,description:列表默认是否将所有分组展开显示}
 * @template T
 * @template S
 */
export interface IApiListController<
  T extends IDEList = IDEList,
  S extends IApiListState = IApiListState,
> extends IApiMDControlController<T, S> {
  /**
   * @description 获取列表全部数据
   * @returns {*}  {IApiData[]}
   * @memberof IApiListController
   */
  getAllData(): IApiData[];

  /**
   * @description 切换折叠
   * @param {{ tag: string; expand: boolean }} [params] tag：切换状态标识，expand：展开或折叠
   * @memberof IApiListController
   */
  changeCollapse(params?: { tag?: string; expand?: boolean }): void;

  /**
   * @description 滚动到顶部
   * @memberof IApiListController
   */
  scrollToTop(): void;
}
