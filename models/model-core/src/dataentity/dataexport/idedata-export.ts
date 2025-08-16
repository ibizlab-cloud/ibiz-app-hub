import { IDEDataExportItem } from './idedata-export-item';
import { IModelObject } from '../../imodel-object';

/**
 *
 * 实体数据导出模型对象接口，实体导出使用表格模型{@link net.ibizsys.centralstudio.dto.PSDEGrid}定义导出模型
 * @export
 * @interface IDEDataExport
 */
export interface IDEDataExport extends IModelObject {
  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 内容类型
   * @type {string}
   * 来源  getContentType
   */
  contentType?: string;

  /**
   * 导入标记
   * @type {string}
   * 来源  getExpTag
   */
  expTag?: string;

  /**
   * 导入标记2
   * @type {string}
   * 来源  getExpTag2
   */
  expTag2?: string;

  /**
   * 最大记录数
   * @type {number}
   * 来源  getMaxRowCount
   */
  maxRowCount?: number;

  /**
   * 导出项集合
   *
   * @type {IDEDataExportItem[]}
   * 来源  getPSDEDataExportItems
   */
  dedataExportItems?: IDEDataExportItem[];

  /**
   * 前端扩展插件
   *
   * @type {string}
   * 来源  getPSSysPFPlugin
   */
  sysPFPluginId?: string;

  /**
   * 默认导出
   * @type {boolean}
   * @default false
   * 来源  isDefaultMode
   */
  defaultMode?: boolean;

  /**
   * 支持后台执行
   * @type {boolean}
   * 来源  isEnableBackend
   */
  enableBackend?: boolean;

  /**
   * 支持自定义
   * @type {boolean}
   * @default false
   * 来源  isEnableCustomized
   */
  enableCustomized?: boolean;

  /**
   * 支持前台执行
   * @type {boolean}
   * 来源  isEnableFront
   */
  enableFront?: boolean;
}
