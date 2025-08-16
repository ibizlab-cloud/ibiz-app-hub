/**
 * @description 搜索表单全局配置
 * @export
 * @interface IApiGlobalSearchFormConfig
 */
export interface IApiGlobalSearchFormConfig {
  /**
   * @description 是否启用存储过滤条件，为true时可以将过滤条件进行保存
   * @type {boolean}
   * @default true
   * @memberof IApiGlobalSearchFormConfig
   */
  enableStoredFilters: boolean;
}
