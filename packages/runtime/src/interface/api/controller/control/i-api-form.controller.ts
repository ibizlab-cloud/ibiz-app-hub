import { IDEForm } from '@ibiz/model-core';
import { IApiData } from '@ibiz-template/core';
import { IApiFormState } from '../../state';
import { IApiControlController } from './i-api-control.controller';
import { IApiFormDetailController } from './form-detail/i-api-form-detail.controller';
import { IApiFormMDCtrlController } from './form-detail/i-api-form-mdctrl.controller';
import { IApiFormDruipartController } from './form-detail/i-api-form-druipart.controller';
import { IApiFormDetailMapping } from '../common';

/**
 * 表单
 * @primary
 * @description 表单包含输入框、单选框、下拉选择、多选框等用户输入组件，用于收集、验证和提交数据。
 * @childrenparams {"name":"BUTTON","title":"表单按钮","interface":"IApiFormButtonController"}
 * @childrenparams {"name":"BUTTONLIST","title":"表单按钮组","interface":"IApiFormButtonListController"}
 * @childrenparams {"name":"DRUIPART","title":"表单关系界面","interface":"IApiFormDruipartController"}
 * @childrenparams {"name":"GROUPPANEL","title":"表单分组","interface":"IApiFormGroupPanelController"}
 * @childrenparams {"name":"FORMITEM","title":"表单项","interface":"IApiFormItemController"}
 * @childrenparams {"name":"MDCTRL_LIST","title":"表单多数据部件（列表）","interface":"IApiFormMDCtrlMDController"}
 * @childrenparams {"name":"MDCTRL_GRID","title":"表单多数据部件（表格）","interface":"IApiFormMDCtrlMDController"}
 * @childrenparams {"name":"MDCTRL_DATAVIEW","title":"表单多数据部件（卡片）","interface":"IApiFormMDCtrlMDController"}
 * @childrenparams {"name":"MDCTRL_FORM","title":"表单多数据部件（表单）","interface":"IApiFormMDCtrlFormController"}
 * @childrenparams {"name":"MDCTRL_REPEATER","title":"表单多数据部件（重复器）","interface":"IApiFormMDCtrlRepeaterController"}
 * @childrenparams {"name":"FORMPAGE","title":"表单分页","interface":"IApiFormPageController"}
 * @childrenparams {"name":"RAWITEM","title":"表单直接内容","interface":"IApiFormRawItemController"}
 * @childrenparams {"name":"TABPAGE","title":"表单分页部件分页","interface":"IApiFormTabPageController"}
 * @childrenparams {"name":"TABPANEL","title":"表单分页部件","interface":"IApiFormTabPanelController"}
 * @export
 * @interface IApiFormController
 * @extends {IApiControlController<T, S>}
 * @template T
 * @template S
 */
export interface IApiFormController<
  T extends IDEForm = IDEForm,
  S extends IApiFormState = IApiFormState,
> extends IApiControlController<T, S> {
  /**
   * @description 所有表单项成员的控制器
   * @type {{ [key: string]: IApiFormDetailController }}
   * @memberof IApiFormController
   */
  details: { [key: string]: IApiFormDetailController };

  /**
   * @description 表单项控制器集合
   * @type {IApiFormDetailController[]}
   * @memberof IApiFormController
   */
  formItems: IApiFormDetailController[];

  /**
   * @description 表单多数据部件控制器集合
   * @type {IApiFormMDCtrlController[]}
   * @memberof IApiFormController
   */
  formMDCtrls: IApiFormMDCtrlController[];

  /**
   * @description 表单关系界面控制器集合
   * @type {IApiFormDruipartController[]}
   * @memberof IApiFormController
   */
  formDruipart: IApiFormDruipartController[];

  /**
   * @description 获取表单数据
   * @returns {*}  {IApiData[]}
   * @memberof IApiFormController
   */
  getData(): IApiData[];

  /**
   * @description 获取原始实体数据
   * @returns {*}  {IApiData[]}
   * @memberof IApiFormController
   */
  getReal(): IApiData[];

  /**
   * @description 刷新当前部件
   * @returns {*}  {Promise<void>}
   * @memberof IApiFormController
   */
  refresh(): Promise<void>;

  /**
   * @description 切换折叠
   * @param {{ tag: string; expand: boolean }} [params] tag: 需切换状态表单分组标识,不传则全展开，expand: 是否展开，不传则以当前状态为基准切换
   * @memberof IApiFormController
   */
  changeCollapse(params?: { tag?: string; expand?: boolean }): void;

  /**
   * @description 设置表单激活分页
   * @param {string} name
   * @memberof IApiFormController
   */
  setActiveTab(name: string): void;

  /**
   * @description 设置表单数据
   * @param {string} name 表单项名称
   * @param {unknown} value 值
   * @param {boolean} [ignore] 是否忽略脏值检查
   * @returns {*}  {Promise<void>}
   * @memberof IApiFormController
   */
  setDataValue(name: string, value: unknown, ignore?: boolean): Promise<void>;

  /**
   * @description 设置指定项错误提示
   * @param {string} name 表单项名称
   * @param {string} message 错误信息
   * @memberof IApiFormController
   */
  setDetailError(name: string, message: string): void;

  /**
   * @description 表单校验
   * @returns {*}  {Promise<boolean>}
   * @memberof IApiFormController
   */
  validate(): Promise<boolean>;

  /**
   * @description 表单静默校验
   * @returns {*}  {Promise<boolean>}
   * @memberof IApiFormController
   */
  silentValidate(): Promise<boolean>;

  /**
   * @description 获取表单成员
   * @template K
   * @param {K} type 表单成员类型
   * @param {string} id 表单成员标识
   * @returns {*}  {IApiFormDetailMapping[K]}
   * @memberof IApiFormController
   */
  getFormDetail<K extends keyof IApiFormDetailMapping>(
    type: K,
    id: string,
  ): IApiFormDetailMapping[K];

  /**
   * @description 获取简单模式下当前表单的数据索引
   * @returns {*}  {number}
   * @memberof IApiFormController
   */
  getSimpleDataIndex(): number;
}
