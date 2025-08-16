import {
  IGlobalConfig,
  IGlobalGridConfig,
  IGlobalAppMenuConfig,
  IGlobalCodeListConfig,
  IGlobalViewConfig,
  IGlobalPickerEditorConfig,
  IGlobalFormConfig,
  IGlobalSearchFormConfig,
  IGlobalTreeConfig,
  IGlobalCommonConfig,
  IApiGlobalKanbanConfig,
} from '../interface';

/**
 * 全局配置类,控制应用的功能开关。
 *
 * @author lxm
 * @date 2022-12-09 14:12:28
 * @export
 * @class GlobalConfig
 * @implements {IGlobalConfig}
 */
export class GlobalConfig implements IGlobalConfig {
  // 全局视图配置
  view: IGlobalViewConfig = {
    enableDataInfoBar: true,
    expCacheMode: 'TABEXPPANEL:',
    disableHomeTabs: false,
    mobShowPresetBack: true,
    timeoutDuration: 5 * 60 * 1000,
  };

  // 全局表格配置
  grid: IGlobalGridConfig = {
    editShowMode: 'row',
    editSaveMode: 'cell-blur',
    saveErrorHandleMode: 'default',
    overflowMode: 'wrap',
    emptyHiddenUnit: true,
  };

  // 全局菜单配置
  appMenu: IGlobalAppMenuConfig = {
    enableEcho: true,
    echoMode: 'VIEW',
    defaultCollapse: false,
  };

  // 全局代码表配置
  codeList: IGlobalCodeListConfig = {
    timeout: 60 * 60 * 1000,
  };

  // 全局表单配置
  form: IGlobalFormConfig = {
    mdCtrlConfirmBeforeRemove: true,
    mobShowUnderLine: true,
    mobFormItemAlignMode: '',
    mobShowEditorBorder: false,
    emptyHiddenUnit: true,
    showTipsIcon: true,
  };

  // 全局看板配置
  kanban: IApiGlobalKanbanConfig = {
    enableFullScreen: true,
    enableGroupHidden: false,
  };

  // 全局下拉选择类编辑器配置
  pickerEditor: IGlobalPickerEditorConfig = {
    overflowMode: 'auto',
  };

  // 全局搜索表单配置
  searchform: IGlobalSearchFormConfig = {
    enableStoredFilters: true,
  };

  // 全局树配置
  tree: IGlobalTreeConfig = {
    contextMenuRightClickInvoke: true,
  };

  // 全局通用配置
  common: IGlobalCommonConfig = {
    emptyText: '-',
    emptyShowMode: 'DEFAULT',
    searchPhSeparator: '、',
  };

  // 多数据部件默认排序配置
  mdctrldefaultsort: string = '';

  // 多数据部件刷新模式
  mdctrlrefreshmode: 'nocache' | 'cache' = 'cache';

  // 下拉选择类编辑器默认排序配置
  pickerdefaultsort: string = '';

  // 提示框信息绘制模式
  tooltiprendermode: 'none' | 'md' | 'html' = 'md';
}
