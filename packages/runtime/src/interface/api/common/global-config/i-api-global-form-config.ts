/**
 * @description 全局表单配置
 * @export
 * @interface IApiGlobalFormConfig
 */
export interface IApiGlobalFormConfig {
  /**
   * @description 多数据部件删除前是否需要确认
   * @type {boolean}
   * @default true
   * @memberof IApiGlobalFormConfig
   */
  mdCtrlConfirmBeforeRemove: boolean;

  /**
   * @description 移动端是否展示表单项下方下划线
   * @type {boolean}
   * @default true
   * @memberof IApiGlobalFormConfig
   */
  mobShowUnderLine: boolean;

  /**
   * @description 移动端文本在输入框中的位置
   * @type {('right' | 'left' | '')}
   * @default ''
   * @memberof IApiGlobalFormConfig
   */
  mobFormItemAlignMode: 'right' | 'left' | '';
  /**
   * @description 移动端是否显示表单项边框
   * @type {boolean}
   * @default false
   * @memberof IApiGlobalFormConfig
   */
  mobShowEditorBorder: boolean;

  /**
   * @description 隐藏无值的单位
   * @type {boolean}
   * @default true
   * @memberof IApiGlobalFormConfig
   */
  emptyHiddenUnit: boolean;

  /**
   * @description 显示属性提示图标
   * @type {boolean}
   * @default true
   * @memberof IApiGlobalFormConfig
   */
  showTipsIcon: boolean;
}
