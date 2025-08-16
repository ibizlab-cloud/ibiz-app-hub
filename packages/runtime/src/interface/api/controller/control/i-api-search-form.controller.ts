import { IDESearchForm } from '@ibiz/model-core';
import { IApiData, IApiParams } from '@ibiz-template/core';
import { IApiFormController } from './i-api-form.controller';
import { IApiSearchFormState } from '../../state';

/**
 * 搜索表单
 * @primary
 * @description 搜索表单包含输入框、单选框、下拉选择、多选框等用户输入组件，用于收集数据并执行过滤搜索。
 * @export
 * @interface IApiSearchFormController
 * @extends {IApiFormController<T, S>}
 * @ctrlparams {name:emptyhiddenunit,title:无值是否隐藏,parameterType:boolean,defaultvalue:false,description:表单项无值时，其对应的值单位（如'天'、'%'等）是否隐藏,effectPlatform:web}
 * @ctrlparams {name:enablestoredfilters,title:启用存储过滤条件,parameterType:boolean,defaultvalue:true,description:设置为true的时候初始化时就会去加载保存的过滤条件，并将过滤条件附加在后续搜索行为的查询参数中,effectPlatform:web}
 * @template T
 * @template S
 */
export interface IApiSearchFormController<
  T extends IDESearchForm = IDESearchForm,
  S extends IApiSearchFormState = IApiSearchFormState,
> extends IApiFormController<T, S> {
  /**
   * @description 加载数据
   * @returns {*}  {Promise<IApiData>}
   * @memberof IApiSearchFormController
   */
  load(): Promise<IApiData>;

  /**
   * @description 获取搜索表单的过滤参数
   * @returns {*}  {IApiParams}
   * @memberof IApiSearchFormController
   */
  getFilterParams(): IApiParams;

  /**
   * @description 执行搜索行为
   * @returns {*}  {Promise<void>}
   * @memberof IApiSearchFormController
   */
  search(): Promise<void>;

  /**
   * @description 重置
   * @returns {*}  {Promise<void>}
   * @memberof IApiSearchFormController
   */
  reset(): Promise<void>;

  /**
   * @description 存储搜索条件
   * @param {string} name
   * @returns {*}  {Promise<void>}
   * @memberof IApiSearchFormController
   */
  storeFilter(name: string): Promise<void>;

  /**
   * @description 应用保存的过滤条件
   * @param {number} index 存储的过滤条件集合索引下标
   * @memberof IApiSearchFormController
   */
  applyStoredFilter(index: number): void;

  /**
   * @description 删除保存的过滤条件
   * @param {number} index 存储的过滤条件集合索引下标
   * @returns {*}  {Promise<void>}
   * @memberof IApiSearchFormController
   */
  removeStoredFilter(index: number): Promise<void>;
}
