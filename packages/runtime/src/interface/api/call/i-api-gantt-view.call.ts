import { IApiData } from '@ibiz-template/core';
import { IApiMDCtrlLoadParams } from '../controller';
import { IApiMDViewCall } from './i-api-md-view.call';

/**
 * @description 实体甘特视图能力
 * @export
 * @interface IApiGanttViewCall
 * @extends {IApiMDViewCall}
 */
export interface IApiGanttViewCall extends IApiMDViewCall {
  /**
   * @description 新建行
   * @type {{
   *     args?: IApiMDCtrlLoadParams;
   *   }}
   * @memberof IApiGanttViewCall
   */
  NewRow: {
    args?: IApiMDCtrlLoadParams;
  };
  /**
   * @description 行编辑
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiGanttViewCall
   */
  ToggleRowEdit: {
    args: undefined;
  };
  /**
   * @description 保存行
   * @type {{
   *     args: { data: IApiData[] };
   *   }}
   * @memberof IApiGanttViewCall
   */
  SaveRow: {
    args: { data: IApiData[] };
  };
  /**
   * @description 保存
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiGanttViewCall
   */
  Save: {
    args: undefined;
  };
  /**
   * @description 展开
   * @type {{
   *     args: { params?: { srfcollapsetag?: string } };
   *   }}
   * @memberof IApiGanttViewCall
   */
  Expand: {
    args: { params?: { srfcollapsetag?: string } };
  };
  /**
   * @description 折叠
   * @type {{
   *     args: { params?: { srfcollapsetag?: string } };
   *   }}
   * @memberof IApiGanttViewCall
   */
  Collapse: {
    args: { params?: { srfcollapsetag?: string } };
  };
  /**
   * @description 全部展开
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiGanttViewCall
   */
  ExpandAll: {
    args: undefined;
  };
  /**
   * @description 全部收缩
   * @type {{
   *     args: undefined;
   *   }}
   * @memberof IApiGanttViewCall
   */
  CollapseAll: {
    args: undefined;
  };
}
