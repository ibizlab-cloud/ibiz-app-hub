/**
 * @description 全局表格配置
 * @export
 * @interface IApiGlobalGridConfig
 */
export interface IApiGlobalGridConfig {
  /**
   * @description 表格行编辑呈现模式，cell 每次只呈现悬浮点击之后的一个单元格的编辑态；row 每次呈现编辑中的那一行所有单元格的编辑态；all 呈现所有编辑项的编辑态
   * @type {('cell' | 'row' | 'all')}
   * @default row
   * @memberof IApiGlobalGridConfig
   */
  editShowMode: 'cell' | 'row' | 'all';

  /**
   * @description 表格行编辑保存模式，cell-blur 单元格失焦时保存整行数据；auto 自动保存，值变更之后一段时间保存整行数据；manual 手动保存，由界面行为调用表格整体保存或行保存
   * @type {('cell-blur' | 'auto' | 'manual')}
   * @default cell-blur
   * @memberof IApiGlobalGridConfig
   */
  editSaveMode: 'cell-blur' | 'auto' | 'manual';

  /**
   * @description 表格保存错误处理模式，default：表格保存失败，界面弹出错误信息，编辑错误项切换为错误状态（红色边框、hover显示错误信息）；reset：表格保存失败，界面弹出错误信息，编辑错误项还原为保存之前的值
   * @type {('default' | 'reset')}
   * @default default
   * @memberof IApiGlobalGridConfig
   */
  saveErrorHandleMode: 'default' | 'reset';

  /**
   * @description 单元格超出呈现模式,wrap 换行，高度自动增高；ellipsis 省略，出...，悬浮出tooltip
   * @type {('wrap' | 'ellipsis')}
   * @default wrap
   * @memberof IApiGlobalGridConfig
   */
  overflowMode: 'wrap' | 'ellipsis';

  /**
   * @description 隐藏无值的单位
   * @default true
   * @type {boolean}
   * @memberof IApiGlobalGridConfig
   */
  emptyHiddenUnit: boolean;
}
