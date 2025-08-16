import { IDRTab } from '@ibiz/model-core';
import { IApiData } from '@ibiz-template/core';
import { IApiDRTabState } from '../../state';
import { IApiControlController } from './i-api-control.controller';

/**
 * 数据关系分页
 * @description 使用标签页的方式绘制多个视图页面，点击标签页即可实现页面切换。
 * @primary
 * @export
 * @interface IDRTabController
 * @extends {IApiControlController<T, S>}
 * @ctrlparams {name:srfcachepos,title:启用缓存,parameterType:boolean,defaultvalue:false,description:当设置为true时启用缓存激活分页标识功能,effectPlatform:web}
 * @ctrlparams {name:srfcachekeytempl,title:缓存标记,parameterType:string,description:当`srfcachepos`值为true且当前视图状态对象中无导航数据时，此功能生效。在初始化关系分页数据时，若 localStorage 中存在此缓存标记的缓存值，则可根据该值确定激活项,effectPlatform:web}
 * @ctrlparams {name:showmore,title:显示更多,parameterType:boolean,defaultvalue:false,description:当该值为true时，若分页栏内容超出父容器范围，将隐藏超出的分页项，点击`更多`标签页后，超出容器的分页项将以下拉的形式展示,effectPlatform:web}
 * @template T
 * @template S
 */
export interface IApiDRTabController<
  T extends IDRTab = IDRTab,
  S extends IApiDRTabState = IApiDRTabState,
> extends IApiControlController<T, S> {
  /**
   * @description 获取数据
   * @returns {*}  {IApiData[]}
   * @memberof IApiDRTabController
   */
  getData(): IApiData[];

  /**
   * @description 设置激活项
   * @param {string} name
   * @memberof IApiDRTabController
   */
  setActive(name: string): void;
}
